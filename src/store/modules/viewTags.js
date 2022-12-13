import { defineStore } from 'pinia';
import router from '@/router';


const viewTagsStore = defineStore('viewTags', {
    state: () => {
        return {
            viewTags: [],
        };
    },
    actions: {
        pushViewTags(route) {
            let backPathIndex = this.viewTags.findIndex(item => item.path == router.options.history.state.back);
            let target = this.viewTags.find(item => item.path === route.path);
            let isName = route.name;
            if (!target && isName) {
                if (backPathIndex == -1) {
                    this.viewTags.push(route);
                } else {
                    this.viewTags.splice(backPathIndex + 1, 0, route);
                }
            }
        },
        removeViewTags(route) {
            this.viewTags.forEach((item, index) => {
                if (item.path === route.path) {
                    this.viewTags.splice(index, 1);
                }
            });
        },
        updateViewTags(route) {
            this.viewTags.forEach(item => {
                if (item.path == route.path) {
                    item = Object.assign(item, route);
                }
            });
        },
        updateViewTagsTitle(title = '') {
            const nowFullPath = location.hash.substring(1);
            this.viewTags.forEach(item => {
                if (item.path == nowFullPath) {
                    item.meta.title = title;
                }
            });
        },
        clearViewTags() {
            this.viewTags = [];
        },
    },
});

export default viewTagsStore;
