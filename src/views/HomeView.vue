
<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import sidebarVue from "./Sidebar.vue";
    import Navbar from "./Navbar.vue";
/*    import HelloWorld from './components/HelloWorld.vue'*/
    /*   import router from './router'*/
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const toPage = () => {
        console.log(router)

        router.push('/side')
    }


</script>
<template>
      <navbar></navbar>
  <sidebarVue></sidebarVue>
    <router-view #default="{ Component }">
    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component :is="Component" />
    </transition>
  </router-view>
<!--  <main>
    <TheWelcome />
  </main>-->
</template>

<style scoped>
.main {
  position: absolute;
  margin-top: 100px;
  margin-left: 260px;
  padding: 40px 0;
  width: calc(100% - 260px);
  height: calc(100% - 100px);
  background-color: brown;
  /* // background: #000; */
}
</style>
