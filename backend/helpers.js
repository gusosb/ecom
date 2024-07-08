const { Item, Image } = require('./models');

const countries = {
  AT: {
    country: 'Austria',
    vatRate: 2000,
    vatAccountNumber: 2651,
    vatAccountName: '20 % OSS moms, Österrike (AT)',
    tested: false
  },
  BE: {
    country: 'Belgium',
    vatRate: 2100,
    vatAccountNumber: 2652,
    vatAccountName: '21 % OSS moms, Belgien (BE)'
  },
  BG: {
    country: 'Bulgaria',
    vatRate: 2000,
    vatAccountNumber: 2653,
    vatAccountName: '20 % OSS moms, Bulgarien (BG)'
  },
  HR: {
    country: 'Croatia',
    vatRate: 2500,
    vatAccountNumber: 2654,
    vatAccountName: '25 % OSS moms, Kroatien (HR)'
  },
  CY: {
    country: 'Cyprus',
    vatRate: 1900,
    vatAccountNumber: 2655,
    vatAccountName: '19 % OSS moms, Cypern (CY)'
  },
  CZ: {
    country: 'Czech Republic',
    vatRate: 2100,
    vatAccountNumber: 2656,
    vatAccountName: '21 % OSS moms, Tjeckien (CZ)'
  },
  DK: {
    country: 'Denmark',
    vatRate: 2500,
    vatAccountNumber: 2657,
    vatAccountName: '25 % OSS moms, Danmark (DK)'
  },
  EE: {
    country: 'Estonia',
    vatRate: 2000,
    vatAccountNumber: 2658,
    vatAccountName: '20 % OSS moms, Estland (EE)'
  },
  FI: {
    country: 'Finland',
    vatRate: 2400,
    vatAccountNumber: 2659,
    vatAccountName: '24 % OSS moms, Finland (FI)'
  },
  FR: {
    country: 'France',
    vatRate: 2000,
    vatAccountNumber: 2678,
    vatAccountName: '20 % OSS moms, Frankrike (FR)'
  },
  DE: {
    country: 'Germany',
    vatRate: 1900,
    vatAccountNumber: 2661,
    vatAccountName: '19 % OSS moms, Tyskland (DE)'
  },
  GR: {
    country: 'Greece',
    vatRate: 2400,
    vatAccountNumber: 2662,
    vatAccountName: '24 % OSS moms, Grekland (GR)'
  },
  HU: {
    country: 'Hungary',
    vatRate: 2700,
    vatAccountNumber: 2663,
    vatAccountName: '27 % OSS moms, Ungern (HU)'
  },
  IE: {
    country: 'Ireland',
    vatRate: 2300,
    vatAccountNumber: 2664,
    vatAccountName: '23 % OSS moms, Irland (IE)'
  },
  IT: {
    country: 'Italy',
    vatRate: 2200,
    vatAccountNumber: 2665,
    vatAccountName: '22 % OSS moms, Italien (IT)'
  },
  LV: {
    country: 'Latvia',
    vatRate: 2100,
    vatAccountNumber: 2666,
    vatAccountName: '21 % OSS moms, Lettland (LV)'
  },
  LT: {
    country: 'Lithuania',
    vatRate: 2100,
    vatAccountNumber: 2667,
    vatAccountName: '21 % OSS moms, Litauen (LT)'
  },
  LU: {
    country: 'Luxembourg',
    vatRate: 1600,
    vatAccountNumber: 2668,
    vatAccountName: '16 % OSS moms, Luxemburg (LU)'
  },
  MT: {
    country: 'Malta',
    vatRate: 1800,
    vatAccountNumber: 2669,
    vatAccountName: '18 % OSS moms, Malta (MT)'
  },
  NL: {
    country: 'Netherlands',
    vatRate: 2100,
    vatAccountNumber: 2679,
    vatAccountName: '21 % OSS moms, Nederländerna (NL)'
  },
  PL: {
    country: 'Poland',
    vatRate: 2300,
    vatAccountNumber: 2671,
    vatAccountName: '23 % OSS moms, Polen (PL)'
  },
  PT: {
    country: 'Portugal',
    vatRate: 2300,
    vatAccountNumber: 2672,
    vatAccountName: '23 % OSS moms, Portugal (PT)'
  },
  RO: {
    country: 'Romania',
    vatRate: 1900,
    vatAccountNumber: 2673,
    vatAccountName: '19 % OSS moms, Rumänien (RO)'
  },
  SK: {
    country: 'Slovakia',
    vatRate: 2000,
    vatAccountNumber: 2674,
    vatAccountName: '20 % OSS moms, Slovakien (SK)'
  },
  SI: {
    country: 'Slovenia',
    vatRate: 2200,
    vatAccountNumber: 2675,
    vatAccountName: '22 % OSS moms, Slovenien (SI)'
  },
  ES: {
    country: 'Spain',
    vatRate: 2100,
    vatAccountNumber: 2676,
    vatAccountName: '21 % OSS moms, Spanien (ES)'
  },
  CH: {
    country: 'Switzerland',
    vatRate: 770,
    vatAccountNumber: 2677,
    vatAccountName: '7.7 % OSS moms, Schweiz (CH)'
  },
  SE: {
    country: 'Sweden',
    vatRate: 2500,
    vatAccountNumber: 2611,
    vatAccountName: 'Utgående moms på försäljning inom Sverige, 25 %'
  }
};

const logoUrl = 'https://api.gustaflund.com/uploads/GUSTAFLUND_v5.png';

const generateEmailTemplate = async ({ itemId }) => {
  const item = await Item.findByPk(itemId, { include: [Image] });
  return {
    html: `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');
        </style>
      </head>
      <body style="font-family: 'Jost', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; padding: 20px 0;">
            <img src="${logoUrl}" alt="GUSTAF LUND" style="width: 300px; height: auto;">
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #000000; margin: 10px 0; text-align: center;">${item.name} is back in stock.</p>
          <img src="${item.images[0]?.path}" alt="${item.name}" style="width: 100%; max-width: 100%; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 20px; font-weight: 600; color: #000000; text-align: center; margin: 10px 0;">${item.name}</p>
          <p style="font-size: 16px; color: #666666; margin: 10px 0; text-align: center;">${item.description}</p>
          <a href="https://www.gustaflund.com/p/${item.id}/${item.name}" style="display: block; margin: 20px auto; padding: 15px 40px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 5px; text-align: center; font-size: 16px; font-weight: 600; max-width: 200px;">SHOP</a>
          <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #aaaaaa;">
            <p><a href="https://www.gustaflund.com/customer-support/faq" style="color: #000000; text-decoration: none;">Customer Support</a> | <a href="https://www.gustaflund.com/terms-and-conditions" style="color: #000000; text-decoration: none;">Terms & Conditions</a> | <a href="https://www.gustaflund.com/about-us" style="color: #000000; text-decoration: none;">About Us</a></p>
            <p>© 2024 GUSTAF LUND</p>
          </div>
        </div>
      </body>
    </html>
  `,
    subject: `${item.name} is back`
  };
};

const generateConfirmationEmail = async ({ order }) => {
  const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
  const itemsHtml = order.orderitems
    .map(
      (item) => `
      <div style="display: flex; align-items: center; border-bottom: 1px solid #dddddd; padding: 10px 0;">
        <div style="flex: 0 0 100px;">
          <img src="${item.image_path}" alt="${item.name}" style="width: 100px; height: auto; border-radius: 8px;">
        </div>
        <div style="flex: 1; padding-left: 20px;">
          <p style="margin: 0; font-weight: 600;">${item.name} - ${item.variant}</p>
          <p style="margin: 0;">${item.quantity} ${item.quantity > 1 ? 'pieces' : 'piece'}</p>
          <p style="margin: 0; font-weight: 600;">${(item.unit_price * item.quantity) / 100} ${order.currency}</p>
        </div>
      </div>`
    )
    .join('');

  const emailHtml = `
  <html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');
      body {
        font-family: 'Jost', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        color: #000000;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      .header {
        text-align: center;
        padding: 20px 0;
      }
      .header img {
        width: 150px;
        height: auto;
      }
      .content {
        font-size: 16px;
        line-height: 1.5;
        color: #000000;
        margin: 20px 0;
      }
      .content h1 {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
      }
      .content p {
        margin: 10px 0;
      }
      .order-summary {
        border-top: 1px solid #dddddd;
        padding-top: 20px;
        margin-top: 20px;
      }
      .order-summary h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .order-summary p {
        margin: 5px 0;
      }
      .order-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .order-item img {
        width: 100px;
        height: auto;
        margin-right: 20px;
        border-radius: 8px;
      }
      .order-item-details {
        flex: 1;
      }
      .billing-shipping {
        margin-top: 20px;
      }
      .billing-shipping h2 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .billing-shipping p {
        margin: 5px 0;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
        color: #aaaaaa;
      }
      .footer a {
        color: #000000;
        text-decoration: none;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        font-size: 16px;
        color: #ffffff;
        background-color: #000000;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="${logoUrl}" alt="GUSTAF LUND" style="width: 300px; height: auto;">
      </div>
      <div class="content">
        <h1>ORDER CONFIRMATION #${order.order_reference}</h1>
        <p>Hello ${order.name},</p>
        <p>We have received your order, it will be shipped promptly. <br>
        Please review the order details below, reply to this email if you have any questions.</p>
        
        <div class="order-summary">
          <h2>ORDER SUMMARY</h2>
          <p><strong>Date:</strong> ${orderDate}</p>
          ${itemsHtml}
          <p><strong>Total:</strong> ${order.order_amount / 100} ${order.currency}</p>
        </div>

        <div class="billing-shipping">
          <h2>SHIPPING ADDRESS</h2>
            ${order.name} <br>
            ${order.address} <br>
            ${order.address2 ? order.address2 + '<br>' : ''}
            ${order.care_of ? order.care_of + '<br>' : ''}
            ${order.postalcode} ${order.city} <br>
            ${order.state ? order.state + '<br>' : ''}
            ${order.country} <br>
        </div>
        
        <div class="footer">
        <a href="https://www.gustaflund.com/customer-support/faq" style="color: #000000; text-decoration: none;">Customer Support</a> | <a href="https://www.gustaflund.com/terms-and-conditions" style="color: #000000; text-decoration: none;">Terms & Conditions</a> | <a href="https://www.gustaflund.com/customer-support/returns" style="color: #000000; text-decoration: none;">Returns</a></p>
          <p>© 2024 GUSTAF LUND</p>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  return emailHtml;
};

module.exports = { countries, generateEmailTemplate, generateConfirmationEmail };
