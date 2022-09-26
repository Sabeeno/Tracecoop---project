const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var network = require('./fabric/network');
const { response } = require('express');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());



app.get('/queryallcars', (req, res) => {
  network.queryAllCars()
    .then((response) => {
      var carsRecord = JSON.parse(response);
      res.send(carsRecord)
    })
})

app.get('/query/:key', (req, res) => {

  network.queryCar(req.params.key)
    .then((response) => {
      var carRecord = JSON.parse(response);
      res.send(carRecord)
    })
})





app.post('/createcar', (req, res) => {
  network.queryAllCars()
    .then((response) => {
      var carsRecord = JSON.parse(response);
      var numCars = carsRecord.length;
      var newKey = 'CAR' + numCars;
      network.createCar(newKey, req.body.make, req.body.model, req.body.color, req.body.owner)
        .then((response) => {
          res.send(response)
        })
    })
})


app.put('/changecarowner', (req, res) => {
  network.changeCarOwner(req.body.key, req.body.newOwner)
      .then((response) => {
        res.send(response)
      })
})



app.get('/query/make/:make', (req, res) => {
  network.queryCarsMake(req.params.make)
    .then((response) => {
      var carsRecord = JSON.parse(response)
      res.send(carsRecord)
    })
    
})



// listen on the port
app.listen(port);