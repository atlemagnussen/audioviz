export default class ImageTextures {
    constructor(gl: any);
    gl: any;
    anisoExt: any;
    samplers: {};
    clouds2Image: HTMLImageElement;
    emptyImage: HTMLImageElement;
    bindTexture(texture: any, data: any, width: any, height: any): void;
    loadExtraImages(imageData: any): void;
    getTexture(sampler: any): any;
}
