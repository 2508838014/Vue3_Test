<template>
	<div class="cover1">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1-1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>基本信息</span>
          </template>

            <router-link :to="{name: 'Process_Route'}">
              <el-menu-item index="1-1">工艺流程查看</el-menu-item> 
            </router-link>
            
            <router-link :to="{name: 'PlcInfo'}">
              <el-menu-item index="1-2">plc信息登记</el-menu-item> 
            </router-link>
            <router-link :to="{name: 'contioner'}">
              <el-menu-item index="1-3">plc信息登记</el-menu-item> 
            </router-link>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
          <span>流程管控</span>
          </template>
            <router-link  :to="{name: 'Product_Query'}">
              <el-menu-item index="2-1">在制品查询</el-menu-item> 
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
              <el-menu-item index="4-1">图标样式</el-menu-item> 
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
  background-color: #545c64;
}
</style>
