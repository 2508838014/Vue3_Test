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

                            <el-table-column align="right" style="width: 280px;">
                            <template #header>
                                <el-button type="primary" @click="dialogVisible = true; tableAdd()" :icon="Share">Add
                                    item</el-button>
                            </template>
                            <template #default="scope">
                                <el-button-group style="width:180px;">
                                    <el-button type="primary" :icon="Share" @click="plcInfoAdd(scope.$index, scope.row)" />
                                    <el-button type="danger" :icon="Delete" @click="plcInfoDelete(scope.$index, scope.row)" />
                                </el-button-group>
                            </template>
                        </el-table-column>
                        </el-table>
                        <el-button>添加</el-button>
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
import { type FormInstance, ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router';
import { useRoute } from 'vue-router';
import request from '../../request/request'
import { method } from 'lodash';
import G6, { Graph } from '@antv/g6';
import { onMounted } from 'vue';
import { number2color } from '@antv/util';
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


//<-----------添加新的station------>
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
    console.log("重置表单：bgCancel");

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
        // 给g6的graph实例，添加node类型的新节点
        graph.addItem('node', modelNode)
        // 将节点对象，push到data对象中
        data.nodes.push(modelNode)
        // 给g6的graph实例，添加edge类型的边
        graph.addItem('edge', modelEdge)
        // 将边对象，push到data对象中
        data.edges.push(modelEdge)
        //data.nodes[index]时从0开始的
        for (let i = data.nodes.length - 1; i > g6_id.value; i--) {
            data.nodes[i].label = data.nodes[i - 1].label;
            graph.updateItem((i).toString(), { label: data.nodes[i - 1].label })
        }
        tableData.splice(g6_id.value - 1, 0, station)
        graph.update((g6_id.value).toString(), { label: form.id })
        data.nodes[g6_id.value].label = form.id
            //解决add情况下不selected改变不能刷新详细信息的问题

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
// 渲染图
//   graph.render();
onMounted(() => {
    //       // 创建 G6 图实例
    //   const graph = new G6.Graph({
    //     container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
    //     // 画布宽高
    //     width: 800,
    //     height: 500,
    //     fitView: true,
    //     modes: {
    //       default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
    //     },
    //     layout: {
    //       type: 'force', // 设置布局算法为 force
    //       linkDistance: 200, // 设置边长为 100
    //       preventOverlap: true, // 设置防止重叠
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
      <li>增加</li>
      <li>删除</li>
      <li>修改</li>
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
            if (target.innerHTML === '增加') {

                g6_add(Number.parseInt(item._cfg?.id || '0') + 1, item._cfg?.model?.x || 0, (item._cfg?.model?.y || 0) + 100)

            } else if (target.innerHTML === '删除') {

                g6_delete(Number.parseInt(item._cfg?.id || '0'))

            } else if (target.innerHTML === '修改') {

                g6_edit(Number.parseInt(item._cfg?.id || '0'))
            }
        },
        // offsetX and offsetY include the padding of the parent container
        // 需要加上父级容器的 padding-left 16 与自身偏移量 10
        offsetX: 16 + 10,
        // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
        offsetY: 0,
        // the types of items that allow the menu show up
        // 在哪些类型的元素上响应
        itemTypes: ['node'],
    });
    graph = new G6.Graph({
        // 使用 contextMenu plugins 时，需要将 container 设置为 position: relative;
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
            },], // 允许拖拽画布、放缩画布、拖拽节点、单选节点
        },


    });
    //监听状态的改变。用于给显示详细信息
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
    // 读取数据
    graph.data(data);
    graph.render()
    //index,xTarget,yTarget:想要生成的id，x,y（tips:index从1开始）//id的作用在于修改
    //nextNode,sourceNode:想要生成的node的上下节点，用于连线。没有下节点则表示为自己。
    //刚刚思考了下，不需要上下节点。因为必定添加在最后一位，原来的最后一位id==data.nodes.length
    //但是还是要判断从哪里开始进行修改label，从index开始，赋值给新的label，后面的就顺序下沿，如果index就是最后一位，其实
    const g6_add = (index: number, xTarget: number, yTarget: number) => {
        g6_id.value = index
        g6_status.value = 1
        //打开弹窗申请内容
        dialogVisible.value = true;
    }





    const g6_edit = (index: number) => {
        if (index == 0) {

            ElMessage({
                showClose: true,
                type: 'warning',
                message: '开始不能被修改',
            })
            return
        }

        g6_id.value = index
        g6_status.value = 2
        form.value = tableData[index - 1]
        //打开弹窗申请内容
        dialogVisible.value = true;
    }


    const g6_delete = (index: number) => {
        if (index == 0) {
            ElMessage({
                showClose: true,
                type: 'warning',
                message: '开始不能被删除',
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
//select_id,用于应对add与delect selected上方，但是select信息不改变的情况
const g6_select_id=ref(0)
//需要改变的id
const g6_id = ref(0)
//需要改变的状态-用于控制dialog是添加还是修改
//添加的时候显示1，修改则表示为2
const g6_status = ref(0)
const data = {
    nodes: [
        {
            id: "0",
            label: '开始',
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
//页面加载的时候加载画图所需的数据
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