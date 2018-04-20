const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../database/index.js').Users;
const helpers = require('./helpers.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const path = require('path');

let app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist/')));

let port = process.env.PORT || 3000;

//gets users tried beers and wishlist beers
app.get('/getUserInfo', (req, res) => {
  let userInfo = {};
  UserModel.findOne({"username": req.query.username}, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      helpers.getBeerId(result.beers, {withBreweries: 'Y'}, (data, err) => {
        if (data) {
          userInfo.beers = data;
          helpers.getBeerId(result.wishList, {withBreweries: 'Y'}, (data, err) => {
            if (data) {
              res.status(200);
              userInfo.wishList = data;
              res.send(userInfo);
            } else {
              res.sendStatus(500);
            }
          });
        } else {
          res.sendStatus(500);
        }
      });
    }
  });
});


//Calls brewerydb API when user searches for beers
app.get('/beers', (req, res) => {
  helpers.getBeerData(req.query.searched, (data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      // console.log('failed to get brewdb data');
      res.sendStatus(500);
    }
  });
});

//Handles new user signup
app.post('/signup', (req, res) => {
  let newUser = new UserModel({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
  });
  newUser.save(err => {
    if (err) {
      // console.log('error ' + err);
      res.sendStatus(500);
    } else {
      // console.log('user ' + req.body.username + ' saved');
      res.sendStatus(202);
    }
  });
});

//Handles user login
app.post('/login', (req, res) => {
  UserModel.findOne({'username': req.body.username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      bcrypt.compare(req.body.password, data.password, (err, match) => {
        if (match) {
          res.sendStatus(201);
        } else {
          // console.log('user not found/invalid credentials: ');
          res.sendStatus(500);
        }
      });
    }
  });
});

app.post('/saveBeer', (req, res) => {
  UserModel.update({"username": req.body.username}, {$addToSet: {beers: req.body.beerId}}, (err, data) => {
    if (err) {
      // console.log('error updating beer: ', err);
      res.sendStatus(500);
    } else {
      // console.log('updated');
      res.sendStatus(201);
    }
  });
});

app.post('/wishList', (req, res) => {
  UserModel.update({"username": req.body.username}, {$addToSet: {wishList: req.body.beerId}}, (err, data) => {
    if (err) {
      // console.log('error updating beer: ', err);
      res.sendStatus(500);
    } else {
      // console.log('updated');
      res.sendStatus(201);
    }
  });
});

app.delete('/deleteBeer', (req, res) => {
  UserModel.update({username: req.body.username}, {$pull: {beers: req.body.beerId}}, (err, data) => {
    if (err) {
      // console.log('error removing beer: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.delete('/deleteWishlistBeer', (req, res) => {
  UserModel.update({username: req.body.username}, {$pull: {wishList: req.body.beerId}}, (err, data) => {
    if (err) {
      // console.log('error removing beer: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});