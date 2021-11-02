export default class Visualizer {
    static overrideDefaultVars(baseValsDefaults: any, baseVals: any): {};
    static makeShapeResetPool(pool: any, variables: any, idx: any): any;
    static base64ToArrayBuffer(base64: any): ArrayBuffer;
    constructor(audioContext: any, canvas: any, opts: any);
    opts: any;
    audio: AudioProcessor;
    internalCanvas: any;
    gl: any;
    outputGl: any;
    baseValsDefaults: {
        decay: number;
        gammaadj: number;
        echo_zoom: number;
        echo_alpha: number;
        echo_orient: number;
        red_blue: number;
        brighten: number;
        darken: number;
        wrap: number;
        darken_center: number;
        solarize: number;
        invert: number;
        bmotionvectorson: number;
        fshader: number;
        b1n: number;
        b2n: number;
        b3n: number;
        b1x: number;
        b2x: number;
        b3x: number;
        b1ed: number;
        wave_mode: number;
        additivewave: number;
        wave_dots: number;
        wave_thick: number;
        wave_a: number;
        wave_scale: number;
        wave_smoothing: number;
        wave_mystery: number;
        modwavealphabyvolume: number;
        modwavealphastart: number;
        modwavealphaend: number;
        wave_r: number;
        wave_g: number;
        wave_b: number;
        wave_x: number;
        wave_y: number;
        wave_brighten: number;
        mv_x: number;
        mv_y: number;
        mv_dx: number;
        mv_dy: number;
        mv_l: number;
        mv_r: number;
        mv_g: number;
        mv_b: number;
        mv_a: number;
        warpanimspeed: number;
        warpscale: number;
        zoomexp: number;
        zoom: number;
        rot: number;
        cx: number;
        cy: number;
        dx: number;
        dy: number;
        warp: number;
        sx: number;
        sy: number;
        ob_size: number;
        ob_r: number;
        ob_g: number;
        ob_b: number;
        ob_a: number;
        ib_size: number;
        ib_r: number;
        ib_g: number;
        ib_b: number;
        ib_a: number;
    };
    shapeBaseValsDefaults: {
        enabled: number;
        sides: number;
        additive: number;
        thickoutline: number;
        textured: number;
        num_inst: number;
        tex_zoom: number;
        tex_ang: number;
        x: number;
        y: number;
        rad: number;
        ang: number;
        r: number;
        g: number;
        b: number;
        a: number;
        r2: number;
        g2: number;
        b2: number;
        a2: number;
        border_r: number;
        border_g: number;
        border_b: number;
        border_a: number;
    };
    waveBaseValsDefaults: {
        enabled: number;
        samples: number;
        sep: number;
        scaling: number;
        smoothing: number;
        r: number;
        g: number;
        b: number;
        a: number;
        spectrum: number;
        usedots: number;
        thick: number;
        additive: number;
    };
    qs: any;
    ts: any;
    globalPerFrameVars: string[];
    globalPerPixelVars: string[];
    globalShapeVars: string[];
    shapeBaseVars: string[];
    globalWaveVars: string[];
    renderer: Renderer;
    loseGLContext(): void;
    connectAudio(audioNode: any): void;
    audioNode: any;
    disconnectAudio(audioNode: any): void;
    createQVars(): {};
    createTVars(): {};
    createPerFramePool(baseVals: any): {};
    createPerPixelPool(baseVals: any): {};
    createCustomShapePerFramePool(baseVals: any): {};
    createCustomWavePerFramePool(baseVals: any): {};
    loadPreset(presetMap: any, blendTime?: number): Promise<void>;
    loadWASMPreset(preset: any, blendTime: any): Promise<void>;
    loadJSPreset(preset: any, blendTime: any): void;
    loadExtraImages(imageData: any): void;
    setRendererSize(width: any, height: any, opts?: {}): void;
    setInternalMeshSize(width: any, height: any): void;
    setOutputAA(useAA: any): void;
    setCanvas(canvas: any): void;
    render(opts?: any): void;
    launchSongTitleAnim(text: any): void;
    toDataURL(): string;
    warpBufferToDataURL(): string;
}
import AudioProcessor from "./audio/audioProcessor";
import Renderer from "./rendering/renderer";
