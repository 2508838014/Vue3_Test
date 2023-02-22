
<template>
  <div>
    <button onclick="add()">添加节点,并存储在localStorage中</button>
    <div id="mountNode"></div>
  </div>
</template>
  
  <!-- /* 引入 G6 */ -->
<script lang="ts" setup>
let count = 0
// 定义数据源
const data = {
  // 点集
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
    },
  ],
  // 边集
  edges: [],
};
// 创建 G6 图实例
const graph = new G6.Graph({
  container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
  // 画布宽高
  width: 800,
  height: 500,
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
  },
  layout: {
    type: 'force', // 设置布局算法为 force
    linkDistance: 200, // 设置边长为 100
    preventOverlap: true, // 设置防止重叠
  },
});
// 读取数据
graph.data(data);
// 渲染图
graph.render();

function add() {
  count += 1
  let modelNode = {
    id: count.toString(),
    x: 10,
    y: 10,
  }
  // 赋值，边的基本样式
  let modelEdge = {
    source: 'node1',
    target: count.toString(),
  }

  // 给g6的graph实例，添加node类型的新节点
  graph.addItem('node', modelNode)
  // 将节点对象，push到data对象中
  data.nodes.push(modelNode)
  // 给g6的graph实例，添加edge类型的边
  graph.addItem('edge', modelEdge)
  // 将边对象，push到data对象中
  data.edges.push(modelEdge)
  // -----------------问题来了----------------
  // 1.此时直接调用JSON.stringify，会出现循环引用错误
  // window.localStorage.setItem('g6data', JSON.stringify(data))

  // 2.在网上搜了一段解决办法，确实没有发生循环引用错误了。但是有了新的问题，
  //   当不停地点击按钮，增加节点时，localStorage中的edges的值会变成null
  let cache = []
  let str = JSON.stringify(data, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // 移除
        return
      }
      // 收集所有的值
      cache.push(value)
    }
    return value
  })
  cache = null // 清空变量，便于垃圾回收机制回收
  window.localStorage.setItem('g6data', str)

  console.log(data)
  graph.layout()
}
</script>