const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
process.env.NODE_ENV === 'development' && app.use(require('morgan')('dev'));

app.use('/api/donor', require('./routes/donor'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/visitor', require('./routes/visitor'));

app.listen(process.env.PORT || 1337, async () => {
  console.log('Server started');
  await mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to database');
});