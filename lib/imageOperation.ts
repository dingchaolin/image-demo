import {clearScreenDown} from "readline";
/**
 * Created by chaolinding on 2017/10/24.
 */
import {CutImage} from "../interface/image";
import * as images from "images";
import {ImagesStatic} from "images";

export class ImageOperation{

    private image: ImagesStatic;

    constructor(path: string){
        this.image = images(path);
    }

    getCutImage(cutParams: CutImage):ImagesStatic{
        return images( this.image, cutParams.x, cutParams.y, cutParams.width, cutParams.height);
    }

    toBase64(){
        return "data:image/jpg;base64," + this.image.encode('jpg').toString("base64") ;
    }


}

//http://verifycode.artron.net/chineseCaptcha/captcha?1508917319999&width=480&height=300