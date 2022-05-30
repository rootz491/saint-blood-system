const express = require('express');
const mongoose = require('mongoose');
const {
  isAdmin, isAuthenticated, isDonor, isNotVisitor, isVisitor
} = require('./middleware');
require('dotenv').config();

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(isAuthenticated);

app.use('/api/donor', isDonor, require('./routes/donor'));
app.use('/api/admin', isAdmin, require('./routes/admin'));
app.use('/api/visitor', isVisitor, require('./routes/visitor'));

app.listen(process.env.PORT || 1337, async () => {
  console.log('Server started');
  await mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to database');
});