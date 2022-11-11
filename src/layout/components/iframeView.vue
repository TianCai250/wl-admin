<!--
 * @Descripttion: 处理iframe持久化，涉及store(VUEX)
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月30日13:20:41
 * @LastEditors:
 * @LastEditTime:
-->

<template>
    <div v-show="route.meta.type == 'iframe'" class="iframe-pages">
        <iframe v-for="item in iframe.iframeList" :key="item.meta.url" v-show="$route.meta.url == item.meta.url" :src="item.meta.url" frameborder="0"></iframe>
    </div>
</template>

<script setup>
import { onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import usestore from '@/store';

const route = useRoute();
const { iframe, global } = usestore();

watch(
    () => route,
    e => {
        push(e);
    },
    { deep: true },
);

onBeforeMount(() => {
    push(route);
});

const push = curRoute => {
    if (curRoute.meta.type == 'iframe') {
        if (global.ismobile || !global.layoutTags) {
            iframe.setIframeList(curRoute);
        } else {
            iframe.pushIframeList(curRoute);
        }
    } else {
        if (global.ismobile || !global.layoutTags) {
            iframe.clearIframeList();
        }
    }
};
</script>

<style scoped>
.iframe-pages {
    width: 100%;
    height: 100%;
    background: #fff;
}
iframe {
    border: 0;
    width: 100%;
    height: 100%;
    display: block;
}
</style>
