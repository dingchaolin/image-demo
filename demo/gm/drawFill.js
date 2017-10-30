/**
 * Created by chaolinding on 2017/10/26.
 */
// var gm = require('gm');
// var fs = require('fs');
//
// gm("./0.jpg").fill("rgba(0x00, 0x00, 0x00, 0.5)").drawRectangle(20,20,50,50).toBuffer("jpg",(err, buffer)=> {
//     fs.writeFileSync("./drawFill.jpg", buffer);
//     if (!err){
//         console.log('done');
//     }else{
//         console.log(err.message || "出错了！");
//     }
// });

var gm = require("gm");
var imageMagick = gm.subClass({ imageMagick : true });
var fs = require('fs');
imageMagick("./0.jpg").fill("rgba(0x00, 0x00, 0x00, 0.5)").drawRectangle(20,20,50,50).toBuffer("jpg", (err, buffer)=>{
    fs.writeFileSync("./fillReact.jpg", buffer);
    console.log("done")
})