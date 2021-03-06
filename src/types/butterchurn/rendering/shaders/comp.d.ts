export default class CompShader {
    static generateHueBase(mdVSFrame: any): Float32Array;
    constructor(gl: any, noise: any, image: any, opts?: {});
    gl: any;
    noise: any;
    image: any;
    mesh_width: any;
    mesh_height: any;
    texsizeX: any;
    texsizeY: any;
    aspectx: any;
    aspecty: any;
    invAspectx: number;
    invAspecty: number;
    compWidth: number;
    compHeight: number;
    indexBuf: any;
    positionVertexBuf: any;
    compColorVertexBuf: any;
    floatPrecision: string;
    mainSampler: any;
    mainSamplerFW: any;
    mainSamplerFC: any;
    mainSamplerPW: any;
    mainSamplerPC: any;
    buildPositions(): void;
    vertices: Float32Array;
    indices: Uint16Array;
    updateGlobals(opts: any): void;
    createShader(shaderText?: string): void;
    userTextures: {
        sampler: any;
    }[];
    shaderProgram: any;
    positionLocation: any;
    compColorLocation: any;
    textureLoc: any;
    textureFWLoc: any;
    textureFCLoc: any;
    texturePWLoc: any;
    texturePCLoc: any;
    blurTexture1Loc: any;
    blurTexture2Loc: any;
    blurTexture3Loc: any;
    noiseLQLoc: any;
    noiseMQLoc: any;
    noiseHQLoc: any;
    noiseLQLiteLoc: any;
    noisePointLQLoc: any;
    noiseVolLQLoc: any;
    noiseVolHQLoc: any;
    timeLoc: any;
    gammaAdjLoc: any;
    echoZoomLoc: any;
    echoAlphaLoc: any;
    echoOrientationLoc: any;
    invertLoc: any;
    brightenLoc: any;
    darkenLoc: any;
    solarizeLoc: any;
    texsizeLoc: any;
    texsizeNoiseLQLoc: any;
    texsizeNoiseMQLoc: any;
    texsizeNoiseHQLoc: any;
    texsizeNoiseLQLiteLoc: any;
    texsizeNoiseVolLQLoc: any;
    texsizeNoiseVolHQLoc: any;
    resolutionLoc: any;
    aspectLoc: any;
    bassLoc: any;
    midLoc: any;
    trebLoc: any;
    volLoc: any;
    bassAttLoc: any;
    midAttLoc: any;
    trebAttLoc: any;
    volAttLoc: any;
    frameLoc: any;
    fpsLoc: any;
    blur1MinLoc: any;
    blur1MaxLoc: any;
    blur2MinLoc: any;
    blur2MaxLoc: any;
    blur3MinLoc: any;
    blur3MaxLoc: any;
    scale1Loc: any;
    scale2Loc: any;
    scale3Loc: any;
    bias1Loc: any;
    bias2Loc: any;
    bias3Loc: any;
    randPresetLoc: any;
    randFrameLoc: any;
    fShaderLoc: any;
    qaLoc: any;
    qbLoc: any;
    qcLoc: any;
    qdLoc: any;
    qeLoc: any;
    qfLoc: any;
    qgLoc: any;
    qhLoc: any;
    slowRoamCosLoc: any;
    roamCosLoc: any;
    slowRoamSinLoc: any;
    roamSinLoc: any;
    updateShader(shaderText: any): void;
    bindBlurVals(blurMins: any, blurMaxs: any): void;
    generateCompColors(blending: any, mdVSFrame: any, warpColor: any): Float32Array;
    renderQuadTexture(blending: any, texture: any, blurTexture1: any, blurTexture2: any, blurTexture3: any, blurMins: any, blurMaxs: any, mdVSFrame: any, mdVSQs: any, warpColor: any): void;
}
