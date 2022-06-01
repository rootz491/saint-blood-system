const router = require('express').Router();
const { isAuthenticated, isDonor } = require('../../middleware');
const Donor = require('../../schema/donor');

router.get('/login', (req, res) => {
  res.render('donor/login', { title: 'Donor Login' });
});

router.get('/signup', (req, res) => {
  res.render('donor/signup', { title: 'Donor Signup' });
});

router.get('/profile', async (req, res) => {
  try {
    res.render('donor/profile', { title: 'Donor Profile' });
  } catch (error) {
    console.log(error);
    res.render('common/error', { title: 'Error', message: 'something went wrong! Please try again later.' });
  }
});

module.exports = router;