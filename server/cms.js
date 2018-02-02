const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');
const multipart = require('connect-multiparty');
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/../client/build'));
app.use(bodyParser.urlencoded({ limit: '1000000mb', extended: true }));
app.use(bodyParser.json({limit: '10000000mb'}));
app.use(multipart({ uploadDir: '/tmp' }));
app.use(errorHandler);
app.use(require('./controllers'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
