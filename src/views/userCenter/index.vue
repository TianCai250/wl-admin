<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="8">
                <el-card shadow="never">
                    <div class="user-info">
                        <div class="user-info-top">
                            <el-avatar :size="80" src="img/avatar.jpg"></el-avatar>
                            <h2>{{ form.name || '-' }}</h2>
                            <p>{{ form.summary || '无签名' }}</p>
                            <el-button type="primary" round icon="el-icon-collection-tag" size="large">{{ form.account }}</el-button>
                        </div>
                        <div class="user-info-main">
                            <ul>
                                <li>
                                    <label>
                                        <el-icon><el-icon-user /></el-icon>
                                    </label>
                                    <span>{{ form.name }}</span>
                                </li>
                                <li>
                                    <label>
                                        <el-icon><el-icon-male /></el-icon>
                                    </label>
                                    <span>{{ form.sex }}</span>
                                </li>
                                <li>
                                    <label>
                                        <el-icon><el-icon-location /></el-icon>
                                    </label>
                                    <span>中国</span>
                                </li>
                                <li>
                                    <label>
                                        <el-icon><el-icon-coin /></el-icon>
                                    </label>
                                    <span>{{ form.role.length > 0 ? form.role[0] : '' }}</span>
                                </li>
                                <li>
                                    <label>
                                        <el-icon><el-icon-timer /></el-icon>
                                    </label>
                                    <span>{{ form.lastTime }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="user-info-bottom">
                            <h2>当前账号权限</h2>
                            <el-space wrap>
                                <el-tag v-for="(it, index) in form.role" :key="index">{{ it }}</el-tag>
                            </el-space>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="16">
                <el-card shadow="never">
                    <el-tabs tab-position="top">
                        <el-tab-pane label="个人信息">
                            <el-form :modal="form" label-width="80px" style="width: 460px; margin-top: 20px">
                                <el-form-item label="账号">
                                    <el-input v-model="form.account" disabled></el-input>
                                    <div class="el-form-item-msg">账号信息用于登录，系统不允许修改</div>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-select v-model="form.sex" placeholder="请选择">
                                        <el-option label="保密" value="保密"></el-option>
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="个性签名">
                                    <el-input v-model="form.summary" type="textarea"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="saveBasic">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
    id: 0,
    account: 'admin',
    user: '1528674592@qq.com',
    name: 'wl',
    sex: '男',
    summary: '富贵险中求',
    role: ['管理员'],
    lastTime: '2022-12-12 12:12:12'
})

const saveBasic = () => {}

</script>

<style scoped>
.el-card {
    margin-bottom: 15px;
}
.activity-item {
    font-size: 13px;
    color: #999;
    display: flex;
    align-items: center;
}
.activity-item label {
    color: #333;
    margin-right: 10px;
}
.activity-item .el-avatar {
    margin-right: 10px;
}
.activity-item .el-tag {
    margin-right: 10px;
}
</style>
