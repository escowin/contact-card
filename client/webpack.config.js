const path = require('path');

// indicates to webpack which entry point to use for bundling. webpack then generates a web dependency located in /dist
module.exports = {
    mode: "development",
    entry: "./src/js/index.js", 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { // handling image files
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            }
        ]
    }
};