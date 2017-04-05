var express = require('express');
var app = express();

var session = require('express-session');
var cookieParser = require('cookie-parser');

var i18n = require('i18n');

i18n.configure({
	//define how many languages we would support in our application
	locales:['en', 'zh'],
	//define the path to language json files, default is /locales
	directory: __dirname + '/locales',
	//define the default language
	defaultLocale: 'en',
	// where to register __() and __n() to, might be "global" if you
    // know what you are doing
    //register: global,
	// define a custom cookie name to parse locale settings from 
	//cookie: 'i18n'
	cookie: 'lang'
});

app.set('view engine', 'jade');

app.use(cookieParser("i18ndemo"));

app.use(i18n.init);

app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/', function (req, res) {
    //res.setLocale(req.cookies.i18n);
	res.setLocale(req.cookies.lang);
    //res.render('main', {
    //    i18n: res
    //})
	
	res.render('main', {
        lang: res
    })
});

app.get('/contact', function (req, res) {
    res.render('contact', {
       lang: res
    })
});

app.get('/zh', function (req, res) {
    res.cookie('lang', 'zh');
    res.redirect('/')
});

app.get('/en', function (req, res) {
    res.cookie('lang', 'en');
    res.redirect('/')
});
	
app.listen(8080);