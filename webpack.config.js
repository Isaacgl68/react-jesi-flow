const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

let context = resolve('src');

module.exports = {
	devtool: 'source-map',
	entry: {
		app: ['babel-polyfill', './']
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
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
				}, {
					loader: "sass-loader", options: {
						sourceMap: true
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
