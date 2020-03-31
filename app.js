//install express module
const express = require('express');
const app = express();


//defining a static server to serve static pages
const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));
//set view engine to pug
app.set('view engine', 'pug');

//create path and import routes
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const projectRoute = require('./routes/project');

app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/project', projectRoute);

//Error handling for non-exist pages
app.use((req, res, next) => {
    const err = new Error("Page not found");ç
    err.status = 404;
    console.log(err);
    next(err);
});

//Error middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(3000, () => {
    console.log('Application is running on localhost:3000');
})

