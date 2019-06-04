const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const users = db.get('users');
const shortid = require('shortid');

const controller = {};

controller.index = (req, res) => {
  res.render('users/index', { users: users.value(), title: 'Users' });
}

controller.create = (req, res) => {
  res.render('users/form', { title: "Create User", action: "create", user: "" });
}

controller.edit = (req, res) => {
  const id = req.params.id;
  const result = users.value().find( user => user.id === id);
  res.render('users/form', { title: "Edit User", action: "edit", user: result });
}

controller.add = (req, res) => {
  req.body.id = shortid.generate();
  users.push(req.body).write();
  res.redirect('/users');
}

controller.detail = (req, res) => {
  const id = req.params.id;
  const result = users.value().find( user => user.id === id);
  res.render('users/detail', { user: result, title: 'Detail' });
}

module.exports = controller;
