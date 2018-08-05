var express = require('express');
var router = express.Router();
var mysql = require('mysql');


//----------------------------------------------
// 載入使用權檢查
//----------------------------------------------
var authorize = require('./lib/authorize.js');
//----------------------------------------------

//----------------------
// 引用db.js
//----------------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var diaryTagData;


  //------------------	
// 先取出日記tag資料
//------------------
  pool.query('select * from diarytag', function(err, results) {       
      if (err) {
        diaryTagData=[];
      }else{
        diaryTagData=results;
      }
     
     

          //------------------------------------------   
          // 將日記tag送給輸入表單
          //------------------------------------------
          res.render('careerDiaryContentCreateT', {diaryTagData:diaryTagData, memNo:req.session.memNo, memName:req.session.memName, memTitle:req.session.memTitle,picture:req.session.picture});
     }); 
  });
  
module.exports = router;
