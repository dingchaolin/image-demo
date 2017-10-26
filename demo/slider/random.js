/**
 * Created by chaolinding on 2017/10/25.
 */
let min = 0, max = 9;
//获取某一范围内的随机数
let rankey = function (a, b) {
    return parseInt(Math.random() * (b - a + 1) + a);
}

for( let i = 0; i < 100; i ++ ){
    let ret = rankey(5,9);
    console.log( ret )
}

