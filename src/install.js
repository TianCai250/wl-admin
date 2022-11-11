import * as elIcons from '@element-plus/icons-vue'

export default {
	install(app) {
		//挂载全局对象

		//统一注册el-icon图标
		for(let icon in elIcons){
			app.component(`ElIcon${icon}`, elIcons[icon])
		}
	}
}
