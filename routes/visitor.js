const router = require('express').Router();
const {
  getDonor, signin, signout, getDonors
} = require('../controllers/visitor');

// @route   GET api/visitor/:id
router.get('/:id', getDonor);

//  @route   GET api/visitor/donors
router.get('/', getDonors);

//  @route   POST api/visitor/signin
router.post('/signin', signin);

//  @route   POST api/visitor/signout
router.post('/signout', signout);

module.exports = router;