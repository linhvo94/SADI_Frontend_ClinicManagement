
var config = {
    entry: './main.js',
    
    output: {
        path:'/',
        filename: 'index.js',
     },
     
    devServer: {
        inline: true,
        port: 8080,
        contentBase: './',
        historyApiFallback: true
    },
     
    module: {
       rules: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
                 
             query: {
                presets: ['es2015', 'react']
             }
          },

          {
              test: /\.css?$/,
              exclude: /node_modules/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {test: /\.(png|jpg)$/, loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"}
       ]
    }
 }
 
 module.exports = config;