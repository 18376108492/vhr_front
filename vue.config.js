let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        //不修改拦截路径
        '^/': ''
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}

