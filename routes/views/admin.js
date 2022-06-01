const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login Portal' });
});

router.get('/dashboard', (req, res) => {
  res.render('admin/main', { title: 'Admin Dashboard' });
});

router.get('/donor/:id', (req, res) => {
  res.render('admin/donor', { title: 'Donor Details', id: req.params.id });
})

module.exports = router;