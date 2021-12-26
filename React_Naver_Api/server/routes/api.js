var express = require('express');
var router = express.Router();
router.use(express.json());
let dotenv = require("dotenv");
dotenv.config();
const request = require('request');
const { BsDisplay } = require('react-icons/bs');


// 네이버 자동완성 검색어 목록 가져오기
router.get("/naver/api", async (req, res) => {
  const url = 'https://mac.search.naver.com/mobile/ac?_q_enc=UTF-8&st=1&frm=mobile_nv&r_format=json&r_enc=UTF-8&r_unicode=0&t_koreng=1&ans=1&run=2&rev=4&q=' + encodeURI(req.query.keyword)
  request.get(url, function (error, response, body) {
    res.send(body);
  });
})

// 검색어 클릭시 네이버 상품 목록 가져오기
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

// 카테고리1,2,3,4 분류 값 가져오기
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

// 카테고리별 상품 목록 가져오기
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

// 상품 등록
router.post("/cart/insert", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/naverApi?type=save"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 사용자별 장바구니 아이디 가져오기
router.post("/cart/userId", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/cart?type=cart_id"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  request.post(options, function (error, response, body) {
    res.send(body)
  })
});

// 사용자 장바구니에 상품 담기
router.post("/cart/save", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/cart?type=save"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 장바구니 리스트 가져오기
router.post("/cart/cartList", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/cart?type=list"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 회원가입
router.post("/signIn", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/user?type=signup"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 로그인
router.post("/logIn", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/user?type=login"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 서버에서 webtoken (암호화된 사용자 정보) 받아오기 
router.post("/webtoken", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/user?type=webtoken"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 클라이언트에 있는 cookie 가 유효한 cookie 인지 검증
router.post("/sessionCheck", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/user?type=sessionCheck"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

// 클라이언트에 있는 password cookie 가 유효한 cookie 인지 검증
router.post("/sessionSignin", async (req, res) => {
  const api_url = "http://54.180.63.177:5001/api/user?type=sessionSignin"
  const options = {
    url: api_url,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: req.body
  }
  console.log(req.body)
  request.post(options, function (error, response, body) {
    res.send(body)
  })
})

module.exports = router;
