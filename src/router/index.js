import { createRouter, createWebHashHistory } from 'vue-router';
import { ElNotification } from 'element-plus';
import config from '@/config';
import NProgress from 'nprogress';
import storage from '@/utils/storage';
import 'nprogress/nprogress.css';
import systemRouter from './systemRouter';

// 系统路由
const routes = systemRouter;

//系统特殊路由
const routes_404 = {
    path: '/:pathMatch(.*)*',
    hidden: true,
    component: () => import(/* webpackChunkName: "404" */ '@/layout/other/404'),
};
let removeRoute404 = () => {};

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//设置标题
document.title = config.APP_NAME;

//判断是否已加载过动态/静态路由
var isGetRouter = false;

router.beforeEach(async (to, form, next) => {
    NProgress.start();
    //动态标题
    document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME}` : `${config.APP_NAME}`;
    let token = storage.getToken();
    if (to.path === '/login') {
        //删除路由(替换当前layout路由)
        router.addRoute(routes[0]);
        //删除路由(404)
        removeRoute404();
        isGetRouter = false;
        next();
        return false;
    }
    if (routes.findIndex(r => r.path === to.path) >= 0) {
        next();
        return false;
    }
    if (!token) {
        next({
            path: '/login',
        });
        return false;
    }
    //加载动态/静态路由
    if (!isGetRouter) {
        let apiMenu = storage.getMenu() || [];
        let userInfo = storage.getUserInfo();
        let menu = [...apiMenu];
        var menuRouter = filterAsyncRouter(menu);
        menuRouter = flatAsyncRoutes(menuRouter);
        menuRouter.forEach(item => {
            router.addRoute('layout', item);
        });
        removeRoute404 = router.addRoute(routes_404);
        if (to.matched.length == 0) {
            router.push(to.path);
        }
        isGetRouter = true;
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

router.onError(error => {
    NProgress.done();
    ElNotification.error({
        title: '路由错误',
        message: error.message,
    });
});

//路由扁平化
function flatAsyncRoutes(routes, breadcrumb = []) {
    let res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (tmp.children) {
            let childrenBreadcrumb = [...breadcrumb];
            // 循环引用问题
            // childrenBreadcrumb.push(route);
            childrenBreadcrumb.push({
                component: route.component,
                meta: {...route.meta,breadcrumb: []},
                name: route.name,
                path: route.path,
                redirect: route.redirect
            })

            let tmpRoute = { ...route };
            tmpRoute.meta.breadcrumb = childrenBreadcrumb;
            delete tmpRoute.children;
            res.push(tmpRoute);
            console.log('childrenBreadcrumb', childrenBreadcrumb);
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb);
            childrenRoutes.map(item => {
                res.push(item);
            });
        } else {
            let tmpBreadcrumb = [...breadcrumb];
            tmpBreadcrumb.push(tmp);
            tmp.meta.breadcrumb = tmpBreadcrumb;
            res.push(tmp);
        }
    });
    return res;
}

//转换
function filterAsyncRouter(routerMap) {
    const accessedRouters = [];
    routerMap.forEach(item => {
        item.meta = item.meta ? item.meta : {};
        //处理外部链接特殊路由
        if (item.meta.type == 'iframe') {
            item.meta.url = item.path;
            item.path = `/i/${item.name}`;
        }
        //MAP转路由对象
        var route = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            redirect: item.redirect,
            children: item.children ? filterAsyncRouter(item.children) : null,
            component: loadComponent(item.component),
        };
        accessedRouters.push(route);
    });
    return accessedRouters;
}

function loadComponent(component) {
    if (component) {
        return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`);
    } else {
        return () => import(`@/layout/other/empty`);
    }
}

export default router;
