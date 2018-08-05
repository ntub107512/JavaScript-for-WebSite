var express = require('express');
var router = express.Router();

var pool = require('./lib/db.js');
var mysql = require('mysql');

var startPage=1;
var linePerPage=15; 
var navSegments=10;


/* GET home page. */
router.get('/', function(req, res, next) {
    var pageNo=parseInt(req.param('pageNo'));

    //--------------------------
    // 如果輸入參數不是數字
    //--------------------------
    if(isNaN(pageNo)){
        pageNo=1;
    }

    //--------------------------
    // 如果輸入參數小於1
    //--------------------------
    if(pageNo<1){
        pageNo=1;
    }

    //-----------------------
    // 如果點了上一個區段
    //-----------------------
    if(pageNo<startPage){
        startPage=startPage-navSegments;
    }

    //-----------------------
    // 如果點了下一個區段
    //-----------------------   
    if(pageNo>=(startPage+navSegments)){
        startPage=startPage+navSegments;
    }

    var memTitle=req.session.memTitle;
    console.log("----------------------------");
    console.log(memTitle);
    console.log("----------------------------");
    
    if(memTitle=="大學生"){
        pool.query('select count(*) as cnt from class', function(err, results) {
            if (err)throw err;
    
            var totalLine=results[0].cnt;
            var totalPage=Math.ceil(totalLine/linePerPage);
    
            pool.query('select * from class limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
                if (err) {
                    res.render('addFail', {});
                }
    
                if(results.length==0){
                    res.render('addFail', {});
                }else{
                    var recordNo=(pageNo-1)*linePerPage+1;
                    console.log("----------------------------");
                    console.log("大學生");
                    console.log("----------------------------");
                    res.render('courseT', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,memNo:req.session.memNo, memName:req.session.memName, memTitle:req.session.memTitle,picture:req.session.picture});
                }
            }); 
        }); 
    }else if (memTitle=="小學生"){
        pool.query('select count(*) as cnt from class', function(err, results) {
            if (err)throw err;
    
            var totalLine=results[0].cnt;
            var totalPage=Math.ceil(totalLine/linePerPage);
    
            pool.query('select * from class limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
                if (err) {
                    res.render('addFail', {});
                }
    
                if(results.length==0){
                    res.render('addFail', {});
                }else{
                    var recordNo=(pageNo-1)*linePerPage+1;
                    console.log("----------------------------");
                    console.log("小學生");
                    console.log("----------------------------");
                    res.render('course', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,memNo:req.session.memNo, memName:req.session.memName, memTitle:req.session.memTitle,picture:req.session.picture});
                }
            }); 
        }); 
    }else{
        pool.query('select count(*) as cnt from class', function(err, results) {
            if (err)throw err;
    
            var totalLine=results[0].cnt;
            var totalPage=Math.ceil(totalLine/linePerPage);
    
            pool.query('select * from class limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
                if (err) {
                    res.render('addFail', {});
                }
    
                if(results.length==0){
                    res.render('addFail', {});
                }else{
                    var recordNo=(pageNo-1)*linePerPage+1;
                    console.log("----------------------------");
                    console.log("沒登入");
                    console.log("----------------------------");
                    res.render('course', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,memNo:req.session.memNo, memName:req.session.memName, memTitle:req.session.memTitle,picture:req.session.picture});
                }
            }); 
        }); 
    } /*
    pool.query('select count(*) as cnt from class', function(err, results) {
        if (err)throw err;

        var totalLine=results[0].cnt;
        var totalPage=Math.ceil(totalLine/linePerPage);

        pool.query('select * from class limit ?, ?',[(pageNo-1)*linePerPage, linePerPage], function(err, results) {
            if (err) {
                res.render('addFail', {});
            }

            if(results.length==0){
                res.render('addFail', {});
            }else{
                var recordNo=(pageNo-1)*linePerPage+1;
                res.render('course', {data:results, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments,memNo:req.session.memNo, memName:req.session.memName, memTitle:req.session.memTitle,picture:req.session.picture});
            }
        }); 
    }); */
});

module.exports = router;                        