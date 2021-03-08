const path = require('path');
const glob = require("glob");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const CopywebpackPlugin = require('copy-webpack-plugin');

var entry = './src/ts/index.ts'
var outputPath = path.resolve(__dirname, 'dist');

if (process.env.TESTBUILD) {
    entry = glob.sync(__dirname + "/test/**/*.test.ts");
    outputPath = path.resolve(__dirname, 'test-dist');
  }

module.exports = {
    entry:entry ,
    context: __dirname,
    mode: 'production',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            include: path.resolve(__dirname, 'src'),
            exclude: ["/node_modules/", "/test/"],
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['url-loader']
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        alias: {
            // CesiumJS module name
            cesium_source: path.resolve(__dirname, cesiumSource),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/html/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
                { from: "src/images", to: 'Images' },
                { from: "./config.json", to: 'config.json' }
            ],
            options: { concurrency: 50 },
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('/')
        })
    ],
    // development server options
    devServer: {
        contentBase: path.join(__dirname, "dist")
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    output: {
        filename: '[name].js', //.[contenthash]
        path: outputPath ,
        //devtoolLineToLine: true,
        devtoolModuleFilenameTemplate: '../[resource-path][loaders]', //[namespace]
        sourceMapFilename: "./[name].js.map",
        pathinfo: true,
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendors',
             chunks: 'all',
           },
         },
       },
      },
};