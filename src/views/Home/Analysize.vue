<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @close="bgCancel()" title="Add Process Route" width="30%">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="Activity name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="Activity name">
                        <el-input v-model="form.date" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false; dialogCancel()">Cancel</el-button>
                        <el-button type="primary" @click="dialogVisible = false; dialogConfirm(form)">
                            Confirm
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div id='routeContioner'>
            <div class="routeTable">
                <el-table :data="filterTableData" style="width: 100%">
                    <el-table-column label="Date" prop="date" />
                    <el-table-column label="Name" prop="name" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                            <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                item</el-button>
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:180px;">
                                <el-button type="primary" :icon="Edit" @click="tableEdit(scope.$index, scope.row)" />
                                <el-button type="primary" :icon="Share" />
                                <el-button type="danger" :icon="Delete" @click="tableDelete(scope.$index, scope.row)" />
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import {
    ArrowLeft,
    ArrowRight,
    Delete,
    Edit,
    Share,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '../../request/request'
import router from '@/router';

// do not use same name with ref
const form = reactive({
    name: '',
    date: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const dialogConfirm = (form: any) => {
    console.log("form confirm");
    const user = {
        name: form.name,
        date: form.date,
        address: ''
    }
    tableData.push(user)
}
const dialogCancel = () => {
    console.log("two methods is ok");
}



let dialogVisible = ref(false)
interface User {
    date: string
    name: string
    address: string
}
const tableDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
        'This routing will be deleted',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            tableData.splice(index,1)
            console.log("sccess delete" + row);
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}
const tableAdd = () => {
    console.log("two methods is ok");
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(10px)'
}
const tableEdit = (index: number, row: User) => {
    console.log("edit");
    router.push({
        path: 'Process_RouteEdit',
        query: { name1: row.name }

    })
}
const bgCancel = () => {
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(0px)'
}



const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

let tableData = reactive(
    [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Morgan',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Jessy',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
)
</script>

<style scoped>
#routeContioner {
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    background-color: aliceblue;
    border-radius: 20px;
}
</style>