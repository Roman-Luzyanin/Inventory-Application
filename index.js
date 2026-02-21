require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const homeRouter = require('./routes/homeRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.locals.currentPath = req.originalUrl.slice(req.originalUrl.indexOf('=') + 1);
    //, req.originalUrl.indexOf('&') !== -1 ? req.originalUrl.indexOf('&') : req.originalUrl.length);
    next();
});

app.use('/', homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port: ${port}`);
})
