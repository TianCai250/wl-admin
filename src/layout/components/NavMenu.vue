<template>
    <div v-if="props.navMenus.length <= 0" style="padding: 20px">
        <el-alert title="无子集菜单" center type="info" :closable="false"></el-alert>
    </div>
    <transition-group name="sidebar">
        <template v-for="navMenu in props.navMenus" v-bind:key="navMenu.path">
            <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
                <a v-if="navMenu.meta && navMenu.meta.type == 'link'" :href="navMenu.path" target="_blank" @click.stop="() => {}"></a>
                <el-icon v-if="navMenu.meta && navMenu.meta.icon"><component :is="navMenu.meta.icon || 'el-icon-menu'" /></el-icon>
                <template #title>
                    <span>{{ navMenu.meta.title }}</span>
                    <span v-if="navMenu.meta.tag" class="menu-tag">{{ navMenu.meta.tag }}</span>
                </template>
            </el-menu-item>
            <el-sub-menu v-else :index="navMenu.path">
                <template #title>
                    <el-icon v-if="navMenu.meta && navMenu.meta.icon"><component :is="navMenu.meta.icon || 'el-icon-menu'" /></el-icon>
                    <span>{{ navMenu.meta.title }}</span>
                    <span v-if="navMenu.meta.tag" class="menu-tag">{{ navMenu.meta.tag }}</span>
                </template>
                <NavMenu :navMenus="navMenu.children"></NavMenu>
            </el-sub-menu>
        </template>
    </transition-group>
</template>

<script setup>
const props = defineProps(['navMenus']);

const hasChildren = item => {
    return item.children && !item.children.every(item => item.meta.hidden);
};
</script>

<style scoped>
/* 次侧边栏动画 */
.sidebar-enter-active {
    transition: opacity 0.2s, transform 0.2s;
}

.sidebar-enter-from,
.sidebar-leave-active {
    opacity: 0;
    transform: translateY(20px) skewY(8deg);
}

.sidebar-leave-active {
    position: absolute;
}
.el-icon {
    transition: transform 0.2s;
}
.el-menu-item:hover > .el-icon {
    transform: scale(1.2);
}
</style>
