const path = require('path');

module.exports = {
  context:path.resolve(__dirname,"src"),
  entry: {
    index:'./js/index.js',
    Product:'./js/Product.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: './js/[name].js',
  },
  devServer:{
    contentBase: path.join(__dirname, 'src/pages'),
    compress:true,
    port:8080,
    open:true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.html$/,
        use:[{
          loader:"file-loader",
          options:{
            name:'[path][name].[ext]'
          }
        }]
      }
    ]
  },
};