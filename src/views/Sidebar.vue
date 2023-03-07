<template>
	<div class="cover1">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#004b8c"
        class="el-menu-vertical-demo"
        default-active="1-1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>流程管理</span>
          </template>

            <router-link :to="{name: 'Process_Route'}">
              <el-menu-item index="1-1">工艺配方查看</el-menu-item> 
            </router-link>
            
            <router-link :to="{name: 'PlcInfo'}">
              <el-menu-item index="1-2">工艺流程编辑</el-menu-item> 
            </router-link>
            <router-link :to="{name: 'contioner'}">
              <el-menu-item index="1-3">plc信息登记</el-menu-item> 
            </router-link>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
          <span>产品信息</span>
          </template>
            <router-link  :to="{name: 'Product_Query'}">
              <el-menu-item index="2-1">产品信息</el-menu-item> 
            </router-link>
            <router-link  :to="{name: 'Product_Logs'}">
              <el-menu-item index="2-2">产品日志</el-menu-item> 
            </router-link>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><location /></el-icon>
          <span>人员管理</span>
          </template>
            <router-link :to="{name: 'UserInfo'}">
              <el-menu-item index="3-1">员工信息</el-menu-item> 
            </router-link>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><location /></el-icon>
          <span>信息统计</span>
          </template>
            <router-link :to="{name: 'Analysize'}">
              <el-menu-item index="4-1">产量统计</el-menu-item> 
            </router-link>
            <router-link :to="{name: 'Analysize'}">
              <el-menu-item index="4-1">产品质量分析</el-menu-item> 
            </router-link>
        </el-sub-menu>
      </el-menu>
	
	</div>
</template>
<script  lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.cover1 {
  z-index: 998;
  position: fixed;
  top: 100px;
  margin: 0;
  padding: 0;
  width: 260px;
  height: 100%;
  background-color: #004b8c;
}
</style>
