import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // Полный путь
const __dirname = path.dirname(__filename); //Папка

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const publicPath = isProduction ? "/StayHere/" : "/";

  return {
    entry: "./src/main.jsx",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
      publicPath: publicPath,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.module\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),

      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "404.html",
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/img"),
            to: "img",
          },
        ],
      }),
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify(publicPath),
      }),
    ],

    resolve: {
      extensions: [".js", ".jsx"],
    },

    devServer: {
      static: "./dist",
      port: 3000,
      historyApiFallback: {
        index: publicPath,
      },
    },
  };
};
