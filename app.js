const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const uri = process.env.MONGODB_URI || process.argv[2];
const PORT = process.env.PORT || 5000;
let router = require('./routers/router');
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`);
});