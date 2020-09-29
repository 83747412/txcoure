const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin'); //用来缩小(压缩优化)js文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');  //css3需要加属性兼容前缀
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 打包成一个单独的css文件，生成一个外部样式表
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件

// txcourse.jsplusplus.com

const config = {
  mode: 'development', //production
  entry: {
  	index: path.resolve(__dirname, './src/js/index.js'),
    list: path.resolve(__dirname, './src/js/list.js')
  },
  output: {
  	path: path.resolve(__dirname + '/dist'),
  	filename: 'js/[name].js'
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: [
          path.resolve(__dirname, 'node_modules')
      	]
      },

      {
      	test: /\.tpl$/,
      	loader: 'ejs-loader'
      },

      {
        test: /\.scss$/,
        use: [
          {
          	loader: MiniCssExtractPlugin.loader,
	          options: {
	        	  hmr: process.env.NODE_ENV === 'development'
	          }
	        },
	        'css-loader',
	        {
	        	loader: 'postcss-loader',
	        	options: {
	        		plugins: function () {
	        			return [autoprefixer('last 5 versions')]
	        		}
	        	}
	        },
	        'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        use: [
          {
           loader: MiniCssExtractPlugin.loader,
            options: {
             hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },

      {
      	test: /\.(png|jpg|jpeg|gif|ico)$/i,
      	loader: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
          'image-webpack-loader'  //再次压缩图片
      	]  //处理图片
      },

      {
        test: /\.(woff2?|eot|ttf|oft|svg)(\?.*)?$/i,
        loader: [
          'url-loader?name=fonts/[name].[ext]'
        ]  //处理字体
      }
  	]
  },

  plugins: [
    new Uglify(),
    new OptimizeCssAssetsPlugin({}),
    new htmlWebpackPlugin({
      minify: {
      	removeComments: true,  //把所有的注释删除掉
      	collapseWhitespace: true  //把所有的空格换行都去掉
      },
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: '腾讯课堂JS++课程首页',
      chunksSortMode: 'manual', //手动设置脚本的顺序
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true  //脚本引入时后面加上问号，后面跟面一串hash值，为了把缓存清掉
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'list.html',
      template: path.resolve(__dirname, 'src/list.html'),
      title: '腾讯课堂JS++课程列表页',
      chunksSortMode: 'manual',
      chunks: ['list'],
      excludeChunks: ['node_modules'],
      hash: true
    }),

    new MiniCssExtractPlugin({
    	filename: 'css/[name].css'   //设置css打包的文件路径
    })
  ],

  devServer: {
  	watchOptions: {
  		ignored: /node_modules/ //当node_modules有变化的时候会被忽略掉，devServer不监听
  	},
    open: true,
  	host: 'localhost',
  	port: 3200
  }
};

module.exports = config;






