const path = require('path');
const publicPath = '/';
const thePath = path.resolve(__dirname, 'dist');
const thePathPublic = path.resolve(__dirname, 'public');
const extensions = ['.jsx', '.mjs', '.js'];
const ownModule = {
    rules: [{
        test: /\.(js|jsx|ts|tsx|mts|mjs)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader", options: { presets: ['@babel/preset-env', "@babel/preset-react"] } }
    }]
}

const serverConfig = {
    resolve: { extensions },
    module: ownModule,
    target: 'node',
    entry: './server/server.mjs',
    output: { path: thePath, filename: 'server.js', publicPath, },
};

const clientConfig = {
    resolve: { extensions },
    module: ownModule,
    entry: './client/index.js',
    output: { path: thePathPublic, filename: 'client.js', publicPath, },
}

module.exports = [serverConfig, clientConfig];