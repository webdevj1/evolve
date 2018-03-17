let express = require('express');
let router = express.Router();
const key = '?api_key=RGAPI-35ec265a-1dba-40db-801d-c8d5a44a45b7';
let axios = require('axios');
var config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};
const allChamps = require('../API/allChamps.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(allChamps)
});

module.exports = router;
