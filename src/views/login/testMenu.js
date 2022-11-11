export const testMenu = [
    {
        name: 'home',
        path: '/home',
        meta: {
            title: '首页',
            icon: 'el-icon-eleme-filled',
            type: 'menu',
        },
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                meta: {
                    title: '控制台',
                    icon: 'el-icon-menu',
                    affix: true,
                },
                component: 'home',
            },
            {
                name: 'userCenter',
                path: '/usercenter',
                meta: {
                    title: '帐号信息',
                    icon: 'el-icon-user',
                },
                component: 'userCenter',
            },
        ],
    },
    {
        name: 'other',
        path: '/other',
        meta: {
            title: '其他',
            icon: 'el-icon-more-filled',
            type: 'menu',
        },
        children: [
            {
                path: '/link',
                name: 'link',
                meta: {
                    title: '外部链接',
                    icon: 'el-icon-link',
                    type: 'menu',
                },
                children: [
                    {
                        path: 'https://baidu.com',
                        name: '百度',
                        meta: {
                            title: '百度',
                            type: 'link',
                        },
                    },
                    {
                        path: 'https://www.google.cn',
                        name: '谷歌',
                        meta: {
                            title: '谷歌',
                            type: 'link',
                        },
                    },
                ],
            },
            {
                path: '/iframe',
                name: 'Iframe',
                meta: {
                    title: 'Iframe',
                    icon: 'el-icon-position',
                    type: 'menu',
                },
                children: [
                    {
                        path: 'https://v3.cn.vuejs.org',
                        name: 'vue3',
                        meta: {
                            title: 'VUE 3',
                            type: 'iframe',
                        },
                    },
                    {
                        path: 'https://element-plus.gitee.io',
                        name: 'elementplus',
                        meta: {
                            title: 'Element Plus',
                            type: 'iframe',
                        },
                    },
                ],
            },
            {
                name: 'report',
                path: '/other/report',
                meta: {
                    title: '报表数据',
                    icon: 'el-icon-document',
                },
                component: 'other/report',
            },
        ],
    },
    
];
