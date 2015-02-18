var Hapi = require('hapi');
var Wreck = require('wreck');

var server = new Hapi.Server();
server.connection({ port: 9999 });

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    console.info('request: ', request.path);
    Wreck.get(request.path, function (err, res, payload) {
      if (err) {
        console.error(err);
      }
      reply(payload);
    });
  }
});