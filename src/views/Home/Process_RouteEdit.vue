<template>
    <div style="height:100%;width: 100%;">
        <div>
            <el-dialog v-model="dialogVisible" @close="bgCancel()" title="Add Process Route" width="30%">
                <el-form id="myform" :model="form" label-width="120px">
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
                            <el-radio label="1">only storage</el-radio>
                            <el-radio label="check and storage" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="storageChart">
                        <el-table :data="form.storageChart">
                            <el-table-column label="plcname" prop="plcName">
                                <template #default="scope">
                                <el-select v-model="form.storageChart[ scope.$index].plcName">
                                    <el-option v-for="item in typeOptions" :key="item.types"
                                        :value="item.types"></el-option>
                                </el-select>
                                
                                </template>
                            </el-table-column>
                            <el-table-column label="plcname" prop="min" >
                            <template #default="scope">
                                <el-input v-model="form.storageChart[ scope.$index].min"></el-input>
                            </template>
                            </el-table-column>
                            <el-table-column label="plcname" prop="length" >
                                <template #default="scope">
                                <el-input v-model="form.storageChart[ scope.$index].length"></el-input>
                            </template>
                            </el-table-column>

                            <el-table-column label="Action" align="right" style="width: 280px;">
                            <template #default="scope">
                                <el-button-group style="width:180px;">
                                    <el-button type="primary" :icon="Share" @click="plcInfoAdd(scope.$index, scope.row)" />
                                    <el-button type="danger" :icon="Delete" @click="plcInfoDelete(scope.$index, scope.row)" />
                                </el-button-group>
                            </template>
                        </el-table-column>
                        </el-table>
                        <input id="plcInfoImportBtn" type="file" @click="plcInfoImport()" accept="text/csv" />
                        <el-upload
    ref="upload"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    accept="text/csv"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary" @click="plcInfoImport()">select file</el-button>
    </template>
</el-upload>
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
            <div style="padding:20px 30px 10px 30px">
                <h3>{{ id }} Edit</h3>
            </div>
            <div class="g6Canvas">
                <div id="mountNode" style="background-color: aliceblue;"></div>
            </div>
            <div class="routeTable">
                <div style="display:block;">
                    <el-table :data="tableData">
                        <el-table-column label="id" prop="id" />
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="calagory" prop="calagory" />
                        <el-table-column label="storageChart" prop="storageChart" />
                        <el-table-column align="right" style="width: 280px;">
                            <template #header>
                                <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                    item</el-button>
                            </template>
                            <template #default="scope">
                                <el-button-group style="width:180px;">
                                    <el-button type="primary" :icon="Edit" />
                                    <el-button type="primary" :icon="Share" @click="tabletest(scope.$index, scope.row)" />
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
                <div class="infoDescription">
                    <el-descriptions title="Produc Information" :column="1" border v-model="infoDes">
                        <el-descriptions-item label="Process id" label-align="right" align="center"
                            label-class-name="productLabel" class-name="my-content"
                            width="150px">{{ infoDes.id }}</el-descriptions-item>
                        <el-descriptions-item label="Product family" label-align="right"
                            align="center">{{ infoDes.name }}</el-descriptions-item>
                        <el-descriptions-item label="Product recipe" label-align="right"
                            align="center">{{ infoDes.calagory }}</el-descriptions-item>
                        <el-descriptions-item label="infos" label-align="right" align="center">
                            <el-table :data="infoDes.storageChart">
                                <el-table-column label="plcname" prop="plcName" />
                                <el-table-column label="plcname" prop="min" />
                                <el-table-column label="plcname" prop="length" />
                            </el-table>
                            <!-- <el-tag size="small">{{ infoDes.storageChart }}</el-tag> -->
                        </el-descriptions-item>
                        >
                    </el-descriptions>

                    <div>
                        <el-button type="primary" :icon="Edit" @click="">More Logs</el-button>
                        <el-button type="primary" :icon="Edit" @click="">Rework</el-button>
                    </div>
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
import { type FormInstance, ElMessage, ElMessageBox,genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import router from '@/router';
import { useRoute } from 'vue-router';
import request from '../../request/request'
import { method } from 'lodash';
import G6, { Graph } from '@antv/g6';
import { onMounted } from 'vue';
import { number2color } from '@antv/util';
//<--------------??????id-------->
var id = ref()
const getId = () => {
    const route = useRoute();
    id = ref(route.query.name1);
    console.log("name:" + route.query.name1);
    console.log("id:" + id.value);
}
getId()
//<-----------Router Actions------>
const routerSubmit = () => {
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
const routerCancel = () => {
    router.push('Process_Route')
}


//<-----------????????????station------>
const infoDes = ref({
    id: '',
    name: '',
    calagory: 'only',
    storageChart: [{
        plcName: '',
        min: 0,
        length: 0
    }]
})
// do not use same name with ref
const form = ref({
    id: '',
    name: '',
    calagory: 'only',
    storageChart: [{
        plcName: '',
        min: 0,
        length: 0
    }]
})


const dialogCancel = () => {
    console.log("two methods is ok");
}
//???????????????staions?????????????????????
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
}, {
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



let dialogVisible = ref(false)
interface User {
    date: string
    name: string
    address: string
}
const tabletest = (index: number, row: User) => {
    tableData.splice(index + 1, 0, {
        name: 'test',
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
    })
}
const plcInfoAdd = (index: number, row: User) => {
    form.value.storageChart.splice(index + 1, 0, {
            plcName: '',
            min: 0,
            length: 0
        })
}
const plcInfoDelete = (index: number, row: User) => {
    form.value.storageChart.splice(index, 1)
}
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
const plcInfoImport=()=>{
    
    var file1 = document.getElementById('plcInfoImportBtn');
	file1!.onchange = function () {
		var file = (<HTMLInputElement>file1).files![0];
		//??????????????????
    var reader = new FileReader();
		reader.readAsText(file,'utf-8');
		reader.onload = function () {
			var str = reader.result;
            if(str==null){
                console.log("????????????");
                
                return
            }
            
			var rows = (<string>str)!.split('\n'); 
			var clients = [];
			for(var i =1; i<rows.length-1; i++){
                
				var row =rows[i].split(',') ;
				var client = {
					plcName:row[0],
					min:Number.parseInt( row[1]),
					length:Number.parseInt(row[2]),
				};
                form.value.storageChart.push(client)
				clients.push(client);
			}
			//???????????????JSON?????????
			console.log(JSON.stringify(clients));
			
			console.log(rows);
            
        }
		}

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
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(10px)'
}
const bgCancel = () => {
    var popupbg = document.getElementById('routeContioner')
    popupbg!.style.filter = 'blur(0px)'
    console.log("???????????????bgCancel");

    (<HTMLFormElement>document.getElementById('myform'))!.reset()
    console.log("form:" + form.value.id);

    form.value = {
        id: '',
        name: '',
        calagory: '',
        storageChart: [{
            plcName: '',
            min: 0,
            length: 0
        }]
    }
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
//table?????????
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

const myformRef = ref<FormInstance>()

const dialogConfirm = (form: any) => {
    if (g6_status.value == 1) {
        const station = {
            id: form.id,
            name: form.name,
            calagory: form.calagory,
            storageChart: form.storageChart,
        }
        let max = data.nodes.length
        let modelNode = {
            id: (max).toString(),
            label: (max).toString(),
            x: data.nodes[max - 1].x,
            y: data.nodes[max - 1].y + 100,
            type: 'rect',
        }
        let modelEdge = {
            source: (max - 1).toString(),
            target: (max).toString(),
            label: ''
        }
        // ???g6???graph???????????????node??????????????????
        graph.addItem('node', modelNode)
        // ??????????????????push???data?????????
        data.nodes.push(modelNode)
        // ???g6???graph???????????????edge????????????
        graph.addItem('edge', modelEdge)
        // ???????????????push???data?????????
        data.edges.push(modelEdge)
        //data.nodes[index]??????0?????????
        for (let i = data.nodes.length - 1; i > g6_id.value; i--) {
            data.nodes[i].label = data.nodes[i - 1].label;
            graph.updateItem((i).toString(), { label: data.nodes[i - 1].label })
        }
        tableData.splice(g6_id.value - 1, 0, station)
        graph.update((g6_id.value).toString(), { label: form.id })
        data.nodes[g6_id.value].label = form.id
            //??????add????????????selected???????????????????????????????????????

        selectChange(g6_id.value)
        infoDes.value=tableData[g6_id.value-1]

    }
    else if (g6_status.value == 2) {
        graph.update((g6_id.value).toString(), { label: form.id })
        form.value = {
            id: '',
            name: '',
            calagory: '',
            storageChart: [{
                plcName: '',
                min: 0,
                length: 0
            }]
        }
    }

    g6_id.value = -1
    g6_status.value = 0
}
const selectChange=(id:any)=>{
    console.log("selectChange:"+id);
    console.log("g6_select_id:"+g6_select_id.value);
    
    if(g6_select_id.value!=-1){
        graph.findById(g6_select_id.value.toString()).clearStates()
    }    
    graph.findById(id).setState('selected',true)
    g6_select_id.value=id

}

//<--------------g6 canvas--------->
let graph: Graph
// ?????????
//   graph.render();
onMounted(() => {
    //       // ?????? G6 ?????????
    //   const graph = new G6.Graph({
    //     container: 'mountNode', // ???????????????????????? id????????? 9 ??????????????????
    //     // ????????????
    //     width: 800,
    //     height: 500,
    //     fitView: true,
    //     modes: {
    //       default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // ????????????????????????????????????????????????
    //     },
    //     layout: {
    //       type: 'force', // ????????????????????? force
    //       linkDistance: 200, // ??????????????? 100
    //       preventOverlap: true, // ??????????????????
    //     },
    //   });


    // const descriptionDiv = document.createElement('div');
    // descriptionDiv.id = 'discription';
    // descriptionDiv.innerHTML = 'Right click a node to activate a contextMenu.';
    // document.getElementById('mountNode')!.appendChild(descriptionDiv);


    const container = document.getElementById('mountNode');
    const width = container!.scrollWidth;
    const height = container!.scrollHeight || 500;

    const contextMenu = new G6.Menu({
        getContent(evt) {
            let header;
            if (evt!.target && evt!.target.isCanvas && evt!.target.isCanvas()) {
                header = 'Canvas ContextMenu';
            } else if (evt!.item) {
                const itemType = evt!.item.getType();
                header = `${itemType.toUpperCase()} ContextMenu`;
            }
            return `<ul>
      <li>??????</li>
      <li>??????</li>
      <li>??????</li>
    </ul>`;
        },
        handleMenuClick: (target, item) => {
            // console.log(target.nodeValue);
            // console.log("target:" + target);
            // console.log("item:" + item);
            // console.log("target,item:" + target, item);
            // console.log("ceshi" + item._cfg?.id);
            // console.log("ceshi2" + target.innerHTML);
            interface nodeBase {
                id: string
                x: number
                y: number
                label: string
                type: string
            }
            if (target.innerHTML === '??????') {

                g6_add(Number.parseInt(item._cfg?.id || '0') + 1, item._cfg?.model?.x || 0, (item._cfg?.model?.y || 0) + 100)

            } else if (target.innerHTML === '??????') {

                g6_delete(Number.parseInt(item._cfg?.id || '0'))

            } else if (target.innerHTML === '??????') {

                g6_edit(Number.parseInt(item._cfg?.id || '0'))
            }
        },
        // offsetX and offsetY include the padding of the parent container
        // ??????????????????????????? padding-left 16 ?????????????????? 10
        offsetX: 16 + 10,
        // ??????????????????????????? padding-top 24 ???????????????????????????????????????????????? 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // ?????????????????????????????????
        itemTypes: ['node'],
    });
    graph = new G6.Graph({
        // ?????? contextMenu plugins ??????????????? container ????????? position: relative;
        container: 'mountNode',
        width: 400,
        height: 600,
        linkCenter: true,
        plugins: [contextMenu],
        defaultNode: {
            size: [80, 40],
            type: 'rect',
            style: {
                fill: '#DEE9FF',
                stroke: '#5B8FF9',
            },
        },
        defaultEdge: {
            style: {
                stroke: '#b5b5b5',
                lineAppendWidth: 3, // Enlarge the range the edge to be hitted
            },
            labelCfg: {
                autoRotate: true,
                style: {
                    // A white stroke with width 5 helps show the label more clearly avoiding the interference of the overlapped edge
                    stroke: 'white',
                    lineWidth: 5,
                },
            },
        },
        modes: {
            default: ['drag-canvas', 'zoom-canvas', 'drag-node', {
                type: 'click-select',
                multiple: false,
            },], // ???????????????????????????????????????????????????????????????
        },


    });
    //???????????????????????????????????????????????????
    graph.on('afteritemstatechange', evt => {
        const { item } = evt
        if (item?._cfg?.states?.includes('selected')) {
            showInfo(item?._cfg?.id)
            g6_select_id.value=Number.parseInt(item?._cfg?.id||'-1')
        }
        else{
            g6_select_id.value=-1
        }
    })
    // ????????????
    graph.data(data);
    graph.render()
    //index,xTarget,yTarget:???????????????id???x,y???tips:index???1?????????//id?????????????????????
    //nextNode,sourceNode:???????????????node?????????????????????????????????????????????????????????????????????
    //??????????????????????????????????????????????????????????????????????????????????????????????????????id==data.nodes.length
    //????????????????????????????????????????????????label??????index????????????????????????label????????????????????????????????????index???????????????????????????
    const g6_add = (index: number, xTarget: number, yTarget: number) => {
        g6_id.value = index
        g6_status.value = 1
        //????????????????????????
        dialogVisible.value = true;
    }





    const g6_edit = (index: number) => {
        if (index == 0) {

            ElMessage({
                showClose: true,
                type: 'warning',
                message: '?????????????????????',
            })
            return
        }

        g6_id.value = index
        g6_status.value = 2
        form.value = tableData[index - 1]
        //????????????????????????
        dialogVisible.value = true;
    }


    const g6_delete = (index: number) => {
        if (index == 0) {
            ElMessage({
                showClose: true,
                type: 'warning',
                message: '?????????????????????',
            })
            return
        }
        for (let i = index; i < data.nodes.length - 1; i++) {
            data.nodes[i].label = data.nodes[i + 1].label;
            graph.updateItem((i).toString(), { label: data.nodes[i].label })
        }
        tableData.splice(index - 1, 1)
        if (g6_select_id.value >= index) {
            selectChange(g6_select_id.value - 1)
            if (g6_select_id.value == 0) {
                infoDes.value = {
                    id: '',
                    name: '',
                    calagory: '',
                    storageChart: [{
                        plcName: '',
                        min: 0,
                        length: 0
                    }]
                }
            } else {
                infoDes.value = tableData[g6_select_id.value-1]
            }
        }
        graph.removeItem((data.nodes.length - 1).toString())
        data.nodes.splice(data.nodes.length - 1, 1)
        data.edges.splice(data.edges.length - 1, 1)
    }
})
const showInfo = (selectId: any) => {
    console.log("showinfo:" + selectId);
    if (selectId == 0) {
        infoDes.value = {
            id: '',
            name: '',
            calagory: '',
            storageChart: [{
                plcName: '',
                min: 0,
                length: 0
            }]
        }
    } else {
        infoDes.value = tableData[selectId - 1]
    }


}
//select_id,????????????add???delect selected???????????????select????????????????????????
const g6_select_id=ref(0)
//???????????????id
const g6_id = ref(0)
//?????????????????????-????????????dialog?????????????????????
//?????????????????????1?????????????????????2
const g6_status = ref(0)
const data = {
    nodes: [
        {
            id: "0",
            label: '??????',
            x: 200,
            y: 100,
            type: 'rect',
        },
    ],
    edges: [{
        source: '0',
        target: '0',
        label: '',
    }
    ],
};
//????????????????????????????????????????????????
const dataload = () => {
    for (let i = 1; i <= tableData.length; i++) {
        data.nodes.push({
            id: i.toString(),
            x: 200,
            label: tableData[i - 1].id,
            y: i * 100 + 100,
            type: 'rect',
        })
        data.edges.push({
            source: (i - 1).toString(),
            target: (i).toString(),
            label: '',
        })
        console.log("dataload:" + i);
    }
}
dataload()
</script>

<style scoped>
#routeContioner {
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    background-color: aliceblue;
    border-radius: 20px;
}

.infoDescription {
    position: static;
    width: 80%;
}

.g6Canvas {
    margin-left: 10%;
    display: inline-block;
    /* box-shadow:darkgrey 5px 5px 5px 5px; */
    border: 1px 1px 1px 1px;
    border-style: groove;
}

.routeTable {
    display: inline-block;
    vertical-align: top;
    min-width: 800px;
    top: 0%;
    margin-left: 10%;
}

.g6-component-contextmenu {
    position: absolute;
    list-style-type: none;
    padding: 0px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
}

.g6-component-contextmenu ul {
    margin: 0px;
    padding: 0px;
    padding-inline-start: 0px;
    text-align: center;
    list-style-type: none;
}

.g6-component-contextmenu ul li {
    padding: 5px 50px;
    font-size: 12px;
    list-style-type: none;
}

.g6-component-contextmenu ul li:hover {
    background: #e1dddd;
}
</style>