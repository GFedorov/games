const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});