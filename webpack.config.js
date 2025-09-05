const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point
  output: {
    filename: "main.js", // Output bundle
    path: path.resolve(__dirname, "dist"), // Output folder
    clean: true, // Clean dist/ before build
  },
  mode: "development", // or 'production'
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Handle HTML
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Handle CSS
      },
      //      {
      //			  test: /\.html$/i,
      //			  loader: "html-loader", //html-loader for Image
      //			},
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //Image loader
        type: "asset/resource",
      },
    ],
  },
};
