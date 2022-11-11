"use strict";(self["webpackChunkwl_admin"]=self["webpackChunkwl_admin"]||[]).push([[535,292],{8067:function(e,t,a){a.d(t,{Z:function(){return d}});a(7658);var i=a(9876);const l=(0,i.Q_)("keepAlive",{state:()=>({keepLiveRoute:[],routeKey:null,routeShow:!0}),actions:{pushKeepLive(e){this.keepLiveRoute.includes(e)||this.keepLiveRoute.push(e)},removeKeepLive(e){var t=this.keepLiveRoute.indexOf(e);-1!==t&&this.keepLiveRoute.splice(t,1)},clearKeepLive(){this.keepLiveRoute=[]},setRouteKey(e){this.routeKey=e},setRouteShow(e){this.routeShow=e}}});var s=l,o=a(1073);const n=(0,i.Q_)("global",{state:()=>({ismobile:!1,layout:o.Z.LAYOUT,menuIsCollapse:o.Z.MENU_IS_COLLAPSE,layoutTags:o.Z.LAYOUT_TAGS,theme:o.Z.THEME}),actions:{SET_ismobile(e){this.ismobile=e},SET_layout(e){this.layout=e},SET_theme(e){this.theme=e},TOGGLE_menuIsCollapse(){this.menuIsCollapse=!this.menuIsCollapse},TOGGLE_layoutTags(){this.layoutTags=!this.layoutTags}}});var r=n,u=a(7122);const m=(0,i.Q_)("viewTags",{state:()=>({viewTags:[]}),actions:{pushViewTags(e){let t=this.viewTags.findIndex((e=>e.fullPath==u.Z.options.history.state.back)),a=this.viewTags.find((t=>t.fullPath===e.fullPath)),i=e.name;!a&&i&&(-1==t?this.viewTags.push(e):this.viewTags.splice(t+1,0,e))},removeViewTags(e){this.viewTags.forEach(((t,a)=>{t.fullPath===e.fullPath&&this.viewTags.splice(a,1)}))},updateViewTags(e){this.viewTags.forEach((t=>{t.fullPath==e.fullPath&&(t=Object.assign(t,e))}))},updateViewTagsTitle(e=""){const t=location.hash.substring(1);this.viewTags.forEach((a=>{a.fullPath==t&&(a.meta.title=e)}))},clearViewTags(){this.viewTags=[]}}});var c=m;const h=(0,i.Q_)("iframe",{state:()=>({iframeList:[]}),actions:{setIframeList(e){this.iframeList=[],this.iframeList.push(e)},pushIframeList(e){let t=this.iframeList.find((t=>t.path===e.path));t||this.iframeList.push(e)},removeIframeList(e){this.iframeList.forEach(((t,a)=>{t.path===e.path&&this.iframeList.splice(a,1)}))},refreshIframe(e){this.iframeList.forEach((t=>{if(t.path==e.path){var a=e.meta.url;t.meta.url="",setTimeout((function(){t.meta.url=a}),200)}}))},clearIframeList(){this.iframeList=[]}}});var p=h;function d(){return{keepAlive:s(),global:r(),viewTags:c(),iframe:p()}}},4451:function(e,t,a){a.r(t),a.d(t,{testMenu:function(){return i}});const i=[{name:"home",path:"/home",meta:{title:"首页",icon:"el-icon-eleme-filled",type:"menu"},children:[{name:"dashboard",path:"/dashboard",meta:{title:"控制台",icon:"el-icon-menu",affix:!0},component:"home"},{name:"userCenter",path:"/usercenter",meta:{title:"帐号信息",icon:"el-icon-user"},component:"userCenter"}]},{name:"other",path:"/other",meta:{title:"其他",icon:"el-icon-more-filled",type:"menu"},children:[{path:"/link",name:"link",meta:{title:"外部链接",icon:"el-icon-link",type:"menu"},children:[{path:"https://baidu.com",name:"百度",meta:{title:"百度",type:"link"}},{path:"https://www.google.cn",name:"谷歌",meta:{title:"谷歌",type:"link"}}]},{path:"/iframe",name:"Iframe",meta:{title:"Iframe",icon:"el-icon-position",type:"menu"},children:[{path:"https://v3.cn.vuejs.org",name:"vue3",meta:{title:"VUE 3",type:"iframe"}},{path:"https://element-plus.gitee.io",name:"elementplus",meta:{title:"Element Plus",type:"iframe"}}]},{name:"report",path:"/other/report",meta:{title:"报表数据",icon:"el-icon-document"},component:"other/report"}]}]},3744:function(e,t){t.Z=(e,t)=>{const a=e.__vccOpts||e;for(const[i,l]of t)a[i]=l;return a}},2515:function(e,t,a){a.r(t),a.d(t,{default:function(){return T}});var i=a(6252),l=a(9963),s=a(2262),o=a(2201),n=a(1348),r=a(7247),u=a(8067),m=a(4451);const c=e=>((0,i.dD)("data-v-314ad444"),e=e(),(0,i.Cn)(),e),h={class:"login_bg"},p=c((()=>(0,i._)("div",{class:"login_adv",style:{"background-image":"url(img/login_left_banner.jpg)"}},[(0,i._)("div",{class:"login_adv__title"},[(0,i._)("h2",null,"WLADMIN"),(0,i._)("h4",null,"管理系统")]),(0,i._)("div",{class:"login_adv__mask"})],-1))),d={class:"login_main"},f={class:"login-form"},v=c((()=>(0,i._)("div",{class:"login-header"},[(0,i._)("div",{class:"logo"},[(0,i._)("img",{alt:"WLADMIN",src:"img/logo.png"}),(0,i._)("label",null,"WLADMIN")]),(0,i._)("h1",null,"用户登录")],-1)));var g={__name:"index",setup(e){const{keepAlive:t}=(0,u.Z)(),a=(0,o.tv)(),c=(0,s.iH)(null),g=(0,s.iH)(!1),_=(0,s.qj)({account:"admin",password:"123456"});(0,i.wF)((()=>{r.Z.removeToken(),r.Z.removeUserInfo(),r.Z.removeMenu(),t.clearKeepLive()}));const w=(0,s.qj)({account:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}),T=async()=>{var e=await c.value.validate().catch((()=>{}));if(!e)return!1;g.value=!0;let t={userId:"1",userName:"admin"};r.Z.setToken("123456"),r.Z.setUserInfo(t);let i=m.testMenu;if(0==i.length)return this.islogin=!1,this.$alert("当前用户无任何菜单权限，请联系系统管理员","无权限访问",{type:"error",center:!0}),!1;r.Z.setMenu(i),a.replace({path:"/"}),n.z8.success("登录成功"),g.value=!1};return(e,t)=>{const a=(0,i.up)("el-input"),s=(0,i.up)("el-form-item"),o=(0,i.up)("el-button"),n=(0,i.up)("el-form");return(0,i.wg)(),(0,i.iD)("div",h,[p,(0,i._)("div",d,[(0,i._)("div",f,[v,(0,i.Wm)(n,{ref_key:"loginForm",ref:c,model:_,rules:w,"label-width":"0",size:"large"},{default:(0,i.w5)((()=>[(0,i.Wm)(s,{prop:"account"},{default:(0,i.w5)((()=>[(0,i.Wm)(a,{modelValue:_.account,"onUpdate:modelValue":t[0]||(t[0]=e=>_.account=e),"prefix-icon":"el-icon-user",clearable:"",placeholder:"用户名",onKeyup:(0,l.D2)(T,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),(0,i.Wm)(s,{prop:"password"},{default:(0,i.w5)((()=>[(0,i.Wm)(a,{modelValue:_.password,"onUpdate:modelValue":t[1]||(t[1]=e=>_.password=e),"prefix-icon":"el-icon-lock",clearable:"","show-password":"",placeholder:"密码",onKeyup:(0,l.D2)(T,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),(0,i.Wm)(s,null,{default:(0,i.w5)((()=>[(0,i.Wm)(o,{type:"primary",style:{width:"100%"},loading:g.value,round:"",onClick:T},{default:(0,i.w5)((()=>[(0,i.Uk)("登录")])),_:1},8,["loading"])])),_:1})])),_:1},8,["model","rules"])])])])}}},_=a(3744);const w=(0,_.Z)(g,[["__scopeId","data-v-314ad444"]]);var T=w}}]);