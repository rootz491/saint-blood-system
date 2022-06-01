const router = require('express').Router();
const { isAuthenticated, isDonor, isAdmin } = require('../../middleware');
const {
  getUser, login, signup, updateUser, getUserById
} = require('../../controllers/donor');

//  @route   GET api/donor/
//  @desc    Get current donor's info
router.get('/', isAuthenticated, isDonor, getUser);

//  @route   POST api/donor/:id
//  @desc    get donor's info
router.get('/:id', isAdmin, getUserById);

//  @route   POST api/donor/login
//  @desc    Login donor
//  @body    { email, password }
router.post('/login', login);

//  @route   POST api/donor/signup
//  @desc    Signup donor
//  @body    { email, password, name, bloodGroupType, bloodGroupSign, phone, age, weight, address }
router.post('/signup', signup);

//  @route   PUT api/donor/:id
//  @desc    Update donor's info (partially)
//  @body    { phone, age, weight, address }
router.put('/:id', isAuthenticated, isDonor, updateUser);

module.exports = router;