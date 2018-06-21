const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.post('/purchase', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.status(200).send({name: 'fred'})
});

app.listen(3000, () => {
   console.log('listening on port 3000');
});
