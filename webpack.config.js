// 由于 webpack 是基于node进行构建的，所以，webpack 的配置文件中，任何合法的node代码都是支持的
var path = require('path')

// 当以命令行形式运行webpack或者webpack-dev-server的时候，工具会发现，我们并没有提供  要打包的文件的入口和出口文件，此时  他会
//  检查项目根目录中的配置文件，并读取这个文件，就拿到了到处的这个配置对象，然后根据这个对象，进行打包构建

var htmlWebpackPlugin = require('html-webpack-plugin')
// 如果要配置插件，需要在到处对象中，挂在一个plugin节点

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output:{
        // 指定输出选项
        path:path.join(__dirname,'./dist'),//输出路径
        filename:'bundel.js'    //指定输出文件的名称
    },
    plugins:[
        //所有webpack 的插件的配置节点
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html'  //设置生产的内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        // 配置所有第三方loader模块
        rules:[
            {   test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
            {   test:/\.less$/,use:['style-loader','css-loader','less-loader']},//处理less文件的loader
            {   test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},//处理scss文件的loader
            {   test:/\.(jpg|png|gif|bmp|jpeg|svg)$/,use:['url-loader']},//处理 图片文件 路径的loader
            // limit 给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于或者等于给定的limit值，则不会被转为base64格式的字符串
            //   如果  图片小于给定的limit值，则会被转为base64字符串
            {   test:/\.(ttf|eot|svg|woff|woff2|otf)$/,use:['url-loader']},//处理字体 文件的loader
            {   test:/\.js$/,use:'babel-loader',exclude:/node_modules|bower_components/},    //配置babel来转换高级的es语法
            {    test:/\.vue$/,use:'vue-loader'},   //配置vue-loader来处理vue文件
        ]
    },
    resolve:{
        alias:{
            // 修改 vue 被导入时 包的路径
            "vue$":"vue/dist/vue.js"
        }
    }
}