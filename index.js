const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
process.env.NODE_ENV === 'development' && app.use(require('morgan')('dev'));

app.use('/api/donor', require('./routes/api/donor'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/visitor', require('./routes/api/visitor'));

app.use('/donor', require('./routes/views/donor'));
app.use('/admin', require('./routes/views/admin'));
app.use('/visitor', require('./routes/views/visitor'));
app.use('/', require('./routes/views/index'));

app.use('/error', (req, res) => {
  res.status(400).render('common/error', { title: 'Error', message: req.query.message ?? 'are you lost? contact @rootz491 ⭐️' });
})

app.use('*', (req, res) => {
  res.status(404).render('common/error', { title: 'Error', message: 'Page not found!' });
});

app.listen(process.env.PORT || 1337, async () => {
  console.log('Server started');
  await mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to database');
});