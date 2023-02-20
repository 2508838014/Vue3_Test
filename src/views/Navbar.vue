<template>
<header>
    <div class="cover2">
        
        <el-affix :offset="0">
            <div class="logo">
                <img class="logo" src="../../public/logo.svg">
            </div>
            <div class="title">
                <h2 >Manufacturing Execution System</h2>
                <!-- Manufacturing ExecuTion System -->
            </div>
            <div>
                <router-link :to="{ name: 'login' }" class="loginout">
                    <!-- {{ loginOut }} -->logout
                </router-link>
            </div>
        </el-affix>
    </div>
</header>
</template>

<style scoped>

.cover2 {
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: #545c64;
}
.logo{
    display: inline;
    float: left;
    width: 200px;
    height: 100px;
    margin-top: 0;
}
.title{
    display: inline;
    float: left;
    padding-top: 10px;
    /* margin-top: 10px; */
    padding-left: 260px;
    margin-bottom: auto;
    padding-bottom: 0%;
    /* width: calc(100% - 260px); */
    width: 1000px;
    height: 90px;
    font-size: 30px;
    color:antiquewhite;
}
.loginout{
    float:right;
    margin-right: 0;
    padding-top: 10px;
    /* margin-top: 10px; */
    padding-left: 260px;
    margin-bottom: auto;
    padding-bottom: 0%;
    height: 90px;
    font-size: 16px;
    color:antiquewhite;
}
</style>