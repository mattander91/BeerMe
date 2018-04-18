const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../database/index.js').Users;
const BeerModel = require('../database/index.js').Beers;
const helpers = require('../helpers/brewerydb.js');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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


let port = process.env.port || 3001;

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

app.get('/beers', (req, res) => {
  helpers.getBeerData(req.query.searched, (data) => {
    if (data) {
      res.status(200).send(JSON.stringify(data));
    } else {
      console.log('failed to get brewdb data');
      res.sendStatus(500);
    }
  });
});

app.post('/signup', (req, res) => {
  let newUser = new UserModel({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt)
  });
  newUser.save(err => {
    if (err) {
      console.log('error ' + err);
      res.sendStatus(500);
    } else {
      console.log('user ' + req.body.username + ' saved');
      res.sendStatus(202);
    }
  });
});

app.post('/login', (req, res) => {
  UserModel.findOne({'username': req.body.username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      bcrypt.compare(req.body.password, data.password, (err, match) => {
        if (match) {
          res.sendStatus(201);
        } else {
          console.log('user not found/invalid credentials: ');
          res.sendStatus(500);
        }
      });
    }
  });
});

app.post('/saveBeer', (req, res) => {
  UserModel.update({"username": req.body.username}, {$addToSet: {beers: req.body.beerId}}, (err, data) => {
    if (err) {
      console.log('error updating beer: ', err);
      res.sendStatus(500);
    } else {
      console.log('updated');
      res.sendStatus(201);
    }
  });
});

app.post('/addNote', (req, res) => {
  let newNote = {note: req.body.text, id: req.body.id}
  UserModel.update({"username": req.body.username}, {$addToSet: {notes: newNote}}, (err, data) => {
    if (err) {
      console.log('error updating notes: ', err);
      res.sendStatus(500);
    } else {
      console.log('updated');
      res.sendStatus(201);
    }
  });
});

app.post('/wishList', (req, res) => {
  UserModel.update({"username": req.body.username}, {$addToSet: {wishList: req.body.beerId}}, (err, data) => {
    if (err) {
      console.log('error updating beer: ', err);
      res.sendStatus(500);
    } else {
      console.log('updated');
      res.sendStatus(201);
    }
  });
});

app.delete('/deleteBeer', (req, res) => {
  UserModel.update({username: req.body.username}, {$pull: {beers: req.body.id}}, (err, data) => {
    if (err) {
      console.log('error removing beer: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});

app.delete('/deleteWishlistBeer', (req, res) => {
  UserModel.update({username: req.body.username}, {$pull: {wishList: req.body.id}}, (err, data) => {
    if (err) {
      console.log('error removing beer: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(202);
    }
  });
});



///////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});