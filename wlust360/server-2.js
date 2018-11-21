const history = require('connect-history-api-fallback');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(history());
app.use('/', serveStatic( path.join(__dirname + '/dist')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log('Listening on PORT : ', PORT);
});
