const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	//设置为空打包后不分更目录还是多级目录
	publicPath:'',
	//build编译后存放静态文件的目录
	//assetsDir: "static",
    outputDir: process.env.VUE_APP_ENV === 'production' ? 'dist' : 'beta',

	// build编译后不生成资源MAP文件
	productionSourceMap: false,

	configureWebpack: {
		//性能提示
		performance: {
			hints: false
		}
	}
})
