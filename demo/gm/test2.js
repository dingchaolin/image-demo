/**
 * Created by chaolinding on 2017/10/25.
 */
var gm = require('gm');
var fs = require('fs');
var _name = "China中文";
gm('./0.jpg')
    .font('./st_black.ttf',30)
    .drawText(20, 30,"你")
    .drawText(50, 50, "好")
    .drawText(70, 70,"色")
    .drawText(110, 110, "彩")
    //.resize(240, 240)
    .toBuffer("jpg",(err, buffer)=> {
        fs.writeFileSync("./4.jpg", buffer);
        if (!err){
            console.log('done');
        }else{
            console.log(err.message || "出错了！");
        }
    });

