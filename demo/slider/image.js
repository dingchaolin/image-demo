var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(10, 10)
    , ctx = canvas.getContext('2d');

ctx.font = '20px "Microsoft YaHei"';
ctx.fillText("a", 0, 10);
let fs = require('fs')


fs.writeFileSync("./1.png",canvas.toBuffer());