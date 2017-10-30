/**
 * Created by chaolinding on 2017/10/26.
 */
var gm = require('gm');
var fs = require('fs');
gm("./0.jpg").crop(20, 20, 20, 20).toBuffer("jpg",(err, buffer)=> {
    fs.writeFileSync("./crop.jpg", buffer);
    if (!err){
        console.log('done');
    }else{
        console.log(err.message || "出错了！");
    }
});