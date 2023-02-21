<template>
  <div class="bg">
    <div class="logincard">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="user name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="level" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">login</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>

          <el-button @click="Getinfo(ruleForm)">Reset</el-button>
        </el-form-item>


      </el-form>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { defineComponent, getCurrentInstance } from 'vue'
import type { FormInstance } from 'element-plus'
import request from '../request/request'
import router from '@/router';
import { method } from 'lodash';
let ruleForm = ref({
  name: '',
  pass: '',
  checkPass: '',
  age: ''
})
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
      alert("账号不存在，请检查输入");
    }
  }
    , (error) => {
      console.log("fail submit");
    }
  )
}

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.value.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.value.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}


const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.logincard {
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