// App
let express = require('express'),
    app = express();

// API Routes
let routes = [
    require('./api/posts.proxy'),
    require('./api/trackers.proxy')
];
routes.forEach(({prefix, router}) => {
    console.log(`Registering router at ${prefix}`);
    app.use(prefix, router);
});

// Static route to serve Angular2 app
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'ts', 'css', 'js']
}
// Use 'wwwroot' for dev environemnt, otherwise use 'wwwroot/public'
app.use('/', express.static('wwwroot', options));

// Error handling
app.use((err, req, res, next) => {
    console.error('Error', err.stack || err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send({
        message: 'Error occured',
        error: err,
        stack: err.stack
    });
});

let server = app.listen(8080, () => {
    let host = server.address().address,
        port = server.address().port;

    console.log("App listening at http://%s:%s", host, port)
});