'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'likeAngularJS.js',
        libraryTarget: 'umd',
    },

    optimization: {
        minimize: false
    }
};
