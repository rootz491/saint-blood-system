const router = require('express').Router();
const {
  deleteDonor, login, showDonors, signup, logout
} = require('../controllers/admin');

//  @route   GET api/admin/donors
//  @desc    Get all donors
router.get('/donors', showDonors);

//  @route   POST api/admin/login
//  @desc    Login admin
//  @body    { email, password }
router.post('/login', login);

//  @route   POST api/admin/logout
//  @desc    Logout admin
//  @body    {}
router.post('/logout', logout);

//  @route  POST api/admin/signup
//  @desc   Signup admin
//  @body   { email, password, name }
router.post('/signup', signup);

//  @route   DELETE api/admin/donors/
//  @desc    Delete donor
//  @body   { id: String }
router.delete('/donors/', deleteDonor);

module.exports = router;