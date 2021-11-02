import Visualizer from "./src/types/butterchurn/visualizer"
declare module butterchurn {
    function createVisualizer(context: AudioContext, canvas: HTMLCanvasElement, opts: any): Visualizer;
}
export default butterchurn
