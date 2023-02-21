<script setup lang="ts">

    import { RouterLink, RouterView } from 'vue-router'

    import { defineComponent } from 'vue'
    import { ElConfigProvider } from 'element-plus'
    /*   import router from './router'*/
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const toPage = () => {
        console.log(router)
        router.push('/side')
    }



</script>

<template>
  

    <router-view />

</template>

<style>
html,body,#app{
 
 height: 100%;
 margin: 0;
 
 
}
</style>
