/**
 * Created by chaolinding on 2017/10/25.
 */
var gm = require('gm');
var _name = "China中文";
gm('./0.jpg')
    .font('./msyh.ttf')
    .draw('text  50, 50 '+_name)
    .resize(240, 240)
    .write('./0.jpg', function(err) {
        if (!err){
            console.log('done');
        }else{
            console.log(err.message || "出错了！");
        }
    });

