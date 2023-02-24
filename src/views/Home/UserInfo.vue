<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @open="bgOpen()" @close="bgCancel()" title="Add User" width="30%">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input v-model="form.password" />
                    </el-form-item>
                    <el-form-item label="level">
                        <el-input v-model="form.level" />
                    </el-form-item>
                    <el-form-item label="phoneNo">
                        <el-input v-model="form.phoneNo" />
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
            <div style="padding:20px 30px 10px 30px">
                <h3 >用户信息</h3>
            </div>
            <div class="routeTable">
                <span style="padding-left: 40px;"></span>
                <el-table :data="filterTableData" max-height="600px" style="width: 80%;margin-left: 10%;">
                    <el-table-column label="id" prop="id" />
                    <el-table-column label="password" prop="password" />
                    <el-table-column label="name" prop="name" />
                    <el-table-column label="level" prop="level" />
                    <el-table-column label="phoneNo" prop="phoneNo" />
                    <el-table-column >
                        <template #header>
                            
                            <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                item</el-button>
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:180px;">
                                <el-button type="primary" :icon="Edit" @click="dialogVisible = true;tableEdit(scope.$index, scope.row)" />
                                <el-button type="danger" :icon="Delete" @click="tableDelete(scope.$index, scope.row)" />
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="width: 80%;margin-left: 10%;">
                    <el-pagination
      v-model:current-page="currentPage"
      :small="small"
      :background="background"
      layout="total, prev, pager, next, jumper"
      :total="totalNum"
      @current-change="handleCurrentChange"
    />
                </div>
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

const currentPage = ref(4)
let totalNum=ref(400)
const small = ref(false)
const background = ref(false)
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}



// do not use same name with ref
let form = reactive({
    id:'',
    password:'',
    level:'',
    phoneNo:'',
    name: '',
})



const dialogConfirm = (form: any) => {
    console.log("form confirm");
    const user = {
        id:form.id,
        password:form.password,
        level:form.level,
        phoneNo:form.phoneNo,
        name: form.name,
    }
    tableData.push(user)
}
const dialogCancel = () => {
    console.log("two methods is ok");
}



let dialogVisible = ref(false)
interface User {
    id:string
    password:string
    level:string
    phoneNo:string
    name: string
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
}
const tableEdit = (index: number, row: User) => {
    console.log("edit");
    form=row
}
const bgOpen=()=>{
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(10px)'
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
            data.id.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

let tableData = reactive(
    [
        {
            id:'n00001',
            name:'zhangsan',
            password:'00001',

            level:'1',
            phoneNo: '12345123451',

        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
        },
        {
            id:'n00001',
            password:'00001',
            name:'zhangsan',

            level:'1',
            phoneNo: '12345123451',
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