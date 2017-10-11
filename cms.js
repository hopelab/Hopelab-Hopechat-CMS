const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./server/controllers'));

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
