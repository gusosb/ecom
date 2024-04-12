const cron = require('node-cron');
const fs = require('fs');
const { Order } = require('./models')




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