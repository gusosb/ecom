const cron = require('node-cron');
const fs = require('fs');
const { Order, Item, Category } = require('./models');
const { Op } = require('sequelize');

const { countries } = require('./helpers.js');




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
#KONTO 1501 "Kundfordringar - Stripe"
#KONTO 2611 "Utgående moms på försäljning inom Sverige, 25 %"
#KONTO 3001 "Försäljning inom Sverige, 25 % moms"${Object.values(countries).reduce((acc, country) => `${acc}\n#KONTO ${country.vatAccountNumber} "${country.vatAccountName}"`, '')}
${orders.reduce((acc, order, index) => {
            console.log('createSIEFile - order', order);

            const country = countries[order.country] || [];
            console.log('country', country);
            const vatAccountNumber = country.vatAccountNumber;
            const paidDate = order.paid_at.toISOString().slice(0, 10).replaceAll('-', '');

            const verString = `#VER EVO ${verificationCounter++} ${paidDate} "${order.order_reference}"
{
${order.currency === 'EUR' ?
                    `#TRANS 1501 {} ${order.order_amount * exchangeRate / 100} ${paidDate}
#TRANS 3001 {} -${(order.order_amount - order.order_tax_amount) * exchangeRate / 100} ${paidDate}
#TRANS ${vatAccountNumber} {} -${order.order_tax_amount * exchangeRate / 100} ${paidDate}`

                    : `#TRANS 1501 {} ${order.order_amount / 100} ${paidDate}
#TRANS 3001 {} -${(order.order_amount - order.order_tax_amount) / 100} ${paidDate}
#TRANS 2611 {} -${order.order_tax_amount / 100} ${paidDate}`
                }
}`;
            return index === 0 ? verString : `${acc}\n${verString}`;
        }, '')}`;


        console.log('sieContent', sieContent);


        const fileName = `${todayDate}_orders.si`;
        fs.writeFileSync(fileName, sieContent);
        console.log('SIE file created successfully.');

    } catch (error) {
        console.log('error in file creation!', error);
    }
}


//cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
cron.schedule('* * * * *', async () => { // => Runs every minute
    console.log('Running scheduled create SIE job.');

    const orders = await Order.findAll({
        where: {
            is_paid: true,
            is_posted: false,
        }
    });

    console.log('order.length', orders.length);

    if (orders.length < 1) return;

    await createSIEFile(orders);

    /* await Order.update({ is_posted: true }, {
         where: {
             id: orders.map(order => order.id)
         }
     });*/

});