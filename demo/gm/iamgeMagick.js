/**
 * Created by chaolinding on 2017/10/30.
 */
var gm = require("gm");
var imageMagick = gm.subClass({ imageMagick : true });
var fs = require('fs');
imageMagick(300, 300, "pink").toBuffer("jpg", (err, buffer)=>{
    fs.writeFileSync("./fill.jpg", buffer);
    console.log("done")
})


// imageMagick("./0.jpg").fill("rgba(0x00, 0x00, 0x00, 0.5)").drawRectangle(20,20,50,50).toBuffer("jpg", (err, buffer)=>{
//     fs.writeFileSync("./fillReact.jpg", buffer);
//     console.log("done")
// })