<template>
    <Teleport to="body">
        <transition name="zoom-fade" mode="out-in">
            <div class="search-modal" @click.prevent="handleClose" v-if="visible">
                <div class="search-modal-content" @click.stop>
                    <div class="search-modal-input__wrapper">
                        <el-input class="search-modal-input" ref="inputRef" clearable v-model="searchInput" size="large" @input="changeSearch" placeholder="搜索">
                            <template #prefix>
                                <el-icon>
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="search-modal-not-data" v-show="getIsNotData">暂无搜索结果</div>

                    <ul class="search-modal-list" v-show="!getIsNotData" ref="scrollWrapRef">
                        <li
                            ref="refListRef"
                            v-for="(item, index) in searchResult"
                            :key="item.path"
                            @mouseenter="handleMouseenter(index)"
                            @click="gotoRouter(item)"
                            :class="[
                                'search-modal-list__item',
                                {
                                    ['search-modal-list__item--active']: activeIndex === index,
                                },
                            ]"
                        >
                            <div class="search-modal-list__item-icon">
                                <el-icon><component :is="item.icon || 'el-icon-menu'" /></el-icon>
                            </div>
                            <div class="search-modal-list__item-text">
                                {{ item.name }}
                            </div>
                            <div class="search-modal-list__item-enter">
                                <span class="search-anticon" style="font-size: 20px; display: inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 1024 1024" class="iconify iconify--ant-design">
                                        <path
                                            fill="currentColor"
                                            d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div class="search-footer">
                        <span class="search-footer-item">
                            <span class="search-anticon search-footer-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 1024 1024" class="iconify iconify--ant-design">
                                    <path
                                        fill="currentColor"
                                        d="M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"
                                    ></path>
                                </svg>
                            </span>
                        </span>
                        <span>确认</span>
                        <span class="search-footer-item">
                            <span class="search-anticon search-footer-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 512 512" class="iconify iconify--ion">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 244l144-144l144 144M256 120v292"></path>
                                </svg>
                            </span>
                        </span>
                        <span class="search-footer-item">
                            <span class="search-anticon search-footer-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 512 512" class="iconify iconify--ion">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 268l144 144l144-144M256 392V100"></path>
                                </svg>
                            </span>
                        </span>
                        <span>切换</span>
                        <span class="search-footer-item">
                            <span class="search-anticon search-footer-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--mdi">
                                    <path
                                        fill="currentColor"
                                        d="M1 7h6v2H3v2h4v2H3v2h4v2H1V7m10 0h4v2h-4v2h2a2 2 0 0 1 2 2v2c0 1.11-.89 2-2 2H9v-2h4v-2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2m8 0h2a2 2 0 0 1 2 2v1h-2V9h-2v6h2v-1h2v1c0 1.11-.89 2-2 2h-2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2Z"
                                    ></path>
                                </svg>
                            </span>
                        </span>
                        <span>关闭</span>
                        <span class="search-footer-item ctrl-m">
                            <span class="search-anticon search-footer-icon">
                                <svg width="35" height="24" xmlns="http://www.w3.org/2000/svg" class="iconify iconify--mdi">
                                    <g>
                                        <title>background</title>
                                        <rect fill="none" id="canvas_background" height="26" width="37" y="-1" x="-1" />
                                    </g>
                                    <g>
                                        <title>Layer 1</title>
                                        <text
                                            font-weight="bold"
                                            stroke="null"
                                            transform="matrix(0.5965486168861387,0,0,0.7063292264938354,-0.1502669962962599,5.252359781237374) "
                                            xml:space="preserve"
                                            text-anchor="start"
                                            font-family="Helvetica, Arial, sans-serif"
                                            font-size="14"
                                            id="svg_2"
                                            y="15.390922"
                                            x="0.682122"
                                            stroke-opacity="null"
                                            stroke-width="0"
                                            fill="#666666"
                                        >
                                            CTRL+K
                                        </text>
                                    </g>
                                </svg>
                            </span>
                        </span>
                        <span>打开/关闭搜索</span>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { scrollTo } from './scrollTo';
import { testMenu } from '@/views/login/testMenu';

const router = useRouter();

const props = defineProps(['visible']);
const emit = defineEmits(['close']);

const searchInput = ref('');
const routes = ref([]);
const searchResult = ref([]);
const activeIndex = ref(0);
const inputRef = ref(null);
const scrollWrapRef = ref(null);
const refListRef = ref(null);

const getIsNotData = computed(() => searchResult.value.length === 0);

watch(
    () => props.visible,
    newVal => {
        if (newVal) {
            nextTick(() => {
                inputRef.value.focus();
            });
            registerKeyEvents();
        } else {
            removeKeyEvents();
        }
    },
);

onBeforeMount(() => {
    // 参数传菜单
    getRoutes(testMenu);
});

const getRoutes = menu => {
    handleMenu(menu);
    function handleMenu(Menu) {
        Menu.forEach(item => {
            if (item.children && item.children.length > 0) {
                handleMenu(item.children);
            } else {
                if (item.meta.type === 'menu') {
                    routes.value.push({
                        path: item.path,
                        name: item.meta.title,
                        icon: item.meta.icon,
                        type: 'menu',
                    });
                } else if (item.meta.type === 'iframe') {
                    routes.value.push({
                        path: `/${item.name}`,
                        name: item.meta.title,
                        icon: item.meta.icon,
                        type: 'iframe',
                    });
                } else if (item.meta.type === 'link') {
                    routes.value.push({
                        path: item.path,
                        name: item.meta.title,
                        icon: item.meta.icon,
                        type: 'link',
                    });
                }
            }
        });
    }
};

const registerKeyEvents = () => {
    document.addEventListener('keydown', handleKeyDown);
};
const removeKeyEvents = () => {
    document.removeEventListener('keydown', handleKeyDown);
};
const handleKeyDown = e => {
    switch (e.key) {
        case 'ArrowDown':
            if (searchResult.value.length > 0) {
                activeIndex.value = (activeIndex.value + 1) % searchResult.value.length;
                handleScroll();
            }
            break;
        case 'ArrowUp':
            if (searchResult.value.length > 0) {
                activeIndex.value = (searchResult.value.length + activeIndex.value - 1) % searchResult.value.length;
                handleScroll();
            }
            break;
        case 'Escape':
            handleClose();
            break;
        case 'Enter':
            if (searchResult.value[activeIndex.value]) {
                gotoRouter(searchResult.value[activeIndex.value]);
            }
            break;
    }
};

const changeSearch = () => {
    activeIndex.value = 0;
    if (searchInput.value.trim() === '') {
        searchResult.value = [];
        return;
    }
    searchResult.value = routes.value.filter(item => item.name.indexOf(searchInput.value) > -1);
};
const gotoRouter = item => {
    if (item.type === 'link') {
        window.open(item.path);
        return;
    }
    router.push({ path: item.path });
    handleClose();
};
const handleClose = () => {
    searchResult.value = [];
    activeIndex.value = 0;
    searchInput.value = '';
    emit('close');
};

const handleScroll = () => {
    const wrapEl = scrollWrapRef.value;
    const refList = refListRef.value;
    const currentRef = refList[activeIndex.value];
    if (!wrapEl) {
        return;
    }
    const wrapHeight = wrapEl.offsetHeight;
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight;
    scrollTo({
        el: wrapEl,
        duration: 500,
        to: scrollHeight - wrapHeight,
    });
};
const handleMouseenter = index => {
    activeIndex.value = index;
};
</script>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
    transition: transform 0.2s, opacity 0.3s ease-out;
}

.zoom-fade-enter-from {
    opacity: 0;
    transform: scale(0.92);
}

.zoom-fade-leave-to {
    opacity: 0;
    transform: scale(1.06);
}
.search-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: #00000040;
    justify-content: center;
}
.search-modal-content {
    position: relative;
    width: 632px;
    margin: 0 auto auto;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px #00000040;
    flex-direction: column;
}
.search-modal-input__wrapper {
    display: flex;
    padding: 14px 14px 0;
    justify-content: space-between;
    align-items: center;
}
.search-modal-not-data {
    display: flex;
    width: 100%;
    height: 100px;
    font-size: 16px;
    color: #969faf;
    align-items: center;
    justify-content: center;
}
.search-modal-list {
    max-height: 472px;
    padding: 0 14px 20px;
    margin: 14px auto 0;
    overflow: auto;
}
.search-modal-list__item {
    position: relative;
    display: flex;
    width: 100%;
    height: 56px;
    padding-bottom: 4px;
    padding-left: 14px;
    margin-top: 8px;
    font-size: 14px;
    color: #000000d9;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px #d4d9e1;
    align-items: center;
}
.search-modal-list__item--active {
    color: #fff;
    background-color: #409eff;
}
.search-modal-list__item > div:first-child,
.search-modal-list__item > div:last-child {
    display: flex;
    align-items: center;
}
.search-modal-list__item-icon {
    width: 30px;
}
.search-modal-list__item-text {
    flex: 1;
}
.search-anticon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.search-modal-list__item--active .search-modal-list__item-enter {
    opacity: 100%;
}
.search-modal-list__item-enter {
    width: 30px;
    opacity: 0%;
}
.search-footer {
    position: relative;
    display: flex;
    height: 44px;
    padding: 0 16px;
    font-size: 12px;
    color: #666;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    border-radius: 0 0 16px 16px;
    align-items: center;
    flex-shrink: 0;
}
.search-footer-item {
    display: flex;
    width: 20px;
    height: 18px;
    padding-bottom: 2px;
    margin-right: 0.4em;
    background-color: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
    border-radius: 2px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
    align-items: center;
    justify-content: center;
}

.search-footer-item.ctrl-m {
    width: 40px;
}
.search-footer-item:nth-child(2),
.search-footer-item:nth-child(3),
.search-footer-item:nth-child(6),
.search-footer-item:nth-child(8) {
    margin-left: 14px;
}
.search-footer-icon {
    font-size: 16px;
    display: inline-flex;
}
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
}
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
}
</style>
