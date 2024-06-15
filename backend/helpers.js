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

const generateEmailTemplate = async ({ itemId }) => {
  const item = await Item.findByPk(itemId, { include: [Image] });
  console.log('item', item);

  return `
    <html>
      <body>
        <h1>Item back in stock</h1>
        <p>The item you were interested in is back in stock!</p>
        <img src="${item.images[0].path}" alt="${item.name}">
        <p>${item.name}</p>
        <p>${item.description}</p>
      </body>
    </html>
  `;
};

module.exports = { countries, generateEmailTemplate };
