const db = require('../db');
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('login', { title: 'Login', values: { email: '', password: ''}, errors: '' });
}
module.exports.post = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const user = db.get('users').find( { email: email }).value();

  if(!user) {
    res.render('login', { title: 'Login', values: req.body, errors: 'User does not exist.' });
    return;

  }

  if(user.password !== password) {
    res.render('login', { title: 'Login', values: req.body, errors: 'Wrong password' });
    return;
  }

  res.cookie('userid', user.id, {
    signed: true
  });
  res.redirect('/users');
}
