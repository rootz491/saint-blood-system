const router = require('express').Router();
const { isVisitor, isAuthenticated } = require('../../middleware');
const {
  getDonor, signin, getDonors
} = require('../../controllers/visitor');

//  @route   POST api/visitor/signin
//  @desc    Login visitor
//  @body    { name, bloodGroupType, bloodGroupSign }
router.post('/signin', signin);

//  @route   GET api/visitor/donors
//  @desc    Get all donors who are eligible to donate blood to visitor
router.get('/donors', isAuthenticated, isVisitor, getDonors);

// @route   GET api/visitor/:id
// @desc    Get donor's info
router.get('/:id', isAuthenticated, isVisitor, getDonor);

module.exports = router;