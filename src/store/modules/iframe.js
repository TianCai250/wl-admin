import { defineStore } from 'pinia';

const iframeStore = defineStore('iframe', {
    state: () => {
        return {
            iframeList: [],
        };
    },
    actions: {
        setIframeList(route) {
            this.iframeList = [];
            this.iframeList.push(route);
        },
        pushIframeList(route) {
            let target = this.iframeList.find(item => item.path === route.path);
            if (!target) {
                this.iframeList.push(route);
            }
        },
        removeIframeList(route) {
            this.iframeList.forEach((item, index) => {
                if (item.path === route.path) {
                    this.iframeList.splice(index, 1);
                }
            });
        },
        refreshIframe(route) {
            this.iframeList.forEach(item => {
                if (item.path == route.path) {
                    var url = route.meta.url;
                    item.meta.url = '';
                    setTimeout(function () {
                        item.meta.url = url;
                    }, 200);
                }
            });
        },
        clearIframeList() {
            this.iframeList = [];
        },
    },
});

export default iframeStore;
