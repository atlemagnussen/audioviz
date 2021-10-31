// Import rollup plugins
import path from "path"
import html from "@web/rollup-plugin-html"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import minifyHTML from "rollup-plugin-minify-html-literals"
import css from "rollup-plugin-import-css"
import summary from "rollup-plugin-summary"
import typescript from "@rollup/plugin-typescript"
import alias from "@rollup/plugin-alias"

const projectRootDir = path.resolve(__dirname)
const appSrcPath = path.resolve(projectRootDir, "src")
export default {
    plugins: [
        typescript(),
        css({
            include: [
                "../node_modules/**/*.css",
                "**/*.css"],
            output: "bundle.css" 
        }),
        alias({
            entries: [
                { find: "@app", replacement: appSrcPath},
            ]
        }),
        html({
            input: "src/index.html",
        }),
        resolve(),
        minifyHTML(),
        terser({
            ecma: 2020,
            module: true,
            warnings: true,
        }),

        summary(),
    ],
    output: {
        sourcemap: true,
        dir: "dist",
    }
};