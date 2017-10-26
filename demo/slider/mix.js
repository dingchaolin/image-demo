/**
 * Created by chaolinding on 2017/10/25.
 */
let mix_arr = [];
for( let i = 0; i < 20; i ++ ){
    mix_arr.push( i );
}
let CutX = 10;
let CutY = 10;

for (let i = 0; i < mix_arr.length; i++) {

    var x = mix_arr[i] > 9 ? (mix_arr[i] - 10) * CutX : mix_arr[i] * CutX;
    var y = mix_arr[i] > 9 ? CutY : 0;
    console.log(`i = ${i}, x = ${x}, y = ${y}`);

}

