var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy');

//require('colors');

var welcome = [
  '#    # ##### ##### #####        #####  #####   ####  #    # #   #',
  '#    #   #     #   #    #       #    # #    # #    #  #  #   # # ',
  '######   #     #   #    # ##### #    # #    # #    #   ##     #  ',
  '#    #   #     #   #####        #####  #####  #    #   ##     #  ',
  '#    #   #     #   #            #      #   #  #    #  #  #    #  ',
  '#    #   #     #   #            #      #    #  ####  #    #   #  '
].join('\n');

util.puts(welcome.rainbow.bold);

//
// Basic Http Proxy Server
//
httpProxy.createServer({
  target:'http://localhost:9003'
}).listen(8003);

//
// Target Http Server
//
http.createServer(function (req, res) {
  util.puts('request successfully proxied to: '.blue + req.url.green.bold + '\n' + JSON.stringify(req.headers, true, 2).yellow);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9003);

util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8003'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9003 '.yellow);