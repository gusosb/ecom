const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./controllers/users');
const siteRouter = require('./controllers/site');
const categoriesRouter = require('./controllers/categories');
const ordersRouter = require('./controllers/orders');
const itemsRouter = require('./controllers/items');

const { connectToDatabase } = require('./util/db');
const { PORT } = require('./util/config');

const scheduledJobs = require('./scheduled-jobs');

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://gustaflund.com', 'https://www.gustaflund.com'];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/site', siteRouter);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
