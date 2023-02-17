<template>
    <div class="about">
        <h1>This is an about page</h1>
        <el-button type="success" round>about about</el-button>
        <RouterLink to="/side">About</RouterLink>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {

    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
