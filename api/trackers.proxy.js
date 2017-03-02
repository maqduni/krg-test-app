// Router
let express = require('express'),
    router = express.Router(),
    rest = require('../helpers/rest.helpers'),

    host = 'kargotest.herokuapp.com';

let _generateDateRange = (from, to, dateLookupMap, includeRangeEdges = true) => {
    let fromDate = dateLookupMap[from] || (dateLookupMap[from] = new Date(from)),
        toDate = dateLookupMap[to] || (dateLookupMap[to] = new Date(to)),

        currentDate = fromDate,
        dateRange = [from];

    while(currentDate < toDate) {
        // console.log(currentDate);
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        dateRange.push(currentDate.toISOString().slice(0, 10));
    }

    if (!includeRangeEdges) {
        dateRange.shift();
        dateRange.pop();
    }

    return dateRange;
};

router.get('/', (req, res, next) => {
    rest.getJSON({
        host: host,
        path: `/api/trackers?from=${req.query.from}&to=${req.query.to}`,
        method: 'GET'
    }).then(({status, data}) => {
        // Sort results and fill in void dates
        let dateLookupMap = {};
        res.json(
            data.data.sort((a, b) => {
                // console.log(`a: ${a.date} ${a.date > b.date ? '>' : a.date < b.date ? '<' : '=='} b: ${b.date} `);
                return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
            })
            .reduce((acc, val) => {
                // console.log(acc);
                return acc.length === 0 
                ? acc.concat(val) 
                : acc.concat(
                    _generateDateRange(acc[acc.length - 1].date, val.date, dateLookupMap, false).map((date) => {
                        return {
                            id: -1,
                            hits: 0,
                            date: date
                        };
                    }),
                    val);
            }, [])
        );
    }, (error) => {
        next(error);
    });
});

module.exports = {
    router: router,
    prefix: '/api/trackers'
};