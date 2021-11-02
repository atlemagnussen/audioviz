import Visualizer from "./butterchurn/visualizer"
declare module butterchurn {
    function createVisualizer(context: any, canvas: any, opts: any): Visualizer;
}
export default butterchurn
