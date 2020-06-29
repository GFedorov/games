const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb+srv://user:razdva34@samples-xv2be.mongodb.net/games?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});