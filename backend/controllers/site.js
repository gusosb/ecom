const siteRouter = require('express').Router();
const { Item, Category } = require('../models');

const routes = [
    { path: '/', name: 'Home' },
    { path: '/checkout', name: 'Checkout' },
    { path: '/confirmation', name: 'Confirmation' },
    { path: '/discover', name: 'Discover' },
    {
        path: '/customer-support', name: 'Customer Support',
        children: [
            { path: 'faq', name: 'FAQ' },
            { path: 'returns', name: 'Returns' },
            { path: 'contact-us', name: 'Contact Us' },
        ]
    },
    { path: '/the-cashmere', name: 'The Cashmere' },
    { path: '/terms-and-conditions', name: 'Terms and Conditions' },
    { path: '/about-us', name: 'About Us' },
];


const generateProductRoutes = async () => {
    const activeProducts = await Item.findAll({ where: { isActive: true } });
    const productRoutes = activeProducts.map(product => ({
        path: `/product/${product.id}/${product.name}`,
        name: product.name
    }));
    return productRoutes;
};

const generateCategoryRoutes = async () => {
    const categories = await Category.findAll();
    const categoryRoutes = categories.map(category => ({
        path: `/shop/${category.name}`,
        name: category.name
    }));
    return categoryRoutes;
};

const generateSitemap = async () => {
    const baseUrl = 'https://gustaflund.com';
    const urls = [...routes];
    const categoryRoutes = await generateCategoryRoutes();
    const productRoutes = await generateProductRoutes();
    urls.push(...categoryRoutes, ...productRoutes);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `<url><loc>${baseUrl}${url.path}</loc></url>`).join('\n')}
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