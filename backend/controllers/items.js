const itemsRouter = require('express').Router();
const { auth } = require('./auth');
const multer = require('multer');
const { Item, Image, Variant, Review, Order } = require('../models');
const Notification = require('../models/notification');
const { generateEmailTemplate } = require('../helpers.js');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })

// => create item with image
itemsRouter.post('/', upload.single('file'), async (request, response) => {
  const item = await Item.create({ ...request.body });
  await Image.create({
    itemId: item.id,
    path: `/${request.file.destination}${request.file.filename}`,
    index: 0
  });

  response.status(201).json();
});

// => create image for existing item
itemsRouter.post('/image', upload.single('file'), async (request, response) => {
  const currentUser = (await auth(request)) || [];
  if (!currentUser.isAdmin) return response.status(401).end();

  await Image.create({
    ...request.body,
    path: `/${request.file.destination}${request.file.filename}`
  });

  response.status(201).json();
});

// => create review
itemsRouter.post('/reviews/:id', async (request, response) => {
  const itemId = request.params.id;

  console.log(request.body);
  console.log(itemId);

  const order = await Order.findByPk(request.body.orderId);
  const name = order.given_name;
  await Review.create({ itemId, ...request.body, name });

  response.status(201).json();
});

// => create notification for stock
itemsRouter.post('/notify-me/:id', async (request, response) => {
  const variantId = request.params.id;

  const { email } = request.body;

  try {
    // Find the item with the given email and itemId
    const [reminder, created] = await Notification.findOrCreate({
      where: { email, variantId },
      defaults: { email, variantId }
    });

    if (created) response.status(201).json({ message: 'Notification reminder set successfully.' });
    else
      response.status(200).json({
        message: 'Notification reminder already exists for this item.'
      });
  } catch (error) {
    console.error('Error creating reminder:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

itemsRouter.post('/variant', async (request, response) => {
  // const currentUser = await auth(request)
  const { itemId, name, sellable } = request.body;
  await Variant.create({ itemId, name, sellable });

  response.status(201).json();
});

// => Update variant
itemsRouter.put('/variant/:id', async (request, response) => {
  console.log('updating variant!');
  const currentUser = (await auth(request)) || [];
  if (!currentUser.isAdmin) return response.status(401).end();

  const id = request.params.id;

  const { sellable } = request.body;

  const variant = await Variant.findByPk(id);
  console.log('variant.sellable', variant.sellable);
  console.log('sellable', parseFloat(sellable));

  if (parseFloat(variant.sellable) === 0 && parseFloat(sellable) > 0) {
    const notifications = await Notification.findAll({ where: { variantId: id } });
    console.log('notifications', notifications);

    if (notifications.length > 0) {
      // => logic for sending notification
      const bcc = notifications.map((notification) => notification.email);
      const html = await generateEmailTemplate({ itemId: variant.itemId, template: 'backInStock' });

      const mailOptions = { from: process.env.EMAIL_USER, bcc, subject: 'Item back in stock', html };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log('Email sent: ' + info.response);
      });
    }
  }

  const [item, isCreated] = await Variant.upsert({ ...request.body, id });
  response.status(200).json();
});

itemsRouter.put('/status/:id', async (request, response) => {
  const id = request.params.id;
  const item = await Item.findByPk(id);

  item.set({
    isActive: !item.isActive
  });
  item.save();

  response.status(200).json();
});

itemsRouter.put('/:id', async (request, response) => {
  const [item, created] = await Item.upsert({
    ...request.body
  });

  response.status(201).json();
});

itemsRouter.delete('/image/:id', async (request, response) => {
  console.log(request.params);
  const id = request.params.id;
  const image = await Image.findByPk(id);
  await image.destroy();

  response.status(201).json();
});

module.exports = itemsRouter;
