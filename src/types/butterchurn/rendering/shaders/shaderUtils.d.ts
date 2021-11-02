export default class ShaderUtils {
    static getShaderParts(t: any): any[];
    static getFragmentFloatPrecision(gl: any): "highp" | "mediump" | "lowp";
    static getUserSamplers(text: any): {
        sampler: any;
    }[];
}
