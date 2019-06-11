const db = require('../db.js');

const products = db.get('products');


controller = {};

controller.index = (req, res) => {
  const len = products.value().length;
  const numberPage = parseInt(req.query.page) || 1;
  const perPage = 9;
  const totalPag = Math.ceil(len/perPage);
  const totalperPage = 3;
  const before = parseInt(numberPage) - 1;
  const after = parseInt(numberPage) + 1;

  let showPag = [1, 2, 3];

  if(numberPage >= totalperPage && numberPage < totalPag) {
    showPag = [before, parseInt(numberPage), after];
  } else if(numberPage === totalPag) {
    showPag = [before - 1, before, parseInt(numberPage)];
  }

  let begin = (numberPage - 1) * perPage;
  let end = numberPage * perPage;

  res.render('products/index', {
    title: "Products",
    products: products.value().slice(begin, end),
    showPag: showPag,
    active: numberPage,
    totalPag: totalPag,
  });
}


module.exports = controller;
