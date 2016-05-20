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
var OpenBazaarAPI = require('insane-openbazaar-api');

//
// for (var i=0; i<Object.keys(process.env).length; i++) {
//   if( Object.keys(process.env)[i].substring(0, 3) == 'OB_')
//     console.log('%s=%s', Object.keys(process.env)[i], process.env[Object.keys(process.env)[i]]);
// }

var ob = new OpenBazaarAPI({
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


function resolveOneName(req, res) {

}




/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function isOnline(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  //console.log(req.swagger.params)
  var guid = req.swagger.params.guid.value || '';


  var online;

  if (!guid) return res.status(400).json({"error": {"code": 1, "message": "no guid was received!"}});
  //var hello = util.format('Hello, %s!', name);

  ob.get('profile', guid, function(err, reply) {

    if (err) {
      console.log(err);
      return res.status(500).json({
        "online": false,
        "error": {
          "code": 2,
          "message": err.message
        }
      });
    }

    // assume offline if no profile retrieved
    if (typeof reply.profile === 'undefined') return res.status(200).json({
      "online": false,
      "short_description": ""
    });

    // this sends back a JSON response which is a single string
    res.status(200).json({"online": true, "short_description": reply.profile.short_description});
  });

}
