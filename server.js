(function() {
    "use strict";
    var express = require('express'),
        bodyParser = require('body-parser'),
        _ = require('underscore'),
        json = require('./todo.json'),
        app = express();
    app.set('port', process.env.PORT || 3500);
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    var router = new express.Router();
    router.get('/', function (req, res) {
        "use strict";
        res.json(json);
    });
    router.post('/', function (req, res) {
        "use strict";
        if (req.body.Id && req.body.Todo && req.body.Details) {
            json.push(req.body);
            res.json(json);
        } else {
            res.join(500, {
                error: 'There was an error...'
            });
        }
    });
    router.put('/:id', function (req, res) {
        "use strict";
        if (req.params.id && req.body.Todo && req.body.Details) {
            _.each(json, function (elem, index) {
                if (elem.Id === req.params.id) {
                    elem.Todo = req.body.Todo;
                    elem.Details = req.body.Details;
                }
            });
            res.json(json);
        } else {
            res.join(500, {
                error: 'There was an error...'
            });
        }
    });
    router.delete('/:id', function (req, res) {
        "use strict";
        var indexToDelete = -1;
        _.each(json, function (elem, index) {
            if (elem.Id === req.params.id) {
                indexToDelete = index;
            }
        });
        if (~indexToDelete) {
            json.splice(indexToDelete, 1);
        }
        res.json(json);
    });
    app.use('/', router);
    var server = app.listen(app.get('port'), function () {
        "use strict";
        console.log('Server up: http://localhost:' + app.get('port'));
    });
}());