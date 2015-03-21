var Util = require('util');
var HttpProxy = require('http-proxy');
var Hapi = require('hapi');

require('colors');

var welcome = [
  '#####  #####   ####  #    #',
  '#    # #    # #    #  #  # ',
  '#    # #    # #    #   ##  ',
  '#####  #####  #    #   ##  ',
  '#      #   #  #    #  #  # ',
  '#      #    #  ####  #    #'
].join('\n');
Util.puts(welcome.rainbow.dim);

//
// Basic Http Proxy Server
//
var proxy = HttpProxy.createProxyServer({});

proxy.on('error', function (err) {
  console.log(err);
  Util.puts('error: '.red.bold + err.red);
});

//
// Target Http Server
//
var port = 8090;
var server = new Hapi.Server();
server.connection({ port: port });

server.start(function () {
  Util.puts('proxy server '.blue + 'started '.green.bold + 'on port '.blue + port.toString().yellow);
});

var proxyRequest = function (request) {
  Util.puts('proxying request for: '.blue.bold + request.url.href.yellow);
  proxy.web(request.raw.req, request.raw.res, { target: request.url.href, hostRewrite: true });
};

server.route({ method: '*', path: '/{path*}', handler: proxyRequest});