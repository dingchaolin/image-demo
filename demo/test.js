//var gm = require("gm");
var gm = require('gm').subClass({
    graphicsMagick: true
});
let getCutImage = function (params){
    console.log( "文件是否存在=======", require('fs').existsSync(params.path), params);
    return new Promise( (resolve, reject) => {
        console.log( "crop========",gm(params.path).crop.toString())
        let ret = gm(params.path).crop(params.width, params.height, params.x, params.y);
        console.log( ret)
        gm(params.path).crop(params.width, params.height, params.x, params.y).setFormat('jpeg').toBuffer((err, buffer) => {
            console.log( "err========",err,"buffer=======", buffer );
            if( err ){
                reject( err.message );
            }else{
                let base64 = "data:image/jpg;base64," + buffer.toString('base64');
                console.log("base64=======", base64)
                resolve( base64 );
            }
        });
    })

}

let test = async ()=>{
    let params = { path: './0.jpg',
        x: 55,
        y: 70,
        width: 40,
        height: 40 };
    try{
    let str = await getCutImage(params);
    console.log( str );
    }catch( e ){
        console.log( e )
    }
}

test();