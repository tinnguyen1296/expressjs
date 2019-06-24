const db = require('../../db');

const products = db.get('products');

const controller = {};

controller.index = (req, res) => {
  const len = products.value().length;
  const numberPage = parseInt(req.query.page) || 1;
  const perPage = 9;
  const totalPag = Math.ceil(len / perPage);
  const totalperPage = 3;
  const before = parseInt(numberPage) - 1;
  const after = parseInt(numberPage) + 1;

  let showPag = [1, 2, 3];

  if (numberPage >= totalperPage && numberPage < totalPag) {
    showPag = [before, parseInt(numberPage), after];
  } else if (numberPage === totalPag) {
    showPag = [before - 1, before, parseInt(numberPage)];
  }

  let begin = (numberPage - 1) * perPage;
  let end = numberPage * perPage;

  if(products.length === 0) {
    return res.status(204).send({
      success: true,
      message: 'Products not found'
    })
  }
  const data = {
    title: "Products",
    // products: products
    data: products.value().slice(begin, end),
    showPag: showPag,
    active: numberPage,
    totalPag: totalPag,
  }
  return res.status(200).send({
    success: true,
    message: 'todo added successfully',
    data
  })
}

module.exports = controller;
