/**
 * Created by chaolinding on 2017/10/26.
 */
var gm = require('gm');
var fs = require('fs');
gm("./0.jpg").fill("red").toBuffer("jpg",(err, buffer)=> {
    fs.writeFileSync("./fill.jpg", buffer);
    if (!err){
        console.log('done');
    }else{
        console.log(err.message || "出错了！");
    }
});