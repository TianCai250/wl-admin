<template>
    <div class="login_bg">
        <div class="login_adv" style="background-image: url(img/login_left_banner.jpg)">
            <div class="login_adv__title">
                <h2>WLADMIN</h2>
                <h4>管理系统</h4>
            </div>
            <div class="login_adv__mask"></div>
        </div>
        <div class="login_main">
            <div class="login-form">
                <div class="login-header">
                    <div class="logo">
                        <img alt="WLADMIN" src="img/logo.png" />
                        <label>WLADMIN</label>
                    </div>
                    <h1>用户登录</h1>
                </div>
                <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="0" size="large">
                    <el-form-item prop="account">
                        <el-input v-model="ruleForm.account" prefix-icon="el-icon-user" clearable placeholder="用户名" @keyup.enter="login"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" clearable show-password placeholder="密码" @keyup.enter="login"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" :loading="islogin" round @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import storage from '@/utils/storage';
import usestore from '@/store'
import { testMenu } from './testMenu';
const { keepAlive } = usestore()

const router = useRouter()

const loginForm = ref(null);
const islogin = ref(false);

const ruleForm = reactive({
    account: 'admin',
    password: '123456',
});

onBeforeMount(() => {
    storage.removeToken();
    storage.removeUserInfo();
    storage.removeMenu();
    keepAlive.clearKeepLive();
})

const rules = reactive({
    account: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
});

const login = async () => {
    console.log(234);
    var validate = await loginForm.value.validate().catch(() => {});
    if (!validate) {
        return false;
    }
    islogin.value = true;

    // 获取用户信息
    let userInfo = {
        userId: '1',
        userName: 'admin',
    };
    storage.setToken('123456');
    storage.setUserInfo(userInfo);

    //获取菜单
    let menu = testMenu;
    if (menu.length == 0) {
        this.islogin = false;
        this.$alert('当前用户无任何菜单权限，请联系系统管理员', '无权限访问', {
            type: 'error',
            center: true,
        });
        return false;
    }
    storage.setMenu(menu)
    router.replace({
        path: '/',
    });
    ElMessage.success('登录成功');
    islogin.value = false;
};
</script>

<style scoped>
.login_bg {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
}
.login_adv {
    width: 33.33333%;
    background-color: #555;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
}
.login_adv__title {
    color: #fff;
    padding: 40px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 2;
}
.login_adv__title h2 {
    font-size: 40px;
}
.login_adv__title h4 {
    font-size: 18px;
    margin-top: 10px;
    font-weight: normal;
}
.login_adv__title p {
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.6);
}
.login_adv__title div {
    margin-top: 10px;
    display: flex;
    align-items: center;
}
.login_adv__title div span {
    margin-right: 15px;
}
.login_adv__title div i {
    font-size: 40px;
}
.login_adv__title div i.add {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
}
.login_adv__bottom {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    color: #fff;
    padding: 40px;
    background-image: linear-gradient(transparent, #000);
    z-index: 3;
}
.login_adv__mask {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.login_main {
    flex: 1;
    overflow: auto;
    display: flex;
}
.login-form {
    width: 400px;
    margin: auto;
    padding: 20px 0;
}
.login-header {
    margin-bottom: 20px;
}
.login-header .logo {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}
.login-header .logo img {
    width: 40px;
    height: 40px;
    vertical-align: bottom;
    margin-right: 10px;
}
.login-header .logo label {
    font-size: 26px;
    font-weight: bold;
}
.login-oauth {
    display: flex;
    justify-content: space-around;
}
.login-form .el-divider {
    margin-top: 40px;
}

.login-form {
}
.login-form:deep(.el-tabs) .el-tabs__header {
    margin-bottom: 25px;
}
.login-form:deep(.el-tabs) .el-tabs__header .el-tabs__item {
    font-size: 14px;
}

.login-form:deep(.login-forgot) {
    text-align: right;
}
.login-form:deep(.login-forgot) a {
    color: var(--el-color-primary);
}
.login-form:deep(.login-forgot) a:hover {
    color: var(--el-color-primary-light-3);
}
.login-form:deep(.login-reg) {
    font-size: 14px;
    color: var(--el-text-color-primary);
}
.login-form:deep(.login-reg) a {
    color: var(--el-color-primary);
}
.login-form:deep(.login-reg) a:hover {
    color: var(--el-color-primary-light-3);
}

.login_config {
    position: absolute;
    top: 20px;
    right: 20px;
}

.login-form:deep(.login-msg-yzm) {
    display: flex;
    width: 100%;
}
.login-form:deep(.login-msg-yzm) .el-button {
    margin-left: 10px;
    --el-button-size: 42px;
}

.qrCodeLogin {
    text-align: center;
    position: relative;
    padding: 20px 0;
}
.qrCodeLogin img.qrCode {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
}
.qrCodeLogin p.msg {
    margin-top: 15px;
}
.qrCodeLogin .qrCodeLogin-result {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background: var(--el-mask-color);
}

@media (max-width: 1200px) {
    .login-form {
        width: 340px;
    }
}
@media (max-width: 1000px) {
    .login_main {
        display: block;
    }
    .login_main .login_config {
        position: static;
        padding: 20px 20px 0 20px;
        text-align: right;
    }
    .login-form {
        width: 100%;
        padding: 20px 40px;
    }
    .login_adv {
        display: none;
    }
}
</style>
