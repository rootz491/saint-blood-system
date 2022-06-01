const router = require('express').Router();
const { isAdmin, isAuthenticated } = require('../../middleware');
const {
  deleteDonor, login, showDonors, signup
} = require('../../controllers/admin');

//  @route   GET api/admin/donors
//  @desc    Get all donors
router.get('/donors', isAuthenticated, isAdmin, showDonors);

//  @route   POST api/admin/login
//  @desc    Login admin
//  @body    { email, password }
router.post('/login', login);

//  @route  POST api/admin/signup
//  @desc   Signup admin
//  @body   { email, password, name }
router.post('/signup', signup);

//  @route   DELETE api/admin/donor/
//  @desc    Delete donor
//  @body   { id: String }
router.delete('/donor/', isAuthenticated, isAdmin, deleteDonor);

module.exports = router;