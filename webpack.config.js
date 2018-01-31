const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

const config = {
 	context: path.resolve(__dirname, 'src'),  
 	entry: {
    	// removing 'src' directory from entry point, since 'context' is taking care of that
    	app: './index.js'
  	},
  	output: {
   		path: path.resolve(__dirname, 'dist'),
    	filename: './assets/js/[name].bundle.js'
  	},
  	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['env']
					} 
				}
			},
			{ 
				test: /\.html$/, 
				use: ['html-loader']
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
				use: extractPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
							  sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
							  sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './assets/media/',
							// limit: 8000
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
  	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new HtmlWebpackPlugin({
			template: 'work-single.html',
			filename: 'work-single.html'
		}),
		new HtmlWebpackPlugin({
			template: 'playbook.html',
			filename: 'playbook.html'
		}),
		new HtmlWebpackPlugin({
			template: 'ckn.html',
			filename: 'ckn.html'
		}),
		extractPlugin
	],
  	devServer: {
  		contentBase: path.resolve(__dirname, "./dist/assets/media"),
		compress: true,
		port: 12000,
		stats: 'errors-only',
		open: true
  	},
  	devtool: 'inline-source-map'
};

module.exports = config;
