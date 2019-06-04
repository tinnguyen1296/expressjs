//Declare
const express = require('express');
const app = express();
const routeUsers = require('./routers/userRouter');
const expressLayouts = require('express-ejs-layouts');


//App set
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);

app.use(express.static('public'));app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(expressLayouts);
app.use('/users', routeUsers);

app.get('/', function(req, res, next) {
  res.render('index', { page:'Home', menuId:'home' });
});

app.listen(3000);
