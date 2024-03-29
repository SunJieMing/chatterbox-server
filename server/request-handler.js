/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */




var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  // console.log(messages); // test to see if basic-server.js/messages is accessible

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
   //var qs = require('querystring');

   if (request.method === 'GET'){
     response.end( JSON.stringify(messages));
   } else if (request.method === 'OPTIONS'){
     response.end( JSON.stringify(messages));
   } else if (request.method === 'POST' && request.url === '/send'){

     var body = '';
     request.on('data', function(data){
      body += data;

     });
     request.on('end', function() {
       var post = JSON.parse(body);
       //console.log(JSON.parse(post));
       messages.results.push(post);
     });
   }
  response.end( JSON.stringify(messages) );

  // response.end( function() {
  //   JSON.stringify(messages)
  // }); // response.end with anonymous function
}; // end handleRequest

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;

/////////////////// MESSAGES ///////////////////////
var messages = {
  results: [
    {username: 'Aaron', text: 'Hello world!', roomname: 'The HR', createdAt: new Date(), updatedAt: new Date()},
    {username: 'Ben', text: 'Sup wurld!', roomname: 'The HR', createdAt: new Date(), updatedAt: new Date()}
  ] // create a 'results' array
}; // end messages{}


// FOR REFERENCE: App.js line 213
// var message = {
//   username: app.username,
//   text: app.$message.val(),
//   roomname: app.roomname || 'lobby'
// };


// var newMessage = function(a, b, c) {
//   var msgTemplate = {
//     username: '',
//     text: '',
//     roomname: '',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }; // end msgTemplate
// }; // end newMessage
