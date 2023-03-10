import axios from "axios";
import router from "../router";
import { getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
const request = axios.create({

  baseURL: `https://192.168.4.66:7190`,
    // baseURL: `http://localhost:3003`,
  timeout: 30000,
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
//     //当user存在的时候
//     let user = localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null;
//     if (user) {
//       config.headers["token"] = user.token; // 设置请求头
//     }
//     return config;
     return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    console.log("查看拦截器");
    
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    if (typeof res === "undefined") {
    }
    console.log(res);
    //当权限验证不通过的时候给出提示
    
    if (res.code === "401") {
        ElMessage({
            message: res.msg,
            type: "error",
        });
        router.push("/login");
    }
    //前端返回的res直接赋值的话，需要.data，如果直接给res就不需要
    return response;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
