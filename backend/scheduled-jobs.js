const cron = require('node-cron');
const fs = require('fs');
const { Order, Item, Category } = require('./models')




const createSIEFile = async (orders) => {

    const latestOrder = await Order.findOne({
        order: [['verification_number', 'DESC']]
    });

    let verificationCounter = latestOrder ? latestOrder.verification_number + 1 : 1;
    console.log('verificationCounter', verificationCounter);

    const todayDate = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    try {

        const sieContent = `#FLAGGA 0
#PROGRAM "EVOCORP-EXPORTER" 0.1
#FORMAT PC8
#GEN ${todayDate}
#ORGNR 559457-6927
#FNAMN "Evocorp AB"
#VALUTA SEK
#FTYP AB
${orders.map(order =>
            `#VER O ${verificationCounter++} ${order.createdAt.toISOString().slice(0, 10).replaceAll('-', '')} "${order.order_reference}"
{
#TRANS 1510 {} ${order.order_amount / 100} ${todayDate}
#TRANS 3051 {} -${(order.order_amount - order.order_tax_amount) / 100} ${todayDate}
#TRANS 2611 {} -${order.order_tax_amount / 100} ${todayDate}
}`
        )}`;

        console.log('sieContent', sieContent);


        const fileName = `${todayDate}_orders.si`;
        fs.writeFileSync(fileName, sieContent);
        console.log('SIE file created successfully.');

        await Order.update({ is_posted: true }, {
            where: {
                id: orders.map(order => order.id)
            }
        });
    } catch (error) {
        console.log('error in file creation!', error);
    }
}

// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled create SIE job.');

    const orders = await Order.findAll({
        where: {
            is_posted: true,
            is_paid: true
        }
    });

    console.log('order.length', orders.length);

    if (orders.length < 1) return;


    await createSIEFile(orders);

});





const routes = [
    { path: '/', name: 'Home' },
    { path: '/checkout', name: 'Checkout' },
    { path: '/shop/:categoryname?', name: 'Shop' },
    { path: '/product/:itemid/:itemname?', name: 'Product' },
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
    const baseUrl = 'https://surdegshornan.se';
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

const saveSitemapToFile = async (xmlContent) => {
    const fileName = 'uploads/sitemap.xml';

    try {
        await fs.promises.writeFile(fileName, xmlContent);
        console.log('Sitemap file saved successfully.');
    } catch (error) {
        console.error('Error saving sitemap file:', error);
    }
};

// Runs every day at midnight
cron.schedule('* * * * *', async () => {
    console.log('Running scheduled sitemap generation job.');

    try {
        const sitemapXML = await generateSitemap();
        await saveSitemapToFile(sitemapXML);
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
});