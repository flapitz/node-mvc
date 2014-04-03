/**
 * @module mvc
 */

var routes = [
    {
        path: '/api/:controller/:id?',
        options: {
            folder: 'controllers'
        }
    }
];

/**
 * Adds a new route based on the given information.
 * @param  {string} path     The path for this route to use.
 * @param  {object} options  The options to use for this route.
 */
exports.route = function mvc_route (path, options) {
    routes.push({
        path: path,
        options: options || {
            folder: 'controllers',
            defaults: {}
        }
    });
};

/**
 * Registers all routes with the given Express application.
 * @param  {object} app The Express application.
 */
exports.register = function mvc_register (app) {
    routes.forEach(function (curRoute) {
        var options = curRoute.options;

        function getController (req) {
            var controllerName = req.params.controller || options.defaults.controller;
            return require(process.cwd() + '/' + options.folder + '/' + controllerName + 'Controller');
        }

        function getId (req) {
            return req.params.id;
        }

        function getData (req) {
            return req.body;
        }

        function handleRequestParams (req, res, next) {
            var routePathParts = curRoute.path.split('/');
            routePathParts.forEach(function (curPart) {
                if (curPart[0] === ':') {
                    var param = '';

                    if (curPart[curPart.length - 1] === '?') {
                        param = curPart.substring(1, curPart.length - 1);
                    } else {
                        param = curPart.substring(1);
                    }

                    req.params[param] = req.params[param] || (options.defaults && options.defaults[param]);
                }
            });
            next();
        }

        app.get(curRoute.path, handleRequestParams, function mvc_get (req, res) {
            var controller = getController(req),
                id = getId(req);

            if (id) {
                controller.getById(req, res, id);
            } else {
                controller.getAll(req, res);
            }
        });

        app.post(curRoute.path, handleRequestParams, function mvc_post (req, res) {
            var controller = getController(req),
                data = getData(req);

            controller.create(req, res, data);
        });

        app.put(curRoute.path, handleRequestParams, function mvc_put (req, res) {
            var controller = getController(req),
                id = getId(req),
                data = getData(req);

            controller.update(req, res, id, data);
        });

        app.del(curRoute.path, handleRequestParams, function mvc_del (req, res) {
            var controller = getController(req),
                id = getId(req);

            controller.remove(req, res, id);
        });
    });
};
