export default class Renderer {
    static getHighestBlur(t: any): 1 | 2 | 3 | 0;
    static mixFrameEquations(blendProgress: any, mdVSFrame: any, mdVSFramePrev: any): any;
    static getBlurValues(mdVSFrame: any): {
        blurMins: any[];
        blurMaxs: any[];
    };
    constructor(gl: any, audio: any, opts: any);
    gl: any;
    audio: any;
    frameNum: number;
    fps: number;
    time: number;
    presetTime: number;
    lastTime: number;
    timeHist: number[];
    timeHistMax: number;
    blending: boolean;
    blendStartTime: number;
    blendProgress: number;
    blendDuration: number;
    width: any;
    height: any;
    mesh_width: any;
    mesh_height: any;
    pixelRatio: any;
    textureRatio: any;
    outputFXAA: any;
    texsizeX: number;
    texsizeY: number;
    aspectx: number;
    aspecty: number;
    invAspectx: number;
    invAspecty: number;
    qs: any;
    ts: any;
    regs: any;
    blurRatios: number[][];
    audioLevels: AudioLevels;
    prevFrameBuffer: any;
    targetFrameBuffer: any;
    prevTexture: any;
    targetTexture: any;
    compFrameBuffer: any;
    compTexture: any;
    anisoExt: any;
    noise: Noise;
    image: ImageTextures;
    warpShader: WarpShader;
    compShader: CompShader;
    outputShader: OutputShader;
    prevWarpShader: WarpShader;
    prevCompShader: CompShader;
    numBlurPasses: number;
    blurShader1: BlurShader;
    blurShader2: BlurShader;
    blurShader3: BlurShader;
    blurTexture1: any;
    blurTexture2: any;
    blurTexture3: any;
    basicWaveform: BasicWaveform;
    customWaveforms: any;
    customShapes: any;
    prevCustomWaveforms: any;
    prevCustomShapes: any;
    darkenCenter: DarkenCenter;
    innerBorder: Border;
    outerBorder: Border;
    motionVectors: MotionVectors;
    titleText: TitleText;
    blendPattern: BlendPattern;
    resampleShader: ResampleShader;
    supertext: {
        startTime: number;
    };
    warpUVs: Float32Array;
    warpColor: Float32Array;
    blankPreset: any;
    preset: any;
    prevPreset: any;
    presetEquationRunner: PresetEquationRunner;
    prevPresetEquationRunner: PresetEquationRunner;
    regVars: any;
    loadPreset(preset: any, blendTime: any): void;
    loadExtraImages(imageData: any): void;
    setRendererSize(width: any, height: any, opts: any): void;
    setInternalMeshSize(width: any, height: any): void;
    setOutputAA(useAA: any): void;
    updateGlobals(): void;
    calcTimeAndFPS(elapsedTime: any): void;
    runPixelEquations(presetEquationRunner: any, mdVSFrame: any, globalVars: any, blending: any): void;
    mdVSVertex: any;
    bindFrambufferAndSetViewport(fb: any, width: any, height: any): void;
    bindFrameBufferTexture(targetFrameBuffer: any, targetTexture: any): void;
    render({ audioLevels, elapsedTime }?: {
        audioLevels: any;
        elapsedTime: any;
    }): void;
    prevMDVSFrame: any;
    globalVars: {
        frame: number;
        time: number;
        fps: number;
        bass: number;
        bass_att: number;
        mid: number;
        mid_att: number;
        treb: number;
        treb_att: number;
        meshx: any;
        meshy: any;
        aspectx: number;
        aspecty: number;
        pixelsx: number;
        pixelsy: number;
    };
    mdVSFrame: any;
    mdVSFrameMixed: any;
    renderToScreen(): void;
    launchSongTitleAnim(text: any): void;
    toDataURL(): string;
    warpBufferToDataURL(): string;
}
import AudioLevels from "../audio/audioLevels";
import Noise from "../noise/noise";
import ImageTextures from "../image/imageTextures";
import WarpShader from "./shaders/warp";
import CompShader from "./shaders/comp";
import OutputShader from "./shaders/output";
import BlurShader from "./shaders/blur/blur";
import BasicWaveform from "./waves/basicWaveform";
import DarkenCenter from "./sprites/darkenCenter";
import Border from "./sprites/border";
import MotionVectors from "./motionVectors/motionVectors";
import TitleText from "./text/titleText";
import BlendPattern from "./blendPattern";
import ResampleShader from "./shaders/resample";
import PresetEquationRunner from "../equations/presetEquationRunner";