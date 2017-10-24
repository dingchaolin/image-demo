"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images = require("images");
class ImageOperation {
    constructor(path) {
        this.image = images(path);
    }
    getCutImage(cutParams) {
        return images(this.image, cutParams.x, cutParams.y, cutParams.width, cutParams.height);
    }
    toBase64() {
        return "data:image/jpg;base64," + this.image.encode('jpg').toString("base64");
    }
}
exports.ImageOperation = ImageOperation;
