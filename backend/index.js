const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Use environment variable for MongoDB URL
const url = process.env.MONGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/LoginRegister'));
app.use('/users', require('./routes/coupon'));

// Use environment variable for port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});