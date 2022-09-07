const htmlWebpack = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	output: {
		// eliminar el build
		clean: true,
	},

	module: {
		rules: [
			{
				// test: que tipo de archivo quiero reconocer,
				test: /\.html$/,
				// use: que loader se va a encargar del archivo
				// html-loader sirve para interpretar los archivos html
				loader: 'html-loader',
				options: {
					// source es el archivo que se esta procesando
					// como mover imágenes o recursos
					sources: false,
				},
			},
			{
				test: /\.css$/,
				use: [
					// 'style-loader',
					// 'css-loader',
					'style-loader',
					'css-loader',
				],
			},
		],
	},
	optimization: {},
	plugins: [
		// inyecta el archivo index.html dentro del archivo dist
		// también pone el js
		new htmlWebpack({
			// cambiar titulo de html
			title: 'webpack-inicial',
			// cambiar el nombre del archivo
			filename: 'index.html',
			// template es el archivo que se va a procesar
			template: './src/index.html',
		}),
	],
};
