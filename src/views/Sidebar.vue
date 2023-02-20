<template>
	<div class="cover1">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
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
            
            <el-menu-item index="1-2">item two</el-menu-item>

        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><icon-menu /></el-icon> -->
            <el-icon><location /></el-icon>
          <span>流程管控</span>
          </template>

          <!-- <el-menu-item-group title="Group One"> -->
            <router-link :to="{name: 'Product_Query'}">
              <el-menu-item index="2-1">在制品查询</el-menu-item> 
            </router-link>
          <!-- </el-menu-item-group> -->
        </el-sub-menu>
        <!-- <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
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
