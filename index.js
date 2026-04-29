const express = require('express');
const app = express();
require('dotenv').config();

const sequelize = require('./config/db');
const userRoutes = require('./routes/route');


require('./models/userModel');
require('./models/productModel');
require('./models/purchaseModel');
require('./models/purchaseItemModel');
require('./models/vendorModel');

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// DB Connection
// sequelize.sync()
sequelize.sync({ alter: true })
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});