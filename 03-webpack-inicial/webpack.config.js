/* Importando los complementos que usaremos en la configuración de nuestro paquete web. */
const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/* Exportando el objeto de configuración. */
module.exports = {
	/* Diciéndole a webpack que use el modo de desarrollo. */
	mode: 'development',

	/* Limpieza de la carpeta de salida antes de cada compilación. */
	output: {
		clean: true,
	},

	module: {
		rules: [
			/* Diciéndole a webpack que use el cargador html para procesar los archivos html. */
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					/* Indicar al cargador html que no incluya el código fuente de los archivos html en el paquete. */
					sources: false,
				},
			},
			/* Diciéndole a webpack que use el cargador de estilo y el cargador css para procesar todos los
			archivos css excepto el archivo styles.css. */
			{
				test: /\.css$/,
				exclude: /styles.css$/,
				use: ['style-loader', 'css-loader'],
			},
			/* Diciéndole a webpack que use el cargador MiniCssExtract y el cargador css para procesar el
			archivo styles.css. */
			{
				test: /styles.css$/,
				use: [MiniCssExtract.loader, 'css-loader'],
			},
			/* Diciéndole a webpack que use el cargador de archivos para procesar todos los archivos png, jpg y
			gif. */
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: 'file-loader',
			},
		],
	},

	/* Un objeto que le permite configurar el proceso de optimización. */
	optimization: {},

	plugins: [
		/* Creación de una nueva instancia del complemento HtmlWebpack. */
		new HtmlWebpack({
			/* Configuración del título de la página web. */
			title: 'Mi Webpack App',
			// filename: 'index.html',
			/* Diciéndole a webpack que use el archivo index.html en la carpeta src como plantilla para el
			archivo index.html en la carpeta dist. */
			template: './src/index.html',
		}),

		/* Creación de una nueva instancia del complemento MiniCssExtract. */
		new MiniCssExtract({
			/* Diciéndole a webpack que use el nombre del punto de entrada como el nombre del archivo css. */
			filename: '[name].css',
			/* Diciéndole a webpack que no ignore el orden de los archivos CSS. */
			ignoreOrder: false,
		}),

		/* Copiando la carpeta de activos de la carpeta src a la carpeta dist. */
		new CopyPlugin({
			patterns: [{ from: 'src/assets/', to: 'assets/' }],
		}),
	],
};
