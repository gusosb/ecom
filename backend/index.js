const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./controllers/users');
const siteRouter = require('./controllers/site');
const categoriesRouter = require('./controllers/categories');
const ordersRouter = require('./controllers/orders');
const itemsRouter = require('./controllers/items');
const miscRouter = require('./controllers/misc');

const { connectToDatabase } = require('./util/db');
const { PORT } = require('./util/config');

const scheduledJobs = require('./scheduled-jobs');

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/items', itemsRouter);
app.use('/api/site', siteRouter);
app.use('/api/misc', miscRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});