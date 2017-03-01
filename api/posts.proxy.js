// Router
let express = require('express'),
    router = express.Router(),
    rest = require('../helpers/rest.helpers'),

    host = 'jsonplaceholder.typicode.com';


router.get('/:id', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/posts/${req.params.id}`,
        method: 'GET'
    }).then(({status, data}) => {
        res.send(data);
    }, (error) => {
        next(error);
    });
});

router.get('/', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/posts`,
        method: 'GET'
    }).then(({status, data}) => {
        res.send(data);
    }, (error) => {
        next(error);
    });
});

module.exports = {
    router: router,
    prefix: '/posts'
};