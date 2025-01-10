const siteRouter = require('express').Router();
const { Item, Category } = require('../models');

// Blog posts
const blogPosts = [
  {
    title: 'How to care for your cashmere sweater',
    date: '01.12.24',
    slug: 'care-for-cashmere-sweater'
  },
  {
    title: 'Why organic cashmere is worth the investment',
    date: '20.11.24',
    slug: 'why-organic-cashmere'
  },
  {
    title: 'The longevity of cashmere',
    date: '14.11.24',
    slug: 'the-longevity-of-cashmere'
  },
  {
    title: '5 Reasons Cashmere is the Ultimate Winter Luxury',
    date: '30.12.24',
    slug: 'cashmere-ultimate-winter-luxury'
  }
];

const routes = [
  { path: '/', name: 'Home' },
  { path: '/checkout', name: 'Checkout' },
  { path: '/confirmation', name: 'Confirmation' },
  { path: '/discover', name: 'Discover' },
  { path: '/about-us', name: 'About Us' },
  { path: '/login', name: 'Login' },
  { path: '/register', name: 'Register' },
  { path: '/terms-and-conditions', name: 'Terms and Conditions' },
  { path: '/the-cashmere', name: 'The Cashmere' },
  {
    path: '/customer-support',
    name: 'Customer Support',
    children: [
      { path: '/customer-support/faq', name: 'FAQ' },
      { path: '/customer-support/returns', name: 'Returns' },
      { path: '/customer-support/contact-us', name: 'Contact Us' }
    ]
  },
  {
    path: '/blog',
    name: 'Blog',
    children: blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      name: post.title
    }))
  },
  {
    path: '/shop',
    name: 'Shop'
  }
];

const generateProductRoutes = async () => {
  const activeProducts = await Item.findAll({ where: { isActive: true } });
  return activeProducts.map((product) => ({
    path: `/p/${product.id}/${product.name}`,
    name: product.name
  }));
};

const generateCategoryRoutes = async () => {
  const categories = await Category.findAll();
  return categories.map((category) => ({
    path: `/shop/${category.name}`,
    name: category.name
  }));
};

const generateSitemap = async () => {
  const baseUrl = 'https://gustaflund.com';
  const urls = [
    ...routes.flatMap((route) => {
      if (route.children) {
        return [
          { path: route.path, name: route.name },
          ...route.children.map((child) => ({
            path: child.path,
            name: child.name
          }))
        ];
      }
      return [route];
    })
  ];

  const categoryRoutes = await generateCategoryRoutes();
  const productRoutes = await generateProductRoutes();
  urls.push(...categoryRoutes, ...productRoutes);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url><loc>${baseUrl}${url.path}</loc></url>`).join('\n')}
  </urlset>`;
  return xml;
};

siteRouter.get('/sitemap.xml', async (req, res) => {
  try {
    const sitemap = await generateSitemap();
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = siteRouter;
