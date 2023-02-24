<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @close="bgCancel()" title="PLC information" width="30%">
                <el-table :data="plcTable" :default-sort="{ prop: 'plcId', order: 'descending' }" :cell-class-name="statusCell" style="width: 100%">
                    <el-table-column label="Id" prop="plcId" />
                    <el-table-column label="Name" prop="name" />
                    <el-table-column align="center" label="info" prop="info">
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
        <div id='routeContioner'>
            <div class="scanDiv">

                    <div style="display:inline-block;left:0;width: 100px;height: 100%;"><span>产品编码:</span>
                    <!-- <div class="ml-3 w-35 text-gray-600 inline-flex items-center"><span>产品编码</span> -->
                </div>
                <!-- <el-input v-model="scanInput" :autofocus="true" @keyup.enter.native="scanSubmit()" style="display:inline;" -->
                <el-input v-model="scanInput" v-focus @keyup.enter.native="scanSubmit()" style="display:inline;"
                    size="large"></el-input>
                <div style="display:inline-block;right: 0;width: 200px;height: 100%;">
                    <el-button size="large" style="margin-left: 30px;">确认</el-button></div>
                    


            </div>
            <div class="infoDescription">
                <el-descriptions title="Produc Information" :column="1" border v-model="infosDes">
                    <el-descriptions-item label="Product label" label-align="right" align="center"
                        label-class-name="productLabel" class-name="my-content" width="150px">{{infosDes.productLabel}}</el-descriptions-item>
                    <el-descriptions-item label="Product family" label-align="right" 
                        align="center">{{infosDes.productFamily}}</el-descriptions-item>
                    <el-descriptions-item label="Product recipe" label-align="right" 
                        align="center">{{infosDes.productRecipe}}</el-descriptions-item>
                    <el-descriptions-item label="Last update time" label-align="right" align="center">
                        <el-tag size="small">{{ infosDes.lastUpdateTime }}</el-tag>
                    </el-descriptions-item>
                    >
                </el-descriptions>

                <div>
                    <el-button type="primary" :icon="Edit" @click="" >More Logs</el-button>
                    <el-button type="primary" :icon="Edit" @click="" >Rework</el-button>
                </div>
            </div>
            <div class="statusTable">
                <el-table :data="filterTableData" :default-sort="{ prop: 'process', order: 'descending' }" :cell-class-name="statusCell" style="width: 100%">
                    <el-table-column label="Process" prop="process" />
                    <el-table-column label="Status" prop="status" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:180px;">
                                <el-button type="primary" :icon="Edit" @click="dialogVisible = true;tableEdit( scope.row)" >click to check</el-button>
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
import router from '@/router';
import { useMounted } from '@vueuse/core';
const scanInput = ref('')
const scanSubmit = () => {
    //提交scanInput的内容
    console.log("sacnSubmit" + scanInput.value);
    //如果提交失败就清空，不然保留，算了还是一直保留吧
    scanInput.value = ''
}
// 注册一个全局自定义指令 `v-focus`
const vFocus = {
  mounted(el:any) {
    // 获取input，并调用其focus()方法
    el.querySelector('input').focus()
  }
}


const dialogCancel = () => {
    console.log("two methods is ok");
}



let dialogVisible = ref(false)
let plcTable:plcInfos[] = reactive([])

interface User {
    process: string
    status: string
    parameter: plcInfos[]
}
interface plcInfos{
    plcId:string
    name:string
    info:string
}
const tableEdit = ( row: User) => {
    console.log("edit");
    console.log(row.parameter[0].info);
    console.log(row.parameter);
    
    
    plcTable=row.parameter
    //打开弹窗，显示信息
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
            data.status.toLowerCase().includes(search.value.toLowerCase())
    )
)
const statusCell=({
  row,
  rowIndex,
  column,
  columnIndex,
}: {
  row: User
  rowIndex: number
  column:any
  columnIndex:number
})=>{
    if(columnIndex===1&&row.status==='pass'){
        return "passCell"
    }
    else if(columnIndex===1&&row.status==='NG'){
        return 'ngCell'
    }
    else if(columnIndex===1&&row.status==='rework'){
        
        return "reworkCell"
    }
    return ''
}

let tableData = reactive(
    [
        {
            process: 'station1',
            status: 'pass',
            parameter: [{
                plcId:'plc1',
                name:'12',
                info:'324',
            }],
        },
        {
            process: 'station3',
            status: 'NG',
            parameter: [{
                plcId:'plc1',
                name:'12',
                info:'324',
            }],
        },
        {
            process: 'station2',
            status: 'rework',
            parameter: [{
                plcId:'plc1',
                name:'12',
                info:'324',
            },{
                plcId:'plc3',
                name:'12',
                info:'324',
            },{
                plcId:'plc2',
                name:'12',
                info:'324',
            },],
        },
        {
            process: 'station4',
            status: 'pass',
            parameter: [{
                plcId:'plc1',
                name:'12',
                info:'324',
            }],
        },
    ]
)

//<------------description----->
let infosDes = ref({
    productLabel: '产品编号',
    productFamily: '产品系列',
    productRecipe: '产品配方',
    lastUpdateTime: 'log上次更新时间',
})
</script>

<style>
#routeContioner {
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    background-color: aliceblue;
    border-radius: 20px;
}

.scanDiv {
    height: 50px;
    margin: auto;
    padding-top: 40px;
    left: 0px;
    right: 0px;
    /* width: 800px; */
    align-items: center;
    /* background-color: blueviolet; */
    /* display: inline; */
}

.statusTable {
    /* position: fixed; */
    position: absolute;
    width: 800px;
    right: 100px;
    top: 200px;
}

.infoDescription {
    /* position: fixed; */
    position: absolute;
    top: 200px;
    left: 100px;
    width: 400px;
}

.my-label {
    background: var(--el-color-success-light-9);
}

.my-content {
    background: var(--el-color-danger-light-9);
}

.passCell{
    color: blue;
    background-color: rgb(148, 255, 127);
    
}
.ngCell{
    background-color: rgb(255, 127, 133);
}
.reworkCell{
    background-color: rgb(232, 255, 127);
}
</style>