
<template>
    <div style="background-color: antiquewhite;">
      <!-- <button onclick="add()">添加节点,并存储在localStorage中</button> -->
      <div id="mountNode" style="background-color: aliceblue;"></div>
    </div>
  </template>
    
    <!-- /* 引入 G6 */ -->
  <script lang="ts" setup>
  import G6 from '@antv/g6';
import { onMounted, reactive, ref } from 'vue';





  let count = 0
  // 定义数据源
  const data = {
  nodes: [
    {
      id: '1',
      label: 'node1',
      x: 200,
      y: 100,
      type: 'rect',
    },
    {
      id: '2',
      label: 'node2',
      x: 250,
      y: 250,
      type: 'rect',
    },
    {
      id: '3',
      label: 'node3',
      x: 350,
      y: 100,
      type: 'rect',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      label: '>',
    },
    {
      source: '1',
      target: '3',
      label: 'Test Label 2',
    },
  ],
};

  // 渲染图
//   graph.render();
onMounted(()=>{



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
const descriptionDiv = document.createElement('div');
descriptionDiv.id = 'discription';
descriptionDiv.innerHTML = 'Right click a node to activate a contextMenu.';
document.getElementById('mountNode')!.appendChild(descriptionDiv);


const container = document.getElementById('mountNode');
const width = container!.scrollWidth;
const height = container!.scrollHeight || 500;
let dataCount=ref(tableData.length)

const contextMenu = new G6.Menu({

  
  getContent(evt) {
    let header;
    if (evt!.target && evt!.target.isCanvas && evt!.target.isCanvas()) {
      header = 'Canvas ContextMenu';
    } else if (evt!.item) {
      const itemType = evt!.item.getType();
      header = `${itemType.toUpperCase()} ContextMenu`;
    }
    return `
 
    <ul>
      <li>增加</li>
      <li>删除</li>
      <li>修改</li> 
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
  },


  



  handleMenuClick: (target, item) => {
    console.log(target.nodeValue);
    
    console.log("target:"+target);
    console.log("item:"+item);
    console.log("target,item:"+target, item);
    console.log("ceshi"+item._cfg?.id);
    console.log("ceshi2"+target.innerHTML);

    interface nodeBase{
      id:string
      x:number
      y:number
      label:string
      type:string
    }
    if(target.innerHTML==='增加'){
      
      g6_add(Number.parseInt(item._cfg?.id||'0')+1,item._cfg?.model?.x||0,(item._cfg?.model?.y||0)+100)
      // const temp={
      //   id:item._cfg?.id||'',
      //   label:item._cfg!.model!.label?.toString()||'',
      //   x:item._cfg?.model?.x||0,
      //   y:item._cfg?.model?.y||0,
      //   type:item._cfg?.model?.type||'',
      // }
      // const temp2={
      //   id:item._cfg?.id||'',
      //   label:item._cfg!.model!.label?.toString()||'',
      //   x:item._cfg?.model?.x||0,
      //   y:item._cfg?.model?.y||0,
      //   type:item._cfg?.model?.type||'',
      // }
      
      // console.log("temp.nodes:"+temp.label);
      // console.log("temp.nodes:"+temp.id);
      // console.log("temp.nodes:"+temp.type);
      // console.log("temp.nodes:"+temp.x);
      // console.log("temp.nodes:"+temp.y);
      // console.log("data:id:"+data.nodes[2].id);
      
      // console.log("equal:"+(data.nodes[2].id==temp.id).toString());
      // console.log("equal:"+(data.nodes[2].label==temp.label).toString());
      // console.log("equal:"+(data.nodes[2].type==temp.type).toString());
      // console.log("equal:"+(data.nodes[2].x==temp.x));
      // console.log("equal:"+(data.nodes[2].y==temp.y));
      
      // console.log("index"+data.nodes.indexOf( temp))
        
      
      
    }else if(target.innerHTML==='删除'){

    }else if(target.innerHTML==='修改'){

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
const graph = new G6.Graph({
  // 使用 contextMenu plugins 时，需要将 container 设置为 position: relative;
  container: 'mountNode',
  width:800,
  height:500,
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
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
  },
});

  // 读取数据
  graph.data(data);
    graph.render()


    //index,xTarget,yTarget:想要生成的id，x,y（tips:index从1开始）//id的作用在于修改
    //nextNode,sourceNode:想要生成的node的上下节点，用于连线。没有下节点则表示为自己。
    //刚刚思考了下，不需要上下节点。因为必定添加在最后一位，原来的最后一位id==data.nodes.length
    //但是还是要判断从哪里开始进行修改label，从index开始，赋值给新的label，后面的就顺序下沿，如果index就是最后一位，其实
    const g6_add=(index:number,xTarget:number,yTarget:number)=>{
      let max=data.nodes.length
      let modelNode={
    id: (max+1).toString(),
      label: (max+1).toString(),
      x: data.nodes[max-1].x,
      y: data.nodes[max-1].x+100,
      type: 'rect',
  }
  let  modelEdge={
    source:(max).toString(),
    target:(max+1).toString(),
    label:''
  }
  

  data.nodes[0].label='999'
      // 给g6的graph实例，添加node类型的新节点
      graph.addItem('node', modelNode)
    // 将节点对象，push到data对象中
    data.nodes.push(modelNode)
    // 给g6的graph实例，添加edge类型的边
    graph.addItem('edge', modelEdge)
    // 将边对象，push到data对象中
    data.edges.push(modelEdge)


        //data.nodes[index]时从0开始的
  for(let i=data.nodes.length-1;i>=index;i--){
    console.log("i:"+i);
    console.log("i-1.label:"+data.nodes[i-1].label);
    data.nodes[i].label=data.nodes[i-1].label;
  }
  let nodeLabel=index.toString()
  data.nodes[index-1].label=nodeLabel

  

    // graph.layout()

}













    
})

































const getEdge=(sourceTarget:string)=>{
}
const readtype=()=>{
  console.log("type:"+typeof(data.edges));
  
}
readtype()

  // function add() {
  //   count += 1
  //   let modelNode = {
  //     id: count.toString(),
  //     x: 10,
  //     y: 10,
  //   }
  //   // 赋值，边的基本样式
  //   let modelEdge = {
  //     source: 'node1',
  //     target: count.toString(),
  //   }
  
    // // 给g6的graph实例，添加node类型的新节点
    // graph.addItem('node', modelNode)
    // // 将节点对象，push到data对象中
    // data.nodes.push(modelNode)
    // // 给g6的graph实例，添加edge类型的边
    // graph.addItem('edge', modelEdge)
    // // 将边对象，push到data对象中
    // data.edges.push(modelEdge)
  //   // -----------------问题来了----------------
  //   // 1.此时直接调用JSON.stringify，会出现循环引用错误
  //   // window.localStorage.setItem('g6data', JSON.stringify(data))
  
  //   // 2.在网上搜了一段解决办法，确实没有发生循环引用错误了。但是有了新的问题，
  //   //   当不停地点击按钮，增加节点时，localStorage中的edges的值会变成null
  //   let cache = []
  //   let str = JSON.stringify(data, function (key, value) {
  //     if (typeof value === 'object' && value !== null) {
  //       if (cache.indexOf(value) !== -1) {
  //         // 移除
  //         return
  //       }
  //       // 收集所有的值
  //       cache.push(value)
  //     }
  //     return value
  //   })
  //   cache = null // 清空变量，便于垃圾回收机制回收
  //   window.localStorage.setItem('g6data', str)
  
  //   console.log(data)
  //   graph.layout()
  // }



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
<style>
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

.g6-component-contextmenu  ul li {
  padding: 5px 50px;
  font-size: 12px;
  list-style-type: none;
}

.g6-component-contextmenu ul li:hover {
  background: #e1dddd;
}
</style>