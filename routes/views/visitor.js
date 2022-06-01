const router = require('express').Router();

router.get('/signin', (req, res) => {
  res.render('visitor/login', { title: 'Visitor Login' });
});

router.get('/donors', (req, res) => {
  res.render('visitor/donors', { title: 'Donors' });
})

router.get('/:id', (req, res) => {
  res.render('visitor/donor', { title: 'Donor', id: req.params.id });
});

module.exports = router;