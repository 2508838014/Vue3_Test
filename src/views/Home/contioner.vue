
<template>
    <div style="background-color: antiquewhite;">
      <!-- <button onclick="add()">添加节点,并存储在localStorage中</button> -->
      <div id="mountNode" style="background-color: aliceblue;"></div>
    </div>
  </template>
    
    <!-- /* 引入 G6 */ -->
  <script lang="ts" setup>
  import G6 from '@antv/g6';
  import insertCss from 'insert-css';
import { onMounted } from 'vue';


insertCss(`
  #contextMenu {
    position: absolute;
    list-style-type: none;
    padding: 10px 8px;
    left: -150px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
  }
  #contextMenu li {
    cursor: pointer;
		list-style-type:none;
    list-style: none;
    margin-left: 0px;
  }
  #contextMenu li:hover {
    color: #aaa;
  }
`);


  let count = 0
  // 定义数据源
  const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      x: 200,
      y: 100,
      type: 'rect',
    },
    {
      id: 'node2',
      label: 'node2',
      x: 250,
      y: 250,
      type: 'rect',
    },
    {
      id: 'node3',
      label: 'node3',
      x: 350,
      y: 100,
      type: 'rect',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'Test Label',
    },
    {
      source: 'node1',
      target: 'node3',
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
    <h3>${header}</h3>
    <ul>
      <li title='1'>li 1</li>
      <li title='2'>li 2</li>
      <li>li 3</li>
      <li>li 4</li>
      <li>li 5</li>
    </ul>`;
  },
  handleMenuClick: (target, item) => {
    console.log(target, item);
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
    default: ['drag-node'],
  },
});

  // 读取数据
  graph.data(data);
    graph.render()
})









































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
  
  //   // 给g6的graph实例，添加node类型的新节点
  //   graph.addItem('node', modelNode)
  //   // 将节点对象，push到data对象中
  //   data.nodes.push(modelNode)
  //   // 给g6的graph实例，添加edge类型的边
  //   graph.addItem('edge', modelEdge)
  //   // 将边对象，push到data对象中
  //   data.edges.push(modelEdge)
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
  </script>
  <style>


</style>