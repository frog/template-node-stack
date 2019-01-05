const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/public/index.ts'],
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'entry',
									targets: {
										browsers: ['last 2 versions', 'not ie < 11']
									},
									debug: false
								}
							]
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: [{ loader: 'html-loader' }]
			},
			{
				test: /\.(png|jpg|gif|css)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: './src/public',
							outputPath: ''
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader/url' }, { loader: 'css-loader' }, { loader: 'css-file-loader' }]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', 'css', 'png']
	},
	output: {
		path: `${__dirname}/dist/public`,
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/public/index.html',
			filename: './index.html'
		})
	]
};
