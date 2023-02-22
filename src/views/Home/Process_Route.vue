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
            <div>
                <span>Recipes</span>
            </div>
            <div class="routeTable">
                <el-table :data="filterTableData" style="width: 100%">
                    <el-table-column label="Name" prop="name" />
                    <el-table-column label="Date" prop="date" />
                    <el-table-column label="Remark" prop="remark" />
                    <el-table-column>
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                            <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="AddLocation">Add
                                recipe</el-button>
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:260px;">
                                <el-button type="primary" :icon="Edit" @click="tableEdit(scope.$index, scope.row)" >Edit</el-button>
                                <el-button type="primary" :icon="CopyDocument" @click="tableCopy(scope.$index, scope.row)">Copy</el-button>
                                <el-button type="danger" :icon="Delete" @click="tableDelete(scope.$index, scope.row)" >Delete</el-button>
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
    CopyDocument,
    AddLocation,
    Delete,
    Edit,
    Share,
} from '@element-plus/icons-vue'
import { dateEquals, datePickTypes, ElMessage, ElMessageBox } from 'element-plus'
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
        remark: ""
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
    remark: string
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
const tableCopy = (index: number, row: User) => {
    let aData = new Date();    
    let dateValue = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
    console.log(dateValue)
    let temp={
        name:row.name+'_copy',
        // date:Date.now().toString(),
        date:dateValue,
        remark:row.remark
    }
    tableData.push(temp)
}
const tableEdit = (index: number, row: User) => {
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
            remark: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            remark: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Morgan',
            remark: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Jessy',
            remark: 'No. 189, Grove St, Los Angeles',
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
.routeTable{
    padding-top: 80px;
}
</style>