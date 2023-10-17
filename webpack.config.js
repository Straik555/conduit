const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

const babelOptions = preset => {
	const opts = {
		presets: ['@babel/preset-env'],
		plugins: ['@babel/plugin-proposal-class-properties']
	}

	if (preset) {
		opts.presets.push(preset)
	}

	return opts
}

const copyPattern = (from, to = 'dist') => ({
	from: path.resolve(__dirname, from),
	to: path.resolve(__dirname, to)
})

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 3101,
		hot: isDev
	},
	optimization: optimization(),
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions()
				}
			},
			{
				test: /\.(ts)x?$/,
				exclude: /node_modules|\.d\.ts$/, // this line as well
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions('@babel/preset-typescript')
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.(png|ico|txt)$/,
				use: ['file-loader']
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '.png'],
		alias: {
			'~': path.resolve(__dirname, 'src'),
			'~api': path.resolve(__dirname, 'src/api'),
			'~assets': path.resolve(__dirname, 'src/assets'),
			'~components': path.resolve(__dirname, 'src/components'),
			'~constants': path.resolve(__dirname, 'src/constants'),
			'~hooks': path.resolve(__dirname, 'src/hooks'),
			'~navigation': path.resolve(__dirname, 'src/navigation'),
			'~pages': path.resolve(__dirname, 'src/pages'),
			'~store': path.resolve(__dirname, 'src/store'),
			'~utils': path.resolve(__dirname, 'src/utils'),
			'~validation': path.resolve(__dirname, 'src/validation')
		}
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				copyPattern('public/favicon.ico'),
				copyPattern('public/logo192.png'),
				copyPattern('public/logo512.png')
			]
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new CleanWebpackPlugin()
	]
}
