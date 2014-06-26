var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Express' });

});
router.get('/txt',function(req,res){
    var URL = require('url'),
        queryString = URL.parse(req.url).query + '',
        cookQueryString = function (str) {
            var str = str || '';
            if (!str)return false;
            return (str.split('&'))[0].split('=');
        };
    if (!queryString)return;
    var qs = cookQueryString(queryString),
        readTxt = {
            fileurl: 'public/txt/' + decodeURIComponent(qs[1])+'.txt',
            read: function (dir) {
                fs.readFile(dir, 'UTF-8', function (err, data) {
                    if (data) {
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.end(data);
                    } else {
                        console.log(err)
                    }
                });
            },
            init: function () {
                this.read(this.fileurl);
            }
        }
    readTxt.init();
});
router.get('/list',function(req,res){
    var readList = {
        dir:'public/txt',
        read:function(dir){
            fs.readdir(dir,function(err,list){
                if(err){
                    console.log(err);
                    return;
                }
                var list = JSON.stringify(list).split(',');
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end('{"list":'+ list +'}');
            });
        },
        init:function(){
            this.read(this.dir);
        }
    }
    readList.init();
});

module.exports = router;
