'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var Api = require('insane-openbazaar-api');

console.log(process.env.OB_USERNAME);
var ob = new Api({
  "host": process.env.OB_HOST,
  "port": process.env.OB_PORT,
  "proto": process.env.OB_PROTO,
  "username": process.env.OB_USERNAME,
  "password": process.env.OB_PASSWORD
});


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  isOnline: isOnline
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function isOnline(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  console.log(req.swagger.params)
  var guid = req.swagger.params.guid.value || '';
  var online;
  var short_description;

  if (!guid) return res.json({"error": {"code": 1, "message": "no guid was received!"}});
  //var hello = util.format('Hello, %s!', name);

  // @todo #todo - make call
  ob.profile(guid, function(err, prof) {

    if (err) return res.json({"error": {"code": 2, "message": err}});
    if (typeof prof.profile === 'undefined') return res.json({"error": {"code": 3, "message": err}});

    // this sends back a JSON response which is a single string
    res.json({"online": true, "short_description": short_description});
  });

}
