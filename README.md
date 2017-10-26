# image-demo

## 图片库比较

#### 1.node-images
- 国产图片处理库node-images，已经停止维护，缺乏某些功能，比如图片上加文字，并且在nodejs 8.0版本下无法使用

#### 2.Jimp

- Jimp无需第三方依赖，安装简单，基本无坑，Github star4200多，npm周下载量7万多次，算是比较优秀的第三方处理库。支持常见的图片处理操作，也可以加文字，但是如果要在图片上加中文文字的话，有点麻烦，需要自制.fnt位图字体文件，然后导入。但CJK字库文字太多，制作出来文件很大。我就是因为这个，放弃了使用jimp。
#### 3.node-lwip
- 和jimp类似，无第三方依赖。没有提供图片上写文字的方法。
#### 4.sharp
- 目前nodejs中最快的图片处理库，和其他图片处理库相比，遥遥领先。无需第三方依赖，性能超好，就是安装比较麻烦，但最后还是安装成功了！一次性处理200张图片，sharp图片处理库的速度明显最快。按照官方说明，至少是5到10倍于ImageMagick and GraphicsMagick 。
可惜，翻遍文档api也没有找到图片写文字的方法，就是说，没有提供图片直接写文字的方法。
- 关于sharp在windows 10 64位的安装，直接npm install sharp，基本都不会成功的。
- Sharp的安装，需要三个前提条件：
- Node v4.5.0+
- C++11 compatible compiler such as gcc 4.8+, clang 3.0+ or MSVC 2013+
- node-gyp and its dependencies (includes Python)
- 对于windows10 64位来说，可以运行以下两条命令，一劳永逸解决sharp的安装问题：
- 先运行：
- npm install --global --production windows-build-tools
- 然后：
- npm config set msvs_version 2015 --global
- 就可以把所有的环境配置搞定。最后关掉所有cmd或者shell窗口，然后再用
- npm install sharp安装就OK了。
- 速度超快，api好用，基本等于完美，可惜刚好我缺乏我需要的一个功能。
#### 5.基于GraphicsMagick和ImageMagick的gm
- 如果不需要在图片上加中文文字，只需要安装GraphicsMagick就可以了。如果需要在图片上加【中文文字】，要同时安装GraphicsMagick 和 ImageMagick。然后使用gm subclass子类话的方法来调用。
- 注意：中文需要指定中文字体的.ttf文件，并且字体文件名不能是中文，如"msyh.ttf"，OK；“微软雅黑.ttf”，BAD!
- gm提供了超级强悍的api，基本上你需要对图片做的任何处理都能实现！并且它是基于命令行的，可以直接在命令行中调用。
- GraphicsMagick和ImageMagick在windows10 64位下的安装都比较傻瓜式，直接下载对应的exe文件，不分32位和64位，setup 一路next就行。
- 总结，gm的速度仅仅比sharp慢，比其他的几个图片库都要快的多，并且提供的api很丰富，链式调用写法很爽，安装配置也相对简单的多，支持在图片上直接添加中文文字。其他的几个图片库，对于&rdquo;在图片上添加文字&ldquo;这个功能，有些不提供，有些提供了但很难用。

#### 提供一段gm的示例代码（demo文件夹中）
```
var gm = require('gm');
var fs = require('fs');
var _name = "China中文";
gm('./0.jpg')
    .font('./st_black.ttf',30)
    .drawText(20, 30,"你")
    .drawText(50, 50, "好")
    .drawText(70, 70,"色")
    .drawText(110, 110, "彩")
    //.resize(240, 240)
    .toBuffer("jpg",(err, buffer)=> {
        fs.writeFileSync("./4.jpg", buffer);
        if (!err){
            console.log('done');
        }else{
            console.log(err.message || "出错了！");
        }
    });
```