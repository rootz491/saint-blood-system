const router = require('express').Router();
const {
  getUser, login, logout, signup, updateUser
} = require('../controllers/donor');

//  @route   GET api/donor/:id
//  @desc    Get current donor's info
router.get('/', getUser);

//  @route   POST api/donor/login
//  @desc    Login donor
//  @body    { email, password }
router.post('/login', login);

//  @route   POST api/donor/logout
//  @desc    Logout donor
//  @body    {}
router.post('/logout', logout);

//  @route   POST api/donor/signup
//  @desc    Signup donor
//  @body    { email, password, name, bloodGroupType, bloodGroupSign, phone, age, weight, address }
router.post('/signup', signup);

//  @route   PUT api/donor/:id
//  @desc    Update donor's info (partially)
//  @body    { phone, age, weight, address }
router.put('/:id', updateUser);

module.exports = router;