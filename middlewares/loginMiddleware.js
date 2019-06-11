const db = require('../db.js');
module.exports.middlewareLogin = (req, res, next) => {
  res.locals.user = '';
  if(!req.signedCookies.userid) {
    res.redirect('admin/login');
    return;
  }


  var user = db.get('users').find({ id: req.signedCookies.userid }).value();

  if(!user) {
    res.redirect('admin/login');
    return;
  }

  res.locals.user = user;

  next();
}
