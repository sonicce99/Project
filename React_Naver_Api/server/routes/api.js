var express = require('express');
var router = express.Router();
router.use(express.json());
let dotenv = require("dotenv");
dotenv.config();
const request = require('request');



router.get("/naver/api", async (req, res) => {
  const url = 'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q=' + encodeURI(req.query.keyword)
  request.get(url, function (error, response, body) {
    res.send(body);
  });
})


router.get('/naver/shop', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/search/shop.json?display=100&query=' + encodeURI(req.query.para);
  var options = {
    url: api_url,
    headers: { 'X-Naver-Client-Id': process.env.CLIENT_ID, 'X-Naver-Client-Secret': process.env.CLIENT_SECRET }
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

router.post("/category", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/product?type=category"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

router.post("/category/sort", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/naverApi?type=shopList"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

module.exports = router;
