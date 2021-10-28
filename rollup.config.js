// Import rollup plugins
import path from "path"
import html from "@web/rollup-plugin-html"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import minifyHTML from "rollup-plugin-minify-html-literals"
import summary from "rollup-plugin-summary"
import typescript from "@rollup/plugin-typescript"
import alias from "@rollup/plugin-alias"

const projectRootDir = path.resolve(__dirname)

export default {
    plugins: [
        typescript(),
        alias({
            entries: [
                { find: "@app", replacement: path.resolve(projectRootDir, "src") },
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