const app = require('./../app.js');
const debug = require('debug')('wlust360:server');
const http = require('http');

//get port 
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);
server.on('listening', () => {
   debug('Listening on ' + PORT);
});

