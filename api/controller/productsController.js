const db = require('../../db');

const products = db.get('products');

const controller = {};

controller.index = (req, res) => {
  const activePage = parseInt(req.query.page) || 1;
  const perPage = 9;
  const totalProductCount = products.value().length;

  let begin = (activePage - 1) * perPage;
  let end = activePage * perPage;

  if(products.length === 0) {
    return res.status(204).send({
      success: true,
      message: 'Products not found'
    })
  }
  const data = {
    products: products.value().slice(begin, end),
    activePage: activePage,
    totalProductCount: totalProductCount,
  }
  return res.status(200).send({
    success: true,
    message: 'todo added successfully',
    data
  })
}

module.exports = controller;
