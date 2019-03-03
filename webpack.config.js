const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

let context = resolve('src');
let host = 'localhost';
//let host = 'isaacg02';

module.exports = {
	devtool: 'source-map',
	entry: {
		app: ['babel-polyfill', './']
	},
	devServer: {
		host:host,
		port:9090,
		proxy: {
			'/api': {
				target: 'http://' + host +':9001',
				pathRewrite: {'^/api' : ''}
			}
		}
	},

	context,

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				include: context
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader", options: {
						sourceMap: true,
					}
				},
					{
					loader: "sass-loader", options: {
						sourceMap: true
					}
				}]
			},{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			}
		],
	},


	plugins: [new HtmlPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		})],

	resolve: {
		alias: {
			mobx: resolve(__dirname, 'node_modules/mobx/lib/mobx.es6.js')
		},
		extensions: ['.js', '.jsx', '.json']
	}
};
