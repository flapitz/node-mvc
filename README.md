NodeMvc
========
NodeMvc is a Node framework that brings the power and rapid
development of MVC to the speed and ubiquity of Node.  This project is
currently in development.

Dependencies
------------
NodeMvc has no direct dependencies, but it's designed to be used with
the Express framework.

How to Use
----------
To use NodeMvc, simply pass your Express application to the register
function, like so:

    var mvc = require('mvc');
    var express = require('express');
    var app = express();
    
    mvc.register(app);

After registering your application, NodeMvc will automatically try to
map requests using the form "METHOD /controllerName/id" to a file
that's named after the "controllerName" in the route, located in the
"controllers" directory.  Depending on the method (GET, PUT, POST,
DELETE), it will call a different function on the controller, along
with different parameters.

### Get Without Id ###

`controller.getAll(request, response)`

### Get With Id ###

`controller.getById(request, response, id)`

### Post ###

`controller.create(request, response, data)`

### Put ###

`controller.update(request, response, id, data)`

### Delete ###

`controller.delete(request, response, id)`

Customizing
-----------
You can add additional routes using the route function, which takes a
normal Express router route.  You can also customize the details of
the route by passing in an optional options object, which takes a
folder name to look for the controllers in, as well as a defaults
object that defines a key/value mapping for your route parameters.
NodeMvc will automatically set the given default values to the route
parameters if they don't exist.

    mvc.route('organizations/:orgId?/:controller?/:id?', {
        folder: 'src/controllers',
        defaults: {
           orgId: 'main',
           controller: 'projects'
        }
    });

