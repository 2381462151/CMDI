<template>
  <!-- <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width:100%;"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
     底部 
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div> -->
  <div class="login">
    <div class="login_box">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">个人技术积分申报系统</h3>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="账号"
           
          >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
            <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter="handleLogin"
        
          >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            size="large"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter="handleLogin"
          >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>

            <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
          </el-input>
          <div class="login-code" style="width: 33%;">
            <img :src="codeUrl" @click="getCode" class="login-code-img"/>
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="large"
            type="primary"
            style="width:100%;"
            @click.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div style="float: right;" v-if="register">
          <!-- <div style="justify-content: flex-end;" v-if="register"> -->
            
            <router-link class="link-type" :to="'/register'">修改密码</router-link>
          </div>
          <!-- <div style="float: right;" v-if="register">
           <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div> -->
        </el-form-item>
      </el-form>
  </div>
  <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div> -->
</div>
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules ={
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      };

// const loginRules = {
//   username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
//   password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
//   code: [{ required: true, trigger: "change", message: "请输入验证码" }]
// };
// onMounted(() => {
//       // 使用 setTimeout 来延迟取消 readonly 状态
//       const timer = setTimeout(() => {
//         isReadOnly.value = false; // 取消 readonly 状态
//       }, 100); // 100ms 后执行

//       // 在组件卸载时清除定时器，避免内存泄漏
//       return () => {
//         clearTimeout(timer);
//       };
//     });
const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(true);
const redirect = ref(undefined);

watch(route, (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect;
}, { immediate: true });

function handleLogin1(){
  const query = route.query;
  const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
  router.push({ path: redirect.value || "/", query: otherQueryParams });
}
function handleLogin() {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        const query = route.query;
        const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
        router.push({ path: redirect.value || "/", query: otherQueryParams });
      }).catch(() => {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
}

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}

getCode();
getCookie();
</script>

<!-- <style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style> -->

<style lang='scss' scoped>
/* 更多请关注CSDN博主-拄杖盲学轻声码 */
// body {
//       // background: url('img/bgimg.jpg') no-repeat;
//       background-size: 100% 140%;
//     }
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      background-image: url("../assets/images/pexels-fmaderebner-869258.jpg");

      // background-image: url("../assets/images/pexels-baybiyik-22376850.jpg");
      // background-image: url("../assets/images/pexels-darren-lawrence-848896-3417802.jpg");
      // background-image: url("../assets/images/pexels-stijn-dijkstra-1306815-3265460.jpg");

      // background-image: url("../assets/images/pexels-webbshow-2406397.jpg");

      // background-image: url("../assets/images/pexels-lindsey-k-846449-1731447.jpg");

      // background-image: url("../assets/images/pexels-eberhardgross-26853160.jpg");

      // background-image: url("../assets/images/pexels-eberhardgross-4067902.jpg");
      background-size: cover;
    
    }
    
    h3 {
      color: #ffffff90;
      margin-top: 5%;
      font-weight: 550;
    }
    .el-form-item__content{
      margin-top: 3%;
    }
    span {
      color: #fff;
    }
    ::v-deep .el-input--large {
    font-size: 14px;
    // background: transparent!important;;
    // background: #00000017 !important;
    // background: #00000017 !important;
    background: rgba(255, 255, 255) !important;
    // background: #0000000d !important;
    }
    ::v-deep input {
      border: 0;
      // width: 60%;
      font-size: 15px;
      // color: #fff;
      // background: transparent!important;
      // border-bottom: 2px solid #fff;
      // background-color: aliceblue;
      // padding: 5px 10px;
      outline: none;
      // margin-top: 10px;
    }
     .login_box {
      // width: 30%!important;
      width: 400px!important;
      height: 400px!important;
      background: rgba(198, 158, 158, 0.6);
      /*rgba设置透明层*/
      background-color: #ffffff21!important;
      /*八位颜色位设置透明层*/
      // margin: auto;
      // margin-top: 10%;
      // text-align: center;
      border-radius: 10px;
      // padding: 50px 50px;
    }
    .el-button {
      margin-top: 0px;
      width: 60%;
      height: 30px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      text-align: center;
      line-height: 3px;
      font-size: 15px;
      background-image: linear-gradient(to right, #30cfd0, #330867)!important;
    }
    .el-button:hover,
    .el-button:active {
      margin-top: 0px;
      width: 60%;
      height: 30px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      text-align: center;
      line-height: 3px; /* 同上 */
      font-size: 15px;
      background-image: linear-gradient(to right, #30cfd0, #330867)!important;
    }
    .el-button--primary {
    color: #FFFFFF;
    /* background-color: #1890ff; */
    border-color: linear-gradient(to right, #30cfd0, #330867)!important;
    } 
    ::v-deep .el-form-item--default  .el-form-item__content {
    line-height: 36px;
    margin-bottom: 7px!important;
    display: block!important;
}

::v-deep .el-input__inner::-webkit-input-placeholder {
    color: #dfdede;
  }
  ::v-deep .el-input__inner:-ms-input-placeholder {
    // color:  #FFFFFF;
    // color: #c5c4c4;
    color: #dfdede;
  }
  ::v-deep .el-input__inner::placeholder {
    // color:  #FFFFFF;
    // color: #c5c4c4;
    color: #dfdede;
  }
  ::v-deep .el-input__inner{
    background-color: transparent;
  }
    // #login_box {
    //   width: 20%;
    //   height: 400px;
    //   background: rgba(0, 0, 0, 0.6);
    //   /*rgba设置透明层*/
    //   background-color: #00000060;
    //   /*八位颜色位设置透明层*/
    //   margin: auto;
    //   margin-top: 10%;
    //   text-align: center;
    //   border-radius: 10px;
    //   padding: 50px 50px;
    // }

    // h2 {
    //   color: #ffffff90;
    //   margin-top: 5%;
    // }

    // #input-box {
    //   margin-top: 5%;
    // }

    // span {
    //   color: #fff;
    // }

    input {
      // border: 0;
      // width: 60%;
      font-size: 15px;
      color: #0a0a0a;
      // background: transparent;
      // border-bottom: 2px solid #fff;
      // padding: 5px 10px;
      outline: none;
      // margin-top: 10px;
    }
    ::v-deep  .el-checkbox__label {
    color: #161616;
     }
    // button {
    //   margin-top: 50px;
    //   width: 60%;
    //   height: 30px;
    //   border-radius: 10px;
    //   border: 0;
    //   color: #fff;
    //   text-align: center;
    //   line-height: 30px;
    //   font-size: 15px;
    //   background-image: linear-gradient(to right, #30cfd0, #330867);
    // }

    // #sign_up {
    //   margin-top: 45%;
    //   margin-left: 60%;
    // }

    // a {
    //   color: #b94648;
    // }


.title {
  margin: 0px auto 23px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 10px;
  // background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  width: 33%!important;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
// .register-code {
//   width: 33%;
//   height: 38px;
//   float: right;
//   img {
//     cursor: pointer;
//     vertical-align: middle;
//   }
// }
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
  padding-left: 12px;
}

.login-form .el-input[data-v-d0e06bca] {
    height: 38px;
    border-radius: 10px;
}
</style>
