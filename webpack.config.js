const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const node_modules = resolve(__dirname, 'node_modules');
const pathToReact = resolve(node_modules, 'react/dist/react.min.js');
const dev = process.argv.indexOf('-p') === -1;

module.exports = {
	context: resolve(__dirname, 'src'),

	entry: './client.js', // the entry point of app

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/' // necessary for HMR to know where to load the hot update chunks
	},
	//Optimizing development - Whenever "react" is required in the code it will fetch the minified React JS file instead of going through node_modules
	resolve: {
		alias: {
			'react$': pathToReact,
		}
	},

	module: {
		noParse:  /\.min\.js$/, //Optimizing development - Whenever Webpack tries to parse the minified file, we stop it, as it is not necessary
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					resolve(__dirname, 'src')
				],
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'es2015', 'stage-0'],
						plugins: ['react-html-attrs']  // tranform `className` to `class` & `htmlFor` to `for` in JSX syntax
					}
				},
			},
			{
				test: /\.css$/,
				use: dev ? [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]' // http://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/
						}
					}
				] : ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: {
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					}
				})
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]' // https://webpack.js.org/loaders/css-loader/
						}
					},
					'sass-loader'
				]
			}
		]
	},

	plugins: dev ? [
		new webpack.HotModuleReplacementPlugin(), // enable HMR globally
	] : [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			// sourceMap: true
		}),
		new ExtractTextPlugin('styles.css'),
	],

	devtool: dev ? 'inline-source-map' : false,

	devServer: {
		contentBase: resolve(__dirname, 'dist'), //match the output path
		publicPath: '/', // match the output `publicPath`
		historyApiFallback: true,
		compress: true,  //enable gzip compression
		hot: true, // enable hot module replacement. Depends on HotModuleReplacementPlugin
	}
};
