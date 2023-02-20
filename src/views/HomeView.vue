
<template>
  <navbar></navbar>
  <div>
    <sidebarVue></sidebarVue>
    <div class="main">
      <router-view #default="{ Component }">
        <transition name="fade" enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import sidebarVue from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const toPage = () => {
  console.log(router)

  router.push('/side')
}
</script>



<style scoped>
.main {
  /* position: absolute; */
  position: fixed;
  display: inline;
  margin-top: 100px;
  margin-left: 260px;
  width: calc(100% - 260px);
  height: calc(100% - 100px);
  background-color: #CFD3DC;
  /* // background: #000; */
}
</style>
