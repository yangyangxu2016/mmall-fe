/**
 * Created by 14258 on 2017/10/19.
 */


var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法 //
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};


var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
         publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },//
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },//´¦ÀíÍ¼Æ¬
            //{ test: /\.string$/, loader: 'html-loader'}
        ]
    },
    //devServer: {
    //    contentBase: "./",       //±¾µØ·þÎñÆ÷Ëù¼ÓÔØµÄÒ³ÃæËùÔÚµÄÄ¿Â¼
    //    historyApiFallback: true,       //²»Ìø×ª
    //    port: 8086,
    //    inline: true,    //ÊµÊ±Ë¢ÐÂ
    //    hot: true
    //},
    plugins: [
        // ¶ÀÁ¢Í¨ÓÃÄ£¿éµ½js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // °Ñcssµ¥¶À´ò°üµ½ÎÄ¼þÀï
        new ExtractTextPlugin("css/[name].css"),
        // htmlÄ£°åµÄ´¦Àí
        new HtmlWebpackPlugin(getHtmlConfig('index', 'Ê×Ò³')),
        new HtmlWebpackPlugin(getHtmlConfig('login', 'Ê×Ò³')),
    ]
};


if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config
// webpack
// webpack-dev-server -port 8088 --inline
// win执行这个命令
// npm run dev_win




