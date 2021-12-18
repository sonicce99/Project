const db = require("../config/db");
var express = require("express");
var router = express.Router();
const mysql = require('mysql');


router.get('/mysql', async function (req, res) {
  const mybatisMapper = require('mybatis-mapper');  //매핑할 마이바티스
  mybatisMapper.createMapper(['./model/BoardMapper.xml']);  //흔히 알고있는 매퍼로드(xml이 있는 디렉토리 주소&파일위치를 입력하여주세요!!!)

  const param = {
    product_id: req.query.productId,
    title: req.query.title,
    lowPrice: req.query.lowPrice
  }
  console.log(param)
  //질의문 형식
  var format = { language: 'sql', indent: '  ' };

  //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.
  var query = mybatisMapper.getStatement('BoardMapper', 'insertProduct', param, format);

  console.log(query);  //해당쿼리가 조합된 것을 볼 수 있다.

  db.query(query, function (error, results, fields) {  //조회
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
})


// router.get('/mysql', async function (req, res) {
//   const query = "INSERT INTO sonicce99.react(product_ID, product_count, insert_date) VALUES(?, ?, ?);";
//   db.query(query, [req.query.productId, 1, Number(new Date().getTime())], (error, data) => {
//     res.send(data)
//   });
// })

module.exports = router;