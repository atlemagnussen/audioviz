export default class Noise {
    static fCubicInterpolate(y0: any, y1: any, y2: any, y3: any, t: any): any;
    static dwCubicInterpolate(y0: any, y1: any, y2: any, y3: any, t: any): number[];
    static createNoiseVolTex(noiseSize: any, zoom: any): Uint8Array;
    static createNoiseTex(noiseSize: any, zoom: any): Uint8Array;
    constructor(gl: any);
    gl: any;
    anisoExt: any;
    noiseTexLQ: any;
    noiseTexLQLite: any;
    noiseTexMQ: any;
    noiseTexHQ: any;
    noiseTexVolLQ: any;
    noiseTexVolHQ: any;
    nTexArrLQ: Uint8Array;
    nTexArrLQLite: Uint8Array;
    nTexArrMQ: Uint8Array;
    nTexArrHQ: Uint8Array;
    nTexArrVolLQ: Uint8Array;
    nTexArrVolHQ: Uint8Array;
    noiseTexPointLQ: any;
    bindTexture(texture: any, data: any, width: any, height: any): void;
    bindTexture3D(texture: any, data: any, width: any, height: any, depth: any): void;
}
