/**
 * Created by chaolinding on 2017/10/25.
 */
var gm = require('gm');
var _name = "China中文";
gm('./0.jpg')
    .font('./st_black.ttf')
    .drawText(20,30,"你")
    .drawText(50, 50 , "好")
    .drawText(70, 70 ,"色")
    .drawText(110, 110, "彩")
    //.resize(240, 240)
    .write('./0.jpg', function(err) {
        if (!err){
            console.log('done');
        }else{
            console.log(err.message || "出错了！");
        }
    });

