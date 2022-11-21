const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

//Vendor
const vendor = path.resolve(__dirname, 'node_modules');

//Styles
const themeStyle = path.resolve(__dirname, 'src/scss');

//Scripts
const themeScript = path.resolve(__dirname, 'src/scripts');


module.exports = {
  entry: {
    vendorStyle: [
      `${vendor}/bootstrap/scss/bootstrap.scss`
    ],
    themeStyle: [
      `${themeStyle}/style.scss`,
      `${themeStyle}/custom/abstract/reset.scss`,
    ],
    vendorScript: [
      `${vendor}/bootstrap/dist/js/bootstrap.js`,
      `${vendor}/@popperjs/core/dist/umd/popper.min.js`
    ],
    themeScript: [
      `${themeScript}/barrio.js`,
      `${themeScript}/custom.js`,
    ],
  },
   output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name]/[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: "auto" }]]
          }
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          devMode&&this.test ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        exclude: [/node_modules/],
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        // exclude: [/node_modules/],
        type: 'asset/inline',
      },
    ],
  },
  plugins: [].concat(devMode ? [new MiniCssExtractPlugin({ filename: './css/[name]/[name].css'})] : []),
};
