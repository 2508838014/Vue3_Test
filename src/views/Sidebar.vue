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
<!-- <script lang="ts">
export default {
}
</script>
<style lang="ts" scoped>
.cover{
  z-index: 999;
  //animation: blurtransiform 0.5s;
  /*Safari 和 Chrome:*/
  -webkit-animation: blurtransiform 0.5s;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.2);
}
</style> -->
