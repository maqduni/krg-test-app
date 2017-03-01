// Router
let express = require('express'),
    router = express.Router()
    rest = require('../helpers/rest.helpers'),

    host = 'jsonplaceholder.typicode.com';

let _fillInVoids = () => {
    
};

router.get('/:id', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/posts/${req.params.id}`,
        method: 'GET'
    }).then(({status, data}) => {
        res.send({
            message: 'posts',
            status: status,
            result: data
        });
    }, (error) => {
        // console.error('Promise error', error);
        next(error);
    });
});

router.get('/', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/posts`,
        method: 'GET'
    }).then(({status, data}) => {
        res.send({
            message: 'all posts',
            status: status,
            result: data
        });
    }, (error) => {
        // console.error('Promise error', error);
        next(error);
    });
});

module.exports = {
    router: router,
    prefix: '/posts'
};