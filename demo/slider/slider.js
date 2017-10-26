/**
 * Created by chaolinding on 2017/10/25.
 */
let datelist = `1,1508893152685|2,1508893152694|7,1508893152710|14,1508893152727|23,1508893152744|38,1508893152761|53,1508893152777|67,1508893152794|72,1508893152811|71,1508893152982|71,1508893152994|71,1508893153010|72,1508893153083|74,1508893153094|80,1508893153111|89,1508893153128|103,1508893153145|118,1508893153162|135,1508893153178|153,1508893153195|168,1508893153211|179,1508893153228|182,1508893153245|185,1508893153455|186,1508893153463|189,1508893153478|194,1508893153495|204,1508893153512|210,1508893153528|218,1508893153545|224,1508893153561|228,1508893153578|232,1508893153594|234,1508893153612|236,1508893153628|240,1508893153645|240,1508893153661|1,1508893166564|2,1508893166571|5,1508893166601|10,1508893166617|13,1508893166634|19,1508893166649|22,1508893166666|28,1508893166682|35,1508893166699|42,1508893166715|49,1508893166732|56,1508893166749|61,1508893166766|67,1508893166782|71,1508893166799|75,1508893166816|77,1508893166833|77,1508893166849|77,1508893167409|78,1508893167417|78,1508893167441|78,1508893167491|78,1508893167499|79,1508893167516|79,1508893167533|81,1508893167549|82,1508893167566|84,1508893167582|84,1508893167599|85,1508893167616|86,1508893167632|87,1508893167649|88,1508893167666|89,1508893167682|89,1508893167699|90,1508893167717|90,1508893167740|90,1508893167765|90,1508893167773|91,1508893167782|91,1508893167799|93,1508893167816|93,1508893167832|93,1508893167849|94,1508893167866|94,1508893167882|94,1508893167899|95,1508893167916|95,1508893167932|96,1508893167949|97,1508893167966|97,1508893167982|98,1508893167999|98,1508893168016|99,1508893168033|99,1508893168049|99,1508893168776|98,1508893169563|98,1508893169580|98,1508893169588|98,1508893169600`;
let left_point = 99;

function saveSlideFeature(datelist_str, left_point) {
    if (!datelist_str) {
        return false;
    }
    // 将字符串解析为数组
    let datalist = datelist_str.split("|");

    // 将字符串数组解析为二维数组[x轴坐标， 时间]
    let datalist_arr = [];

    for (let i = 0; i < datalist.length; i++) {
        var pointArr = datalist[i].split(",");

        if (pointArr.length != 2) {
            return false;
        }

        datalist_arr[i] = [parseInt(pointArr[0]), parseInt(pointArr[1])];
    }

    console.log("datalist_arr:", datalist_arr);
    // region 计算速度 加速度 以及他们的标准差
    //速度 像素/每秒
    let speed = [];
    //加速度 像素/每2次方秒
    let accelerated_speed = [];
    //总时间
    let totaldate = 0;

    for (let i = 0; i < datalist_arr.length - 1; i++) {
        //获取时间差
        var timeSpan = 0;
        if (datalist_arr[i + 1][1] - datalist_arr[i][1] == 0) {
            timeSpan = 1;
        } else {
            timeSpan = datalist_arr[i + 1][1] - datalist_arr[i][1];
        }
        //速度的计算公式：v=S/t
        speed[i] = 1000 * Math.abs(datalist_arr[i + 1][0] - datalist_arr[i][0]) / timeSpan;//有可能移过再一回来 这里只取正值
        //加速度计算公式：a=Δv/Δt
        accelerated_speed[i] = 1000 * speed[i] / timeSpan;
        totaldate += timeSpan;
    }
    //console.log('speed:', speed);
    //console.log('accelerated_speed:', accelerated_speed);

    // 分析速度
    var mv = 0;   // 平均速度
    var sumv = 0; // 速度之和
    var s2v = 0;//速度方差
    var o2v = 0;//速度标准差

    // 计算平均速度
    for (let i = 0; i < speed.length; i++) {
        sumv += speed[i];
    }
    mv = sumv / speed.length;
    // 计算速度方差和速度标准差
    //方差 = 求和【（样本速本 - 平均速度）** 2 】/ 样本数
    sumv = 0;
    for (let i = 0; i < speed.length; i++) {
        sumv += Math.pow(speed[i] - mv, 2);
    }
    s2v = sumv / speed.length;
    o2v = Math.sqrt(s2v);

    //console.log(mv, sumv, s2v, o2v);

    // 分析加速度
    var ma = 0; //平均加速度
    var suma = 0; // 加速度之和
    var s2a = 0;//加速度方差
    var o2a = 0;//加速度标准差

    // 计算平均加速度
    for (let i = 0; i < accelerated_speed.length; i++) {
        suma += accelerated_speed[i];
    }
    ma = suma / accelerated_speed.length;
    // 计算速度方差和速度标准差
    suma = 0;
    for (let i = 0; i < accelerated_speed.length; i++) {
        suma += Math.pow(accelerated_speed[i] - ma, 2);
    }
    s2a = suma / accelerated_speed.length;
    o2a = Math.sqrt(s2a);

    //console.log(ma, suma, s2a, o2a);
    //将加速度数组分成三等分 求每一份的加速度
    var threeEqual = Math.floor(accelerated_speed.length / 3);

    var ma1 = 0, ma2 = 0, ma3 = 0;
    for (let i = 0; i < accelerated_speed.length; i++) {
        if (i > threeEqual * 2)
            ma3 += accelerated_speed[i];
        else if (i > threeEqual && i < threeEqual * 2)
            ma2 += accelerated_speed[i];
        else
            ma1 += accelerated_speed[i];
    }
    ma1 = ma1 / threeEqual;
    ma2 = ma2 / threeEqual;
    ma3 = ma3 / threeEqual;

    //将速度数组分成三等分 求每一份的速度
    threeEqual = speed.length / 3;
    var mv1 = 0, mv2 = 0, mv3 = 0;
    for (var i = 0; i < speed.length; i++) {
        if (i > threeEqual * 2)
            mv3 += speed[i];
        else if (i > threeEqual && i < threeEqual * 2)
            mv2 += speed[i];
        else
            mv1 += speed[i];
    }
    mv1 = mv1 / threeEqual;
    mv2 = mv2 / threeEqual;
    mv3 = mv3 / threeEqual;

    //将采样结果收集到数据库
    let savaData = {
        sumtime: totaldate,
        abscissa: left_point,
        total: datalist_arr.length,
        meanv: mv,
        meanv1: mv1,
        meanv2: mv2,
        meanv3: mv,
        meana: ma,
        meana1: ma1,
        meana2: ma2,
        meana3: ma3,
        standardv: o2v,
        standarda: o2a
    };

    return savaData;
}

let data = saveSlideFeature(datelist, left_point);
console.log( data );

