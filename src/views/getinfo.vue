<template>
    <div class="bg">
        <div class="logincard">
        <el-form

          :model="ruleForm"

          label-width="120px"

        >
        <el-form-item label="user name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="level" prop="age">
            <el-input v-model.number="ruleForm.age" />
          </el-form-item>
          <el-form-item>
    
            <el-button @click="Getinfo">Reset</el-button>
          </el-form-item>
    
        
        </el-form>
    </div>
    </div>
      </template>
      
      <script lang="ts" setup>
      import { reactive, ref } from 'vue'
      import type { FormInstance } from 'element-plus'
      import request from '../request/request'
    //   import { createRequire } from 'module';
    // const require = createRequire(import.meta.url);
    
      //  import request from '../request/request'
    //   const gioJs = require('../request/request')
    let ruleForm=ref({
        name:'',
        pass:'',
        checkPass:'',
        age:''
    });
    // const Getinfo=()=>{
    //       request.get("/hello"
    //          ).then(res=>{
    //           ruleForm=res.data;
    //           console.log("qingqiuchenggong1");
    //           if(res.data===undefined){
    //             console.log("undefined_res");
                
    //             // console.log(res.data);
    //           }else{
    //             console.log(ruleForm.name)
    //           }
              
    //          }
    //          ,(error)=>{
    //           console.log("fail submit");
    //          }
    //          )    
    //   }

    const Getinfo=()=>{
          request.get("/hello"
             ).then(res=>{
              ruleForm.value=res.data;
              localStorage.setItem("user", "JSON.stringify(res.data)"); // 存储用户信息到浏览器
              console.log("res.data:"+res);
              console.log("ruleform.value.name:"+ruleForm.value.name);
              console.log("qingqiuchenggong1");
              if(res.data===undefined){
                console.log("undefined_res");
                
                // console.log(res.data);
              }else{
                console.log(ruleForm.value.name)
              }
              
             }
             ,(error)=>{
              console.log("fail submit");
             }
             )    
      }

















//     const Getinfo=()=>{
//     let result = new Promise((resolve,reject)=>{
//                 request({
//             method:'get',
//             url:'/hello'
//           }).then(res=>{
//               console.log("qingqiuchenggong1");
//               resolve(res.data);         
//              }
//              ,(error)=>{
//               console.log("fail submit");
//               return resolve;
//              }
//              )
// 	}).then(res=>{
// 	console.log(res);
// })
// console.log(result.then(res=>{
//     if(res==null){
//         console.log("promise Undefined");
//     }
// }));

//       }
      
      </script>
      <style scoped>
    .logincard{
        width: 400px;
        height: 300px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    
    .bg {
      z-index: 99999;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background-image: linear-gradient(to right , #7A88FF, #7AFFAF);
    }
    

    
    </style>