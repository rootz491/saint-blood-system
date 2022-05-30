const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bloodGroupType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'AB', 'O']
  },
  bloodGroupSign: {
    type: String,
    required: true,
    enum: ['+', '-']
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  weight: {
    type: Number,
    required: true,
    min: 50,
  },
  address: {
    type: String,
    required: true
  },
  visitors: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Donor', donorSchema);