export default class BlurShader {
    constructor(blurLevel: any, blurRatios: any, gl: any, opts?: {});
    blurLevel: any;
    blurRatios: any;
    gl: any;
    texsizeX: any;
    texsizeY: any;
    anisoExt: any;
    blurHorizontalFrameBuffer: any;
    blurVerticalFrameBuffer: any;
    blurHorizontalTexture: any;
    blurVerticalTexture: any;
    blurHorizontal: BlurHorizontal;
    blurVertical: BlurVertical;
    updateGlobals(opts: any): void;
    getTextureSize(sizeRatio: any): number[];
    setupFrameBufferTextures(): void;
    horizontalTexsizes: number[][];
    verticalTexsizes: number[][];
    bindFrambufferAndSetViewport(fb: any, texsize: any): void;
    bindFrameBufferTexture(targetFrameBuffer: any, targetTexture: any, texsize: any): void;
    renderBlurTexture(prevTexture: any, mdVSFrame: any, blurMins: any, blurMaxs: any): void;
}
import BlurHorizontal from "./blurHorizontal";
import BlurVertical from "./blurVertical";
