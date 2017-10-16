const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/../client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);
app.use(require('./controllers'));

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
