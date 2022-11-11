<template>
    <el-container>
        <el-header>
            <div class="left-panel">
                <div class="right-panel-search">
                    <el-form-item label="查询关键字" class="left-panel_label">
                        <el-input v-model="pageSearch.key" clearable placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="searchData">查询</el-button>
                </div>
            </div>
        </el-header>
        <el-main class="nopadding">
            <template v-if="tableData.length">
                <el-table class="page_table" ref="multipleTableRef" :data="tableData" style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index" align="center" label="序号" width="55"></el-table-column>
                    <template v-bind:key="item.prop" v-for="item in tableLabel">
                        <el-table-column :label="item.label" :prop="item.prop" align="center" :min-width="item.width" v-if="item.display" show-overflow-tooltip>
                            <template #default="scope"><div v-html="item.propFormat(scope.row[item.prop])"></div></template>
                        </el-table-column>
                    </template>
                    <el-table-column fixed="right" label="操作" width="135" align="center">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click.stop="editItem(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-block">
                    <el-pagination
                        background
                        style="width: max-content"
                        class="pagination-box"
                        @size-change="changePageSize"
                        @current-change="changePage"
                        :current-page="pagingData.currentPage"
                        :page-sizes="[10, 20, 30, 50, 100]"
                        :page-size="pagingData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagingData.pageTotal"
                    ></el-pagination>
                </div>
            </template>
            <template v-else>
                <el-empty description="暂无数据" :image-size="100"></el-empty>
            </template>
        </el-main>
    </el-container>
</template>
<script setup>
import { reactive, ref } from 'vue';

const pageSearch = reactive({
    key: '',
});

const pagingData = reactive({
    currentPage: 1, // 页码
    pageSize: 10, // 分页量
    pageTotal: 1, // 总页码
});

const tableData = ref([]);
const tableLabel = [
    {
        index: 1,
        label: '姓名',
        prop: 'name',
        width: '120',
        propFormat(value) {
            return value || '-';
        },
        display: true,
    },
    {
        index: 2,
        label: '年龄',
        prop: 'age',
        width: '120',
        propFormat(value) {
            return value || '-';
        },
        display: true,
    },
    {
        index: 3,
        label: '工作',
        prop: 'work',
        width: '120',
        propFormat(value) {
            return value || '-';
        },
        display: true,
    },
    {
        index: 4,
        label: '爱好',
        prop: 'hobby',
        width: '120',
        propFormat(value) {
            return value || '-';
        },
        display: true,
    },
];

const searchData = () => {
    tableData.value = [
        {
            name: 'wl',
            age: 24,
            work: '前端开发',
            hobby: '游戏',
        },
    ];
};
const editItem = row => {
    console.log(row);
};
// 修改分页数量
const changePageSize = index => {
    pagingData.pageSize = index;
    searchData();
};
// 切换分页
const changePage = index => {
    pagingData.currentPage = index;
    searchData();
};
</script>
<style scoped>
.page_pop {
    width: 50%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 5%;
    position: relative;
}

.edit-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.page_pop_title {
    font-size: 18px;
    margin-bottom: 15px;
}

.page_pop_button {
    text-align: center;
}

.user_tag_list {
    background-color: #e7f0f9;
    color: #409eff;
    padding: 0px 5px;
    border-radius: 5px;
    margin: 5px;
    display: inline-block;
    border: 1px solid #d8ebff;
}

.page_table_drop {
    padding: 15px 35px;
    /*background-color: #f8f8f8;*/
    margin: 0 10px;
}

.page_table_drop_title {
    font-size: 16px;
    margin-bottom: 10px;
}
</style>
