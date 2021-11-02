export default class ResampleShader {
    constructor(gl: any);
    gl: any;
    positions: Float32Array;
    vertexBuf: any;
    floatPrecision: string;
    createShader(): void;
    shaderProgram: any;
    positionLocation: any;
    textureLoc: any;
    renderQuadTexture(texture: any): void;
}
