// Process
require('dotenv').config();

//Declare
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//Router
const routeUsers = require('./routers/userRouter');
const routeProducts = require('./routers/productRouter');
const routeAuth = require('./routers/authRouter');

//Middlewares
const middlewareLogin = require('./middlewares/loginMiddleware');


//App set
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);

//App use
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

//Socket IO
io.on('connection', socket => { console.log(socket.id) });
