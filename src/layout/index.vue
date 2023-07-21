<template>
    <section class="aminui-wrapper">
        <div v-if="!global.ismobile" class="aminui-side-split">
            <div class="aminui-side-split-top">
                <router-link :to="config.DASHBOARD_URL">
                    <img class="logo" :title="config.APP_NAME" src="img/logo-r.png" />
                </router-link>
            </div>
            <div class="adminui-side-split-scroll">
                <el-scrollbar>
                    <ul>
                        <li v-for="item in menu" :key="item" :class="pmenu.path == item.path ? 'active' : ''" @click="showMenu(item)">
                            <el-icon><component :is="item.meta.icon || el - icon - menu" /></el-icon>
                            <p>{{ item.meta.title }}</p>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <div v-if="(!global.ismobile && nextMenu.length > 0) || !pmenu.component" :class="global.menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'">
            <div v-if="!global.menuIsCollapse" class="adminui-side-top">
                <h2>{{ pmenu.meta.title }}</h2>
            </div>
            <div class="adminui-side-scroll">
                <el-scrollbar>
                    <el-menu :default-active="active" router :collapse="global.menuIsCollapse" :unique-opened="config.MENU_UNIQUE_OPENED">
                        <NavMenu :navMenus="nextMenu"></NavMenu>
                    </el-menu>
                </el-scrollbar>
            </div>
            <div class="adminui-side-bottom" @click="global.TOGGLE_menuIsCollapse">
                <el-icon>
                    <el-icon-expand v-if="global.menuIsCollapse" />
                    <el-icon-fold v-else />
                </el-icon>
            </div>
        </div>
        <Side-m v-if="global.ismobile"></Side-m>
        <div class="aminui-body el-container">
            <Topbar>
                <userbar></userbar>
            </Topbar>
            <Tags v-if="!global.ismobile && global.layoutTags"></Tags>
            <div class="adminui-main" id="adminui-main">
                <router-view v-slot="{ Component }">
                    <keep-alive :include="keepAlive.keepLiveRoute">
                        <component :is="Component" :key="$route.path" v-if="keepAlive.routeShow" />
                    </keep-alive>
                </router-view>
                <iframe-view></iframe-view>
            </div>
        </div>
    </section>
    <div class="main-maximize-exit" @click="exitMaximize">
        <el-icon><el-icon-close /></el-icon>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, nextTick, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import config from '@/config';
import storage from '@/utils/storage';
import usestore from '@/store';
import tool from '@/utils/tool'

import SideM from './components/sideM.vue';
import Topbar from './components/topbar.vue';
import Tags from './components/tags.vue';
import NavMenu from './components/NavMenu.vue';
import userbar from './components/userbar.vue';
import iframeView from './components/iframeView.vue';

const { global, keepAlive } = usestore();
const route = useRoute();
const router = useRouter();

const menu = ref([]);
const pmenu = ref({});
const nextMenu = ref([]);
const active = ref('');

onBeforeMount(() => {
    onLayoutResize();
    window.addEventListener('resize', onLayoutResize);
    let Menu = storage.getMenu();
    menu.value = filterUrl(Menu);
    showThis();
});

watch(
    () => route,
    newVal => {
        console.log(newVal)
        showThis();
    },
    { deep: true },
);


watch(
    () => global.layout,
    newVal => {
        document.body.setAttribute('data-layout', newVal);
    },
    { immediate: true },
);

const onLayoutResize = () => {
    global.SET_ismobile(document.body.clientWidth < 992);
};

//转换外部链接的路由
const filterUrl = map => {
    var newMap = [];
    map &&
        map.forEach(item => {
            item.meta = item.meta ? item.meta : {};
            //处理隐藏
            if (item.meta.hidden || item.meta.type == 'button') {
                return false;
            }
            //处理http
            if (item.meta.type == 'iframe') {
                item.path = `/${item.name}`;
            }
            //递归循环
            if (item.children && item.children.length > 0) {
                item.children = filterUrl(item.children);
            }
            newMap.push(item);
        });
    return newMap;
};

//路由监听高亮
const showThis = () => {
    pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {};
    const menu = storage.getMenu();
    nextMenu.value = filterUrl(menu.find(item => item.name == pmenu.value.name).children);
    nextTick(() => {
        active.value = route.meta.active || route.path;
    });
};

//点击显示
const showMenu = curRoute => {
    pmenu.value = curRoute;
    nextMenu.value = filterUrl(curRoute.children);
    if ((!curRoute.children || curRoute.children.length == 0) && curRoute.component) {
        router.push({ path: curRoute.path });
    }
};
//退出最大化
const exitMaximize = () => {
    document.getElementById('app').classList.remove('main-maximize');
};
</script>

<style lang="scss" scoped></style>
