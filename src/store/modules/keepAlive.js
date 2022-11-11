import { defineStore } from 'pinia';

const keepAliveStore = defineStore('keepAlive',{
    state: () => {
        return {
            keepLiveRoute: [],
		    routeKey: null,
		    routeShow: true
        }
    },
    actions: {
        pushKeepLive(component){
			if(!this.keepLiveRoute.includes(component)){
				this.keepLiveRoute.push(component)
			}
		},
		removeKeepLive(component){
			var index = this.keepLiveRoute.indexOf(component);
			if(index !== -1){
				this.keepLiveRoute.splice(index, 1);
			}
		},
		clearKeepLive(){
			this.keepLiveRoute = []
		},
		setRouteKey(key){
			this.routeKey = key
		},
		setRouteShow(key){
			this.routeShow = key
		}
    }
})

export default keepAliveStore
