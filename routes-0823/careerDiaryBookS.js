var express = require('express');
var router = express.Router();

//----------------------------------------------
// 載入使用權檢查
//----------------------------------------------
var authorize = require('./lib/authorize.js');
//----------------------------------------------

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
///------------------------------------------
  // 如尚未登入, 轉至未登入頁面
  //------------------------------------------
  if(!authorize.isPass(req)){
    res.render(authorize.illegalURL, {});
    return;
  }
  //------------------------------------------
  var memNo=req.session.memNo;

  var tagNo=req.query.tagNo;

  pool.query('select a.*,b.* from diary a ,smember b where a.tagNo=? and a.memNo=? and b.memNo=? ', [tagNo,memNo,memNo], function(err, results) {
         res.render('careerDiaryBookS', {memNo:req.session.memNo, memTitle:req.session.memTitle,picture:req.session.picture,data:results});
  });
});

module.exports = router;
