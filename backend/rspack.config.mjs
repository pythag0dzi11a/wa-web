import * as path from "path";

// noinspection NpmUsedModulesInstalled
import typia from "@ryoppippi/unplugin-typia/rspack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

/**
 * @type {import("@rspack/cli").Configuration}
 */
export default {
    entry: "./src/app.ts",
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: "app.js"
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                decorators: true
                            }
                        }
                    }
                }
            }
        ]
    },
    externals: [
        ({ request }, callback) => {
            // Check if the request starts with a relative path (e.g., './', '../')
            // If it does not, it means it's a module from node_modules
            if (!request.startsWith(".") && !path.isAbsolute(request)) {
                // Treat this dependency as an external
                return callback(null, `commonjs ${request}`);
            }
            callback();
        }
    ],
    plugins: [typia(), new ForkTsCheckerWebpackPlugin()]
};
