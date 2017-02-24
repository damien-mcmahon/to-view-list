import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import OfflinePlugin from 'offline-plugin';


const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV!=='production';

const NO_ERRORS_PLUGIN = new webpack.NoErrorsPlugin();
const EXTRACT_TEXT = new ExtractTextPlugin('style.css', {
			allChunks: true,
			disable: ENV!=='production'
		});
const DE_DUPE = new webpack.optimize.DedupePlugin();
const DEFINE_PLUGIN = new webpack.DefinePlugin({
			'process.env': JSON.stringify({ NODE_ENV: ENV })
		});
const HTML_PLUGIN = new HtmlWebpackPlugin({
			template: './index.html',
			minify: { collapseWhitespace: true }
		});
const SW_PRECACHE_PLUGIN = new SWPrecacheWebpackPlugin({
      cacheId: 'toViewApp',
      filename: 'toviewAppServiceWorker.js'
    })

const APP_CACHE_PLUGIN = new OfflinePlugin({
  AppCache: {
   directory: 'appcache/',
   FALLBACK: { '/': '/' }
  },
  //already got the SW Cache plugin for now...
  ServiceWorkder: false
});

const PLUGINS = [NO_ERRORS_PLUGIN, EXTRACT_TEXT, DE_DUPE, DEFINE_PLUGIN, HTML_PLUGIN, APP_CACHE_PLUGIN];

if (ENV === 'prodution') {
  PLUGINS.concat(SW_PRECACHE_PLUGIN);
}
module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: ['whatwg-fetch','./index.js'],

	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.scss'],
		modulesDirectories: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),		// used for tests
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /src\//,
				loader: 'source-map'
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(scss|css)$/,
				include: /src\/components\//,
				loader: ExtractTextPlugin.extract('style?singleton', [
					`css?sourceMap=${CSS_MAPS}&modules&importLoaders=1&localIdentName=[local]${process.env.CSS_MODULES_IDENT || '_[hash:base64:5]'}`,
					'postcss',
					`sass-loader?sourceMap=${CSS_MAPS}`
				].join('!'))
			},
			{
				test: /\.(scss|css)$/,
				exclude: /src\/components\//,
				loader: ExtractTextPlugin.extract('style?singleton', [
					`css?sourceMap=${CSS_MAPS}`,
					`postcss`,
					`sass-loader?sourceMap=${CSS_MAPS}`
				].join('!'))
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				loader: 'raw'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				loader: ENV==='production' ? 'file?name=[path][name]_[hash:base64:5].[ext]' : 'url'
			}
		]
	},

	postcss: () => [
		autoprefixer({ browsers: 'last 2 versions' })
	],

	plugins: (PLUGINS).concat(ENV==='production' ? [
		new webpack.optimize.OccurenceOrderPlugin()
	] : []),

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		colors: true,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		proxy: {
			// OPTIONAL: proxy configuration:
			// '/optional-prefix/**': { // path pattern to rewrite
			//	 target: 'http://target-host.com',
			//	 pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
			// }
		}
	}
};
