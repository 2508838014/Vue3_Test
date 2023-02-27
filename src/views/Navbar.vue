<template>
<header>
    <div class="cover2">
        
        <el-affix :offset="0">
            <div class="logo">
                <!-- <img class="logo" src="../../public/logo.svg"> -->
                <h1 style="margin:15px;font-size: 60px;top=0;bottom: 0;right: 0;left: 0;color: black;" >Nestar</h1  >
            </div>
            <div class="title">
                <h2 style="margin: 0;" >Manufacturing Execution System</h2>
                <!-- Manufacturing ExecuTion System -->
            </div>
            <div>
                <router-link :to="{ name: 'login' }" class="loginout">
                    <!-- {{ loginOut }} -->登陆人员姓名|登出
                </router-link>
            </div>
        </el-affix>
    </div>
</header>
</template>

<style scoped>

.cover2 {
  z-index: 0;
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: #004b8c;
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
    padding-left: 240px;
    margin-bottom: auto;
    padding-bottom: 0%;
    /* width: calc(100% - 260px); */
    width: 1000px;
    height: 90px;
    font-size: 30px;
    color:white;
}
.loginout{
    float:right;
    margin-right: 40px;
    padding-top: 20px;
    /* margin-top: 10px; */
    padding-left: 240px;
    margin-bottom: auto;
    padding-bottom: 0%;
    height: 90px;
    font-size: 16px;
    color:antiquewhite;
}
</style>