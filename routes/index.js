let express = require('express');
let router = express.Router();
let axios = require('axios');
const allChamps = require('../API/allChamps.js');
const champID = require('../API/champID.js');
const roles = require('../API/roles.js');
const items = require('../API/items.js');
const maps = require('../API/maps.js');
const user_profiles = require('../API/profileIcons.js');
const itemBuild = require('../API/itemBuild.js');


router.get('/', function(req, res, next) {
  res.json(allChamps);
});

router.get('/champID', function(req, res, next) {
  res.json(champID);
});

router.get('/roles', function(req, res, next) {
  res.json(roles);
});

router.get('/items', function(req, res, next) {
  res.json(items);
});

router.get('/itemsbuild', function(req, res, next) {
  res.json(itemBuild);
});

router.get('/maps', function(req, res, next) {
  res.json(maps);
});


router.get('/profiles', function(req, res, next) {
  res.json(user_profiles);
});



module.exports = router;