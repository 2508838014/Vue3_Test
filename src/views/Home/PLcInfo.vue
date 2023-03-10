<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @close="bgCancel(), formCancel(plcFormRef)" title="PLC information"
                width="30%">
                <el-form ref="plcFormRef" :model="plcForm" :rules="rules" label-width="120px">
                    <el-form-item label="plcCode" prop="plcCode">
                        <el-input v-model="plcForm.plcCode" />
                    </el-form-item>
                    <el-form-item label="IP" prop="ip">
                        <el-input v-model="plcForm.ip" />
                    </el-form-item>
                    <el-form-item label="port" prop="port">
                        <el-input v-model.number="plcForm.port" />
                    </el-form-item>
                    <el-form-item label="phoneNo" prop="rackNo">
                        <el-input v-model.number="plcForm.rackNo" />
                    </el-form-item>
                    <el-form-item label="slotNo" prop="slotNo">
                        <el-input v-model.number="plcForm.slotNo" />
                    </el-form-item>
                    <el-form-item label="describe" prop="describe">
                        <el-input v-model="plcForm.describe" />
                    </el-form-item>
                    <el-form-item label="storageChart">
                        <el-table :data="plcForm.variable">
                            <el-table-column label="Type" prop="type">
                                <template #default="scope">
                                    <el-select v-model="plcForm.variable[scope.$index].type">
                                        <el-option v-for="item in typeOptions" :key="item.types"
                                            :value="item.types"></el-option>
                                    </el-select>

                                </template>
                            </el-table-column>
                            <el-table-column label="address" prop="address">
                                <template #default="scope">
                                    <el-input v-model="plcForm.variable[scope.$index].address"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="offset" prop="offset">
                                <template #default="scope">
                                    <el-input v-model.number="plcForm.variable[scope.$index].offset"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="default" prop="default">
                                <template #default="scope">
                                    <el-input v-model.number="plcForm.variable[scope.$index].default"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column label="Action" align="right" style="width: 280px;">
                                <template #default="scope">
                                    <el-button-group style="width:180px;">
                                        <el-button type="primary" :icon="Share"
                                            @click="plcInfoAdd(scope.$index, scope.row)" />
                                        <el-button type="danger" :icon="Delete"
                                            @click="plcInfoDelete(scope.$index, scope.row)" />
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                        <input id="plcInfoImportBtn" class="file" type="file" @click="plcInfoImport()" accept="text/csv" />
                    </el-form-item>

                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false; dialogCancel()">Cancel</el-button>
                        <el-button type="primary" @click="dialogConfirm(plcFormRef, plcForm)">
                            Confirm
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div id='routeContioner'>
            <div style="padding:20px 30px 10px 30px">
                <h3>Plc info</h3>
            </div>
            <div id="table">
                <el-table :data="tableShowData" style="width: 100%" border="true">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <h3>Variable set</h3>
                                <el-table :data="props.row.variable">
                                    <el-table-column label="type" prop="type" />
                                    <el-table-column label="address" prop="address" />
                                    <el-table-column label="offset" prop="offset" />
                                    <el-table-column label="default" prop="default" />
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="PlcCode" prop="plcCode" />
                    <el-table-column label="IP" prop="ip" />
                    <el-table-column label="Port" prop="port" />
                    <el-table-column label="RackNo" prop="rackNo" />
                    <el-table-column label="SlotNo" prop="slotNo" />
                    <el-table-column label="CreateTime" prop="createTime" />
                    <el-table-column label="UpdateTime" prop="updateTime" />
                    <el-table-column label="Describe" prop="describe" />

                    <el-table-column>
                        <template #header>
                            <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                item</el-button>
                        </template>
                        <template #default="scope">
                            <el-button-group style="width:180px;">
                                <el-button type="primary" :icon="Edit"
                                    @click="dialogVisible = true; tableEdit(scope.$index, scope.row)" />
                                <el-button type="danger" :icon="Delete" @click="tableDelect(scope.$index, scope.row)" />
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="width: 80%;margin-left: 10%;">
                <input id="plcInfoImportBtn" type="file" @click="plcInfoImport()" accept="text/csv" />
                <el-pagination v-model:current-page="currentPage" :small="small" :background="background"
                    layout="total, prev, pager, next, jumper" :total="totalNum" @current-change="handleCurrentChange" />
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
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import request from '../../request/request'

const currentPage = ref(1)
let totalNum = ref(0)
const pageSize = 10
const small = ref(false)
const background = ref(false)
let tableShowData = ref()
const handleCurrentChange = (val: number) => {
    // tableShowData.value=tableData.slice(Math.max((val-1)*pageSize-1,0),pageSize)
    tableShowData.value = tableData.slice(Math.max((val - 1) * pageSize, 0), Math.min(val * pageSize, tableData.length))
    console.log(`current page: ${val}`)
}


const bgCancel = () => {
    // popupbg!.style.filter = 'blur(0px)'
}
const changeNow = () => {
    $forceUpdate()
}
const plcFormRef = ref<FormInstance>()
const formCancel = (plcFormRef: FormInstance | undefined) => {
    plcFormRef?.resetFields()
}
const validatePort = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
    } else {
        callback()
    }
}
const validateRackNo = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
    } else {
        callback()
    }
}
const validateSlotNo = (rule: any, value: any, callback: any) => {
    if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules>({
    port: [{ required: true, validator: validatePort, trigger: 'blur' }],
    ip: [{ required: true, trigger: 'blur' }],
    plcCode: [{ required: true, trigger: 'blur' }],
    describe: [{ required: true, trigger: 'blur' }],
    rackNo: [{ required: true, validator: validateRackNo, trigger: 'blur' }],
    slotNo: [{ required: true, validator: validateSlotNo, trigger: 'blur' }],
})


let dialogVisible = ref(false)
let tableData: plcInfo[] = reactive([])
// let plcForm:plcInfoUpdate = reactive<plcInfoUpdate>({
//     id: -1, plcCode: "", ip: "", port: 80, rackNo: 0, slotNo: 0,  describe: ""})
let plcForm = ref<plcInfoUpdate>({
    id: -1, plcCode: "", ip: "", port: 80, rackNo: 0, slotNo: 0, describe: "", variable: []
})


interface plcInfo {
    id: number
    plcCode: string
    ip: string
    port: number
    rackNo: number
    slotNo: number
    createTime: string
    updateTime: string
    describe: string
    variable: myvariable[]
}
interface plcInfoUpdate {
    id: number
    plcCode: string
    ip: string
    port: number
    rackNo: number
    slotNo: number
    describe: string
    variable: myvariable[]
}
interface myvariable {
    type: string
    address: string
    offset: number
    default: string
}

const tableEdit = (index: number, row: plcInfo) => {
    plcForm.value = {
        id: row.id,
        plcCode: row.plcCode,
        ip: row.ip,
        port: row.port,
        rackNo: row.rackNo,
        slotNo: row.slotNo,
        describe: row.describe,
        variable: []
    }
}
const tableAdd = () => {
    plcForm.value = {
        id: -1, plcCode: "", ip: "", port: 80, rackNo: 0, slotNo: 0, describe: "", variable: [{ type: "", address: "",offset: 0,default: "",}]
    }
}
const tableDelect = (index: number, row: plcInfo) => {
    ElMessageBox.confirm(
        'This routing will be deleted',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    ).then(() => {
        // request.post("/Login/CheckLoginUsers", row.id).then(res => {
        //     if (res.status == 200) {
        //         resInfo = res.data
        //         if (resInfo.success) {
        //             ElMessage({
        //                 message: 'Delect succeeded.',
        //                 type: 'success',
        //             })
        //             tableData = resInfo.content
        //         } else {
        //             ElMessage.error(resInfo.message)
        //         }
        //     }
        // }, (error) => {
        //     ElMessage.error('please check the network, etc.')
        // })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: 'Delete canceled',
        })
    })
}

const dialogConfirm = (plcFormRef: FormInstance | undefined, form: plcInfoUpdate) => {
    if (!plcFormRef) return
    plcFormRef.validate((valid) => {
        if (valid) {
            // request.post("/Login/CheckLoginUsers", form).then(res => {
            //     if (res.status == 200) {
            //         resInfo = res.data
            //         if (resInfo.success) {
            //             ElMessage({
            //                 message: 'Update succeeded.',
            //                 type: 'success',
            //             })
            //             tableData = resInfo.content
            //         } else {
            //             ElMessage.error(resInfo.message)
            //         }
            //     }
            // }, (error) => {
            //     ElMessage.error('please check the network, etc.')
            // })
            dialogVisible.value = false;
        } else {
            ElMessage.error('Please check the input')
        }
    })
}
const dialogCancel = () => {
}





interface resData {
    message: string,
    success: Boolean,
    content: any,
    errorCode: number
}
let resInfo: resData
const LoadPage = () => {
    // request.post("/Login/CheckLoginUsers").then(res => {
    //     if (res.status == 200) {
    //       resInfo=res.data
    //       if(resInfo.success){
    //         tableData=resInfo.content
    //       }else{
    //         ElMessage.error(resInfo.message)
    //       }
    //     }
    //   }, (error) => {
    //     ElMessage.error('please check the network, etc.')
    //   })


    tableData =
        [{ "id": 1, "plcCode": "PLC1", "ip": "127.0.0.1", "port": 102, "rackNo": 1, "slotNo": 2, "createTime": "2023-02--06 14:12:04", "updateTime": "", "describe": "测试PLC1", "variable": [{ "type": "int", "address": "324", "offset": 123, "default": "default" }, { "type": "float", "address": "324", "offset": 123, "default": "default" }] },
        { "id": 2, "plcCode": "PLC2", "ip": "127.0.0.1", "port": 102, "rackNo": 2, "slotNo": 2, "createTime": "2023-02--06 14:13:15", "updateTime": "", "describe": "测试PLC2", "variable": [] },
        { "id": 3, "plcCode": "PLC3", "ip": "192.198.1.100", "port": 5055, "rackNo": 1, "slotNo": 1, "createTime": "2023-03--08 15:58:51", "updateTime": "", "describe": "测试", "variable": [] },
        ]
    totalNum.value = tableData.length
    tableShowData.value = tableData.slice(0, pageSize)
}
LoadPage()

let typeOptions = ref([{
    types: 'int',
}, {
    types: 'float',
}, {
    types: 'byte',
}, {
    types: 'string',
}, {
    types: 'station5',
}, {
    types: 'station6',
},
])
const plcInfoAdd = (index: number, row: myvariable) => {
    plcForm.value.variable.splice(index + 1, 0, {
        type: "",
    address: "",
    offset: 0,
    default: "",
        })
}
const plcInfoDelete = (index: number, row: myvariable) => {
    plcForm.value.variable.splice(index, 1)
}
const plcInfoImport = () => {
    var file1 = document.getElementById('plcInfoImportBtn');
    file1!.onchange = function () {
        var file = (<HTMLInputElement>file1).files![0];
        //读取为二进制
        var reader = new FileReader();
        reader.readAsText(file, 'utf-8');
        reader.onload = function () {
            var str = reader.result;
            if (str == null) {
                console.log("读取未空");

                return
            }

            var rows = (<string>str)!.split('\n');
            var clients = [];
            for (var i = 1; i < rows.length - 1; i++) {

                var row = rows[i].split(',');
                var client = {
                    type: row[0],
                    address: row[1],
                    offset: Number.parseInt(row[2]),
                    default: row[3],
                };
                plcForm.value.variable.push(client)
                clients.push(client);
            }
            //由对象转为JSON字符串
            console.log(JSON.stringify(clients));

            console.log(rows);

        }
    }

}
//<------------description----->


function $forceUpdate() {
    throw new Error('Function not implemented.');
}
</script>

<style>
#routeContioner {
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    background-color: aliceblue;
    border-radius: 20px;
}

#table {
    width: 80%;
    margin-left: 10%;
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

</style>