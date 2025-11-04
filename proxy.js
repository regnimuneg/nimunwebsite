const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'ws://127.0.0.1:3000'
  });
});

server.listen(3000);
