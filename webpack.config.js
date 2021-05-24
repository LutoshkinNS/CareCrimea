const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimazeCssAssetWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimisation = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptimazeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		'css-loader?url=false'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	]

	if (isDev) {
		loaders.push('eslint-loader')
	}

	return loaders
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			// исходный файл
			template: './index.html',
			// путь для вставки скриптов
			inject: 'body',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		// Перенос статических файлов
		new CopyWebpackPlugin({
			patterns: [
				{
				from: path.resolve(__dirname, 'src/images'),
				to: path.resolve(__dirname, 'dist/img')
				},
				{
				from: path.resolve(__dirname, 'src/fonts'),
				to: path.resolve(__dirname, 'dist/fonts')
				},
				{
				from: path.resolve(__dirname, 'src/sendForm.php'),
				to: path.resolve(__dirname, 'dist')
				},
			]
		}),
		new MiniCssExtractPlugin({
			filename: `./css/${filename('css')}`
		})
	]

	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}

	return base
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
	},
	output: {
		filename: `./js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		// Используемые расширения файлов
		// extensions: ['.js', '.json', '.png'],
		alias: {
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	// Откл дублирования общего кода
	optimization: optimisation(),
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 9000,
		open: true,
		hot: isDev,
		disableHostCheck: true,
		writeToDisk: true,
	},
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader?url=false',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [path.resolve(__dirname, './src/sass/_colors.sass'), path.resolve(__dirname, './src/sass/_fonts.sass'), path.resolve(__dirname, './src/sass/_interface.sass'),]
						},
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		]
	}
}