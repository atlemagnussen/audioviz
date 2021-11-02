export default class AudioLevels {
    static isFiniteNumber(num: any): boolean;
    static adjustRateToFPS(rate: any, baseFPS: any, FPS: any): number;
    constructor(audio: any);
    audio: any;
    starts: any[];
    stops: any[];
    val: Float32Array;
    imm: Float32Array;
    att: Float32Array;
    avg: Float32Array;
    longAvg: Float32Array;
    get bass(): number;
    get bass_att(): number;
    get mid(): number;
    get mid_att(): number;
    get treb(): number;
    get treb_att(): number;
    updateAudioLevels(fps: any, frame: any): void;
}
