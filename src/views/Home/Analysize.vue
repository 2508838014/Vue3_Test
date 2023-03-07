<template>
    <div style="height:100%;width: 100%;">

        <div id='routeContioner'>
            <div style="padding:20px 30px 10px 30px">
                <h3 >Recipes</h3>
            </div>
            <div id="line" class="formCard"></div>
            <div id="bar" class="formCard"></div>
            <div id="pie" class="formCard"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { dateEquals, datePickTypes, ElMessage, ElMessageBox } from 'element-plus'
import request from '../../request/request'
import router from '@/router';
import {onMounted} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { init} from 'echarts';
import type { ECharts, EChartsOption,} from 'echarts';
import { forEach } from 'lodash';



      // const { account, password }
      //   = ruleForm.value
      // request.post("/login", { account, password }).then(res => {
      //   if (res.status == 200) {
          // ElMessage({
          //   message: 'Login succeeded.',
          //   type: 'success',
          // })
      //     router.push('/')
      //     resForm=res.data
      //     localStorage.setItem("level",resForm.value.level)
      //     localStorage.setItem("name",resForm.value.name)
      //   }
      // }, (error) => {
      //   console.log("fail submit");
      //   ElMessage.error('Login failed, please check the network, etc.')
      // })

const res=[{date:"2011-1-1",value:"11"},
{date:"2011-1-2",value:"11"},
{date:"2011-1-3",value:"11"},
{date:"2011-1-4",value:"11"},
{date:"2011-1-5",value:"11"},
{date:"2011-1-6",value:"11"},
{date:"2011-1-7",value:"11"},
]
let sumData=ref(res)
let xSumData:Array<string>=[]
let ySumData:Array<string>=[]
let  computeSumData=()=>{
    for(let i=0;i<sumData.value.length;i++){
        xSumData.push(sumData.value[i].date)
        ySumData.push(sumData.value[i].value)
    }
    
}

computeSumData()
const Draw_line=()=>{
    const charEle = document.getElementById("line") as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    title:{
        text:'产量变化'
    },
    tooltip:{},
    xAxis: {
      type: 'category',
      data:xSumData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'base info',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  charEch.setOption(option);
}
const Draw_bar=()=>{
    const charEle = document.getElementById("bar") as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    title:{
        text:'测试内容'

    },
    tooltip:{},
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'base info',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'bar'
      }
    ]
  };
  charEch.setOption(option);
}
const Draw_pie=()=>{
    const charEle = document.getElementById("pie") as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption ={
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
  charEch.setOption(option);
}
onMounted(() => {
 Draw_line()
 Draw_bar()
 Draw_pie()
});
</script>

<style scoped>
.formCard{
    width: 400px;
    height: 400px;
    margin: 80px;
    border: 1px;
    display: inline-block;
}
#routeContioner {
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    background-color: aliceblue;
    border-radius: 20px;
    overflow:auto;
}
</style>