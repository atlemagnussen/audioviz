export default class MotionVectors {
    constructor(gl: any, opts: any);
    gl: any;
    maxX: number;
    maxY: number;
    positions: Float32Array;
    texsizeX: any;
    texsizeY: any;
    mesh_width: any;
    mesh_height: any;
    positionVertexBuf: any;
    floatPrecision: string;
    updateGlobals(opts: any): void;
    createShader(): void;
    shaderProgram: any;
    aPosLoc: any;
    colorLoc: any;
    getMotionDir(warpUVs: any, fx: any, fy: any): number[];
    generateMotionVectors(mdVSFrame: any, warpUVs: any): boolean;
    numVecVerts: number;
    color: any[];
    drawMotionVectors(mdVSFrame: any, warpUVs: any): void;
}
