import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
    new HtmlWebpackPlugin({
        template: './src/template.html', // generates dist/index.html, auto-injecting <script> for the bundle above
    }),
  ],

    module: {
        rules: [
            {test: /\.css$/i, use: ["style-loader", "css-loader"]},
            {test: /\.html$/i, use: ["html-loader"]},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i,type: "asset/resource",}
        ],
    },
}
