import { useWindowSize, useCountryCurrency } from '../helpers';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Terms = () => {
  const windowSize = useWindowSize();

  const { selectedCurrency } = useCountryCurrency();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 1000, my: windowSize.width > 800 ? 7 : 2, mx: 5 }}>
        <Typography variant="body2" fontSize={20} fontWeight="bold">
          Terms & Conditions
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §1 General
        </Typography>
        <br />
        <Typography variant="body1">
          GUSTAF LUND is a registered trademark of Evocorp AB (Swedish registration number
          559457-6927). GUSTAF LUND reserves the right to, at any time, and without prior notice,
          revise or modify the terms and conditions.
          <br />
          <br />
          The terms and conditions apply to all purchase orders submitted to GUSTAF LUND's website,
          www.gustaflund.com, and cover all purchase agreements that a consumer enters online with
          Evocorp AB and its registered trademark GUSTAF LUND. Terms and conditions are updated
          continuously and should be carefully read before placing an order.
          <br />
          Minors under the age of 18 must have parental permission before placing an order. GUSTAF
          LUND reserves the right to accept orders only from those over 18. GUSTAF LUND presumes
          that minors who carry out purchases on our website www.gustaflund.com submit truthful
          information about their age and/or possess the necessary consent from their custodian to
          carry out the purchase. If not, the buyer or the custodian may become liable for the
          possible costs an invalid agreement may incur.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §2 Products and Pricing
        </Typography>
        <br />
        <Typography variant="body1">
          The prices on www.gustaflund.com are listed in either Swedish krona (SEK) or Euro (EUR),
          depending on whether you are visiting from Sweden or the European Union. The prices on our
          website constitute the total price, including local VAT. Shipping is free within the
          European Union.
          <br />
          GUSTAF LUND reserves the right to update errors related to product information, pricing,
          and availability without any prior notice, as well as the right to terminate any orders
          involving pricing errors or inaccuracies. GUSTAF LUND strives at all times for all photos
          to be as representative as possible of the real-life product but cannot guarantee one
          hundred percent accuracy. Minor deviations may occur.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §3 Order and Confirmation
        </Typography>
        <br />
        <Typography variant="body1">
          A binding purchase agreement is entered into as soon as you complete the checkout and
          submit payment. A receipt will be sent out from Stripe to the email address you submitted
          at checkout. This receipt serves as proof of guarantee for full payment. If an item runs
          out of stock before the status has been correctly updated on the website, GUSTAF LUND will
          notify you by email. We will then cancel the order in question and refund your purchase.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §4 Payment
        </Typography>
        <br />
        <Typography variant="body1">
          Our payment provider is Stripe, a payment service provided by Stripe, Inc.
          <br />
          Payments are made in SEK for shipments to Sweden and EUR for shipments within the European
          Union. We do not accept payment in any other currency. If you wish to cancel your order,
          please contact us, and we will issue a refund or cancel your invoice. Please note that we
          are unable to cancel an order once it has left our warehouse. We are not responsible for
          any charges or penalties that may be imposed by the payment provider as a result of
          payment being processed for your order.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §5 Shipping
        </Typography>
        <br />
        <Typography variant="body1">
          GUSTAF LUND offers free shipping on all orders within the European Union. We ship from our
          warehouse in Göteborg, Sweden. Shipments are sent with PostNord. Normal dispatch from
          GUSTAF LUND takes place within 1-2 business days. In the case of GUSTAF LUND being unable
          to dispatch the order within the agreed time, the customer will be informed promptly of
          the reasons for the delay. In the case of delayed order dispatch, the customer is entitled
          to cancel the purchase at no cost.
        </Typography>
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={16}>
          §5.1 Unclaimed Shipments
        </Typography>
        <br />
        <Typography variant="body1">
          To cover costs, GUSTAF LUND charges -30 EUR for any shipped unclaimed orders. If you have
          ordered an item and changed your mind after having it picked up, you may return the
          package to us and be refunded for the returned item. You will, however, cover the return
          shipping cost for returns of full orders. Read more about the terms of purchase in §6
          below.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §6 Returns
        </Typography>
        <br />
        <Typography variant="body1">
          You may return the goods to us by any secure means within 14 days (beginning on the day
          you received your order). Returned goods must be unused and in the original packaging with
          all hang tags still attached. Please note that the original packaging is part of the
          product. Be careful when you try on the products at home; some are especially fragile.
          <br />
          We reserve the right to refuse a return if the product shows signs of wear or has been
          altered from its original condition in any way. In this instance, you may choose to have
          the item(s) sent back to you at your own expense.
          <br />
          Enclosed in your order is a return form and return shipping label. To return your order,
          please fill in the return form and pack your goods as they were received by GUSTAF LUND.
          Enclose the return form and put the return shipping label on the outside of the package.
          Submit the package at your closest service point. Please note that we charge{' '}
          {selectedCurrency === 'SEK' ? 100 : 10} {selectedCurrency} for return shipping when
          returning a full order.
        </Typography>
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={16}>
          §6.1 Exchange Policy
        </Typography>
        <br />
        <Typography variant="body1">
          When exchanging a garment, a new order needs to be placed. Follow the return instructions
          above to get the initial order refunded and then place a new order at www.gustaflund.com.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §7 Faulty Goods
        </Typography>
        <br />
        <Typography variant="body1">
          GUSTAF LUND guarantees goods free from errors at delivery. Should you receive a faulty or
          damaged product, please contact our Customer Service Team at
          customerservice@gustaflund.com as soon as possible, but no later than within 14 days.
          Please note that items that are damaged because of normal wear and tear are not considered
          faulty. All complaints must be approved by GUSTAF LUND before the goods are sent back.
          Faulty items will be refunded or exchanged with a new item within 2 to 3 weeks. If you
          choose to exchange a faulty item, please be aware that replacement is subject to
          availability.
        </Typography>
        <br />
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={17}>
          §8 Damaged Goods and Missing Packages
        </Typography>
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={16}>
          §8.1 Damaged Goods
        </Typography>
        <br />
        <Typography variant="body1">
          If the package is damaged upon receipt, please report it immediately to the post
          representative where it was picked up. As a customer, you have no obligation to accept
          damaged goods. In the case of hidden damages, these should be reported within seven
          working days of receipt. Please contact our Customer Service Team at
          customerservice@gustaflund.com and explain the damage. All complaints must be approved by
          GUSTAF LUND before the goods are sent back. Always save the original packaging.
        </Typography>
        <br />
        <Typography variant="body2" fontWeight="bold" fontSize={16}>
          §8.2 Missing Packages
        </Typography>
        <br />
        <Typography variant="body1">
          If your order is missing any items, please contact our Customer Service Team at
          customerservice@gustaflund.com.
        </Typography>
        <br />
        <br />
        <Typography variant="body1">Last modification date: 13th of May, 2024.</Typography>
      </Box>
    </div>
  );
};

export default Terms;
