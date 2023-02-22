<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @close="bgCancel()" title="Add Process Route" width="30%">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="Activity zone">
                        <el-select v-model="form.id" placeholder="please select your station">

                            <el-option v-for="item in stationOptions" :key="item.stations" :value="item.stations" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Activity name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="calagory">
                        <el-radio-group v-model="form.calagory">
                            <el-radio label="only storge" value="chonse1" />
                            <el-radio label="check and storage" value="chonse2" />
                        </el-radio-group>
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
        <div id="routeContioner">
            <div class="routeTable">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="id" prop="id" />
                    <el-table-column label="Name" prop="name" />
                    <el-table-column label="calagory" prop="calagory" />
                    <el-table-column label="storageChart" prop="storageChart" />
                    <el-table-column align="right">
                        <template #header>
                            <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                item</el-button>
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:180px;">
                                <el-button type="primary" :icon="Edit" />
                                <el-button type="primary" :icon="Share" />
                                <el-button type="danger" :icon="Delete" @click="tableDelete(scope.$index, scope.row)" />
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="routesAction">
                <el-button type="primary" @click="routerSubmit()">submit</el-button>
                <el-button type="primary" @click="routerCancel()">cancel</el-button>
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
import router from '@/router';
import { useRoute } from 'vue-router';
import { stringLiteral } from '@babel/types';
import request from '../../request/request'
import Process_Route from './Process_Route.vue';
import { method } from 'lodash';
//<--------------获取id-------->
var id = ref()
const getId = () => {
    const route = useRoute();
    id = ref(route.query.name1);
    console.log("name:" + route.query.name1);
    console.log("id:" + id.value);
}
getId()
//<-----------Router Actions------>
const routerSubmit=()=>{
    // request.post(
    //    '/recipe/edit/submit',
    //     tableData
    // ).then(res=>{
    //     router.push('Process_Route')  
    // },(error)=>{
    //     console.log("submit fail");
    // })
    router.push('Process_Route')   
}
const routerCancel=()=>{    
    router.push('Process_Route')   
}


//<-----------添加新的station------>
// do not use same name with ref
const form = reactive({
    id: '',
    name: '',
    calagory: 'only',
    storageChart: [{
        plcName: '',
        min: 0,
        length: 0
    }]
})

const dialogConfirm = (form: any) => {
    console.log("form confirm");
    const station = {
        id: form.id,
        name: form.name,
        calagory: form.calagory,
        storageChart: form.storageChart,
    }
    tableData.push(station)
}
const dialogCancel = () => {
    console.log("two methods is ok");
}
//获取所有的staions，用于新增站点
const getStations = () => {
    if (localStorage.getItem("stations") === null) {
        request.post("/routeEdit", id).then(res => {
            stationOptions = res.data
            localStorage.setItem("stations", JSON.stringify(res.data))
        })
    } else {
        stationOptions = JSON.parse(localStorage.getItem("stations") || '{}')
    }
}

let stationOptions = ref([{
    stations: 'station1',
},{
    stations: 'station2',
}, {
    stations: 'station3',
}, {
    stations: 'station4',
}, {
    stations: 'station5',
}, {
    stations: 'station6',
},
])



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
    // dialogVisible=ref(true)
    console.log("two methods is ok");
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(10px)'
}
const bgCancel = () => {
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(0px)'
}



const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

interface address {
    plcName: string
    min: number
    length: number
}
//table的内容
let tableData = reactive(
    [
        {
            name: 'Tom',
            id: 'a-1',
            calagory: 'only',
            storageChart: [{
                plcName: 'plc1',
                min: 1,
                length: 2
            }, {
                plcName: 'plc2',
                min: 2,
                length: 3
            }]
        },
        {
            name: 'Tom',
            id: 'a-3',
            calagory: 'only',
            storageChart: [{
                plcName: 'plc1',
                min: 1,
                length: 2
            }, {
                plcName: 'plc2',
                min: 2,
                length: 3
            }]
        },
        {
            name: 'Tom',
            id: 'a-2',
            calagory: 'only',
            storageChart: [{
                plcName: 'plc1',
                min: 1,
                length: 2
            }, {
                plcName: 'plc2',
                min: 2,
                length: 3
            }]
        },
        {
            name: 'Tom',
            id: 'a-1-2',
            calagory: 'only',
            storageChart: [{
                plcName: 'plc1',
                min: 1,
                length: 2
            }, {
                plcName: 'plc2',
                min: 2,
                length: 3
            }]
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