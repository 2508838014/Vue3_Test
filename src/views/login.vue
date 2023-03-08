<template>
  <div class="bg">
    <div class="logincard">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="150px">
        <el-form-item label="account number" prop="account" style="margin-top: 60px;">
          <el-input v-model="ruleForm.account" style="width: 240px;" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" style="width: 240px;" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">login</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>

          <el-button @click="Getinfo(ruleForm)">Test</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type FormInstance, ElMessage } from 'element-plus'
import request from '../request/request'
import router from '@/router';
let ruleForm = ref({
  account: '',
  pass: '',
})


const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.value.pass.length < 5) {
      callback(new Error('The password must be no less than five characters'))
    }
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

    if (patrn.exec(ruleForm.value.pass)) {
      callback(new Error('The password cannot contain Chinese characters'))
    }
    callback()
  }
}

const validateAccount = (rule: any, value: any, callback: any) => {
  if (ruleForm.value.account === '') {
    callback(new Error('Please input the account number'))
  } else {
    if (ruleForm.value.account.length < 5) {
      callback(new Error('The account must be no less than five characters'))
    }
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

    if (patrn.exec(ruleForm.value.account)) {
      callback(new Error('The account cannot contain Chinese characters'))
    }
    callback()
  }
}

const rules = reactive({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],

})

localStorage.clear()
const Getinfo = (ruleForm: any) => {
  //这个值根据html内容变化
  console.log(ruleForm);
  //data没有根据ruleForm。vaule变化。
  request.get("/hello", ruleForm
  ).then(res => {
    console.log(ruleForm.age + "ruleFrom.age");
    if (res.status == 400) {
      router.push('/');
    }
    else {
      ElMessage.error('账号不存在，请检查输入')
      // alert("账号不存在，请检查输入");
    }
  }
    , (error) => {
      console.log("fail submit");
    }
  )
}
// let resForm=ref({
//   name:'',
//   level:''
// })
// let resForm=ref({
//   message: "",
//   success: false,
//   content: any='',
//   errorCode: 0
// })
interface resData{
  message: string,
  success: Boolean,
  content: any,
  errorCode: number
}
let resForm:resData
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {

      // localStorage.setItem("level",'2')
      // localStorage.setItem("name",'张三')
      ElMessage({
            message: 'Login succeeded.',
            type: 'success',
          })
      // router.push('/')





      const { account, pass }
        = ruleForm.value
  //     const test1={
  //       "nameUser": ruleForm.value.account,
  // "password": ruleForm.value.pass,
  // "privilegeLevel": 0
  //     }
  const test1={
        userName: ruleForm.value.account,
  password: ruleForm.value.pass,
  privilegeLevel: 0
      }
      // request.post("/Login/CheckLoginUsers", test1).then(res => {
      //   console.log(JSON.stringify(test1));
        
      //   if (res.status == 200) {
      //     ElMessage({
      //       message: 'Login succeeded.',
      //       type: 'success',
      //     })
      //     // router.push('/')
      //     resForm=res.data
      //     if(resForm.success){

      //       localStorage.setItem("level",resForm.content.toString())
      //       localStorage.setItem("account",resForm.account.toString())
      //     }else{
      //       ElMessage.error('Login failed, please check the network, etc.')
      //     }
      //   }
      // }, (error) => {
      //   console.log(JSON.stringify(test1));
      //   console.log("fail submit");
      //   ElMessage.error('Login failed, please check the network, etc.')
      // })








      request.get("/GetPlcInfos").then(res => {
        console.log(JSON.stringify(test1));
        
        if (res.status == 200) {
          
        }
      }, (error) => {
        console.log(JSON.stringify(test1));
        console.log("fail submit");
        ElMessage.error('Login failed, please check the network, etc.')
      })








    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style>
.logincard {
  width: 500px;
  height: 300px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px;
  box-shadow: 0px 0px 5px #888888;
}



.bg {
  animation: blurtransiform 0.5s;
  /*Safari 和 Chrome:*/
  -webkit-animation: blurtransiform 0.5s;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to right, #7A88FF, #7AFFAF);
}

@keyframes blurtransiform {
  from {
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: saturate(180%) blur(5px);
  }

  to {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: saturate(180%) blur(20px);
  }
}

/*Safari 和 Chrome:*/
@-webkit-keyframes blurtransiform {
  from {
    background-color: rgba(255, 255, 255, 0);
    -webkit-backdrop-filter: saturate(180%) blur(5px);
  }

  to {
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }
}
</style>