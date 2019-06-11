//Declare
require('dotenv').config()
const express = require('express');
const app = express();
const routeUsers = require('./routers/userRouter');
const routeProducts = require('./routers/productRouter');
const routeAuth = require('./routers/authRouter');
const middlewareLogin = require('./middlewares/loginMiddleware');

const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use('/users', middlewareLogin.middlewareLogin, routeUsers);
app.use('/products', middlewareLogin.middlewareLogin, routeProducts);
app.use('/admin', routeAuth);

app.get('/', function(req, res, next) {
  res.render('index', { title:'Home' });
});

app.listen(3000);
