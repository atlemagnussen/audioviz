export default class FFT {
    constructor(samplesIn: any, samplesOut: any, equalize?: boolean);
    samplesIn: any;
    samplesOut: any;
    equalize: boolean;
    NFREQ: number;
    initEqualizeTable(): void;
    equalizeArr: Float32Array;
    initBitRevTable(): void;
    bitrevtable: Uint16Array;
    initCosSinTable(): void;
    cossintable: Float32Array[];
    timeToFrequencyDomain(waveDataIn: any): Float32Array;
}
