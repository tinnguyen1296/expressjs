const db = require('../../db');
const md5 = require('md5');
const authController = {};

authController.loginAPI = (req, res) => {
  // return res.status(200).send({
  //   success: true,
  //   message: 'cxzcxc'
  // })
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  const user = db.get('users').find( { email: email }).value();
  if(!user) {
    return res.status(204).send({
      success: true,
      message: 'User does not exist.',
    })
  }

  if(md5(user.password) !== password) {
    return res.status(205).send({
      success: true,
      message: 'Wrong password.',
    })
  }

  res.cookie('userid', user.id, {
    signed: true
  });

  return res.status(200).send({
    success: true,
    message: 'Successfully.',
  })
}

module.exports = authController;