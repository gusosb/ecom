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
    const exchangeRate = 11.68;

    try {

        const sieContent = `#FLAGGA 0
#PROGRAM "EVOCORP-EXPORTER" 0.1
#FORMAT PC8
#GEN ${todayDate}
#ORGNR 559457-6927
#FNAMN "Evocorp AB"
#VALUTA SEK
#FTYP AB
${orders.reduce((acc, order, index) => {
            const verString = `#VER O ${verificationCounter++} ${order.createdAt.toISOString().slice(0, 10).replaceAll('-', '')} "${order.order_reference}"
{
${order.currency === 'EUR' ?
                    `#TRANS 1510 {} ${order.order_amount * exchangeRate / 100} ${todayDate}
#TRANS 3051 {} -${(order.order_amount - order.order_tax_amount) * exchangeRate / 100} ${todayDate}
#TRANS 2611 {} -${order.order_tax_amount * exchangeRate / 100} ${todayDate}` :
                    `#TRANS 1510 {} ${order.order_amount / 100} ${todayDate}
#TRANS 3051 {} -${(order.order_amount - order.order_tax_amount) / 100} ${todayDate}
#TRANS 2611 {} -${order.order_tax_amount / 100} ${todayDate}`
                }
}`;
            return index === 0 ? verString : `${acc}\n${verString}`;
        }, '')}`;


        console.log('sieContent', sieContent);


        const fileName = `${todayDate}_orders.si`;
        fs.writeFileSync(fileName, sieContent);
        console.log('SIE file created successfully.');

        // await Order.update({ is_posted: true }, {
        //     where: {
        //         id: orders.map(order => order.id)
        //     }
        // });
    } catch (error) {
        console.log('error in file creation!', error);
    }
}

//cron.schedule('* * * * *', async () => { // => Runs every minute

cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
    console.log('Running scheduled create SIE job.');

    const orders = await Order.findAll({
        where: {
            is_posted: false,
            // is_paid: true
        }
    });

    console.log('order.length', orders.length);

    if (orders.length < 1) return;


    await createSIEFile(orders);

});