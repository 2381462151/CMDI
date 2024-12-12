<template>
  <!-- <div class="register"> -->
    <!-- <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">若依后台管理系统</h3>
      <el-form-item prop="username">
        <el-input 
          v-model="registerForm.username" 
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
          v-model="registerForm.password"
          type="password"
          size="large" 
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large" 
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          size="large" 
          v-model="registerForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large" 
          type="primary"
          style="width:100%;"
          @click.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
        </div>
      </el-form-item>
    </el-form> -->
    <!--  底部  -->
    <!-- <div class="el-register-footer">
      <span>Copyright © 2018-2024 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div> -->
  <div class="register">
    <div class="login_box">
      <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="register-form">
        <h3 class="title">修改密码</h3>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号"   autocomplete="off">
            <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
            <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleRegister"
            autocomplete="off"
          >
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
            <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>

          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" class="captcha-form-item_confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
            @keyup.enter.native="handleRegister"
          >
            <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
            <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="confirmPassword">
          <input  v-model="registerForm.password"  type="password" placeholder="验证码" />
        </el-form-item> -->
        
        <el-form-item prop="code" v-if="captchaEnabled" class="el-form-item_code">
          <el-input
            v-model="registerForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleRegister"
          >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
            <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
          </el-input>
          <div class="register-code">
            <img :src="codeUrl" @click="getCode" class="register-code-img"/>
          </div>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled" class="captcha-form-item_a">
          <!-- <el-input
            v-model="registerForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleRegister"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input> -->
           <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 30%"
            @click.native.prevent="handleRegister"
            class="el-button_a"
          >
           <span class="el-button_a_span" >人脸验证</span> 
           </el-button>
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 30%"
            @click.native.prevent="handleRegister"
            class="el-button_b"
          >
          <span  class="el-button_b_span" >邮箱验证</span> 
           </el-button>
          <!-- <router-link class="link-type" :to="'/login'">邮箱验证</router-link>
          <router-link class="link-type" :to="'/login'">人脸验证</router-link> -->
          <!-- <div class="register-code">
            <img :src="codeUrl" @click="getCode" class="register-code-img"/>
          </div> -->
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleRegister"
            class="el-button_c"
          >
            <span v-if="!loading">确认修改</span>
            <span v-else>提 交 中...</span>
          </el-button>
          <div style="float: right;">
            <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    
   </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { getCodeImg, register } from "@/api/login";

const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: ""
});

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    { required: true, trigger: "blur", message: "请输入您的账号" },
    { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" },
    { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" },
    { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, trigger: "blur", message: "请再次输入您的密码" },
    { required: true, validator: equalToPassword, trigger: "blur" }
  ],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);

function handleRegister() {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      register(registerForm.value).then(res => {
        const username = registerForm.value.username;
        ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", "系统提示", {
          dangerouslyUseHTMLString: true,
          type: "success",
        }).then(() => {
          router.push("/login");
        }).catch(() => {});
      }).catch(() => {
        loading.value = false;
        if (captchaEnabled) {
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
      registerForm.value.uuid = res.uuid;
    }
  });
}

getCode();
</script>

<style lang='scss' scoped>
// .register {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   background-image: url("../assets/images/login-background.jpg");
//   background-size: cover;
// }
// .title {
//   margin: 0px auto 30px auto;
//   text-align: center;
//   color: #707070;
// }

// .register-form {
//   border-radius: 6px;
//   background: #ffffff;
//   width: 400px;
//   padding: 25px 25px 5px 25px;
//   .el-input {
//     height: 40px;
//     input {
//       height: 40px;
//     }
//   }
//   .input-icon {
//     height: 39px;
//     width: 14px;
//     margin-left: 0px;
//   }
// }
// .register-tip {
//   font-size: 13px;
//   text-align: center;
//   color: #bfbfbf;
// }
// .register-code {
//   width: 33%;
//   height: 40px;
//   float: right;
//   img {
//     cursor: pointer;
//     vertical-align: middle;
//   }
// }
// .el-register-footer {
//   height: 40px;
//   line-height: 40px;
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   text-align: center;
//   color: #fff;
//   font-family: Arial;
//   font-size: 12px;
//   letter-spacing: 1px;
// }
// .register-code-img {
//   height: 40px;
//   padding-left: 12px;
// }
  // input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    //     -webkit-text-fill-color: #ededed !important;
    //     -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    //     background-color:transparent;
    //     background-image: none;
    //     transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    // }
    input {
        background-color:transparent;
    }
    /* Change the white to any color ;) */


/* 重置 WebKit 内核浏览器的自动填充样式 */
// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,

// input:-webkit-autofill:active {
//   background-color: transparent;
//   transition: background-color 5000s ease-in-out 0s; /* 这个过渡用于阻止背景颜色变化 */
//   -webkit-text-fill-color: #000; /* 设置文本颜色 */
//   caret-color: #000; /* 设置光标颜色 */
// }

// /* 重置 Firefox 浏览器的自动填充样式 */
// input[type="password"] {
//   background-image: -moz-linear-gradient(white, white);
//   background-repeat: repeat-x;
//   border-radius: 4px;
//   border: 1px solid #bdc3c7;
//   background-color: transparent;
//   box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
//   color: #333;
// }

// /* 重置 Edge 和 IE 浏览器的自动填充样式 */
// input[type="password"],
// input:-ms-input-placeholder {
//   background-color: transparent;
//   color: #333;
// }

/* 重置 Safari 浏览器的自动填充样式 */
// input:-internal-autofill-selected {
//   background-color: transparent !important;
//   color: #333 !important;
// }

/* 通用的样式重置 */
input {
  // background-color: #fff;
  color: #333;
}
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/images/login-background.jpg");

  background-image: url("../assets/images/pexels-webbshow-2406397.jpg");

  // background-image: url("../assets/images/pexels-lindsey-k-846449-1731447.jpg");

  // background-image: url("../assets/images/pexels-eberhardgross-26853160.jpg");

  // background-image: url("../assets/images/pexels-eberhardgross-4067902.jpg");

  background-size: cover;
}
h3 {
      color: #ffffff90;
      // color: #312f2f;
      margin-top: 5%;
      font-weight: 550;
    }
    .el-form-item__content{
      margin-top: 3%;
    }
    span {
      // color: #fff;
      color: #303133;
      align-content: center;
    }
    ::v-deep .el-input--medium {
    font-size: 14px;
    background: transparent!important;;
    background: rgba(255, 255, 255) !important;
    }
    // input {
    //   border: 0;
    //   width: 60%;
    //   font-size: 15px;
    //   color: #fff;
    //   background: transparent!important;
    //   border-bottom: 2px solid #fff;
    //   // padding: 5px 10px;
    //   outline: none;
    //   // margin-top: 10px;
    // }
    ::v-deep input {
      border: 0;
      // width: 60%;
      font-size: 15px;
      // color: #fff;
      background: transparent!important;
      // border-bottom: 2px solid #fff;
      // background-color: aliceblue;
      // padding: 5px 10px;
      outline: none;
      // margin-top: 10px;
    }
     .login_box {
      // width: 30%!important;
      width: 400px!important;
      height: 450px!important;
      background: rgba(0, 0, 0, 0.6);
      /*rgba设置透明层*/
      background-color: #ffffff21!important;
      /*八位颜色位设置透明层*/
      // margin: auto;
      // margin-top: 10%;
      // text-align: center;
      border-radius: 10px;
      // padding: 50px 50px;
    }
    .el-button_c {
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
    .el-button_c:hover,
    .el-button_c:active {
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
    ::v-deep .el-form-item--medium .el-form-item__content {
    line-height: 36px;
    margin-bottom: 7px!important;
}
.title {
  margin: 0px auto 23px auto;
  text-align: center;
  // color: #707070;
  // color: #312f2f;
  color: #2d2b2b;
}
::v-deep .el-form-item--default  .el-form-item__content {
    line-height: 36px;
    margin-bottom: 7px!important;
    display: block!important;
}

.register-form {
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
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  // width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
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
.register-code-img {
  height: 38px;
}
.captcha-form-item_a{
  // margin-left: 20px;
  width: 565px;
}
// .el-button_a{
//   background-image: linear-gradient(to right, #e5666b, #330867) !important;
//   border-radius: 1px;
// }
// .el-button_b{
//   background-image: linear-gradient(to right, #e5666b, #330867) !important;
//   border-radius: 1px;
// }
/* CSS */
.button-group {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 平均分配空间，使按钮并排显示 */
  align-items: center; /* 垂直居中对齐 */
  margin-top: 1rem; /* 上方留出一定的间距 */
}

// .el-button_a, .el-button_b {
//   width: calc(45% - 10px); /* 减去间距，使总宽度为90% */
//   border-radius: 5px; /* 圆角 */
//   transition: all 0.3s ease; /* 过渡动画 */
// }

// .el-button_a {
//   background-color:  white;/* 背景颜色 */
//   // color: white; /* 文字颜色 */
//   height: 20px;
//   // display: flex;        /* 使用 Flexbox 布局 */
//   justify-content: center; /* 水平居中 */
//   align-items: center;  /* 垂直居中 */
//   height: 100%;         /* 确保按钮高度被使用 */
// }

// .el-button_b {
//   background-color:  white;/* 背景颜色 */
//   // color: white; /* 文字颜色 */
//   height: 20px;
//   // display: flex;        /* 使用 Flexbox 布局 */
//   justify-content: center; /* 水平居中 */
//   align-items: center;  /* 垂直居中 */
//   height: 100%;         /* 确保按钮高度被使用 */
// }
.el-button_a {
  position: relative; /* 设置按钮为相对定位 */
  background-color:  white;/* 背景颜色 */
  text-align: center; /* 水平居中文本 */
  border-color: white;/* 背景颜色 */
  border-radius: 0px;
  margin-top: 0px;
  // padding-top:0px ;
  margin-bottom: 0px;
  // padding-bottom: 0px;
    //  margin-left: 0px; 
    // width: 565px;

}
.el-button_b {
  position: relative; /* 设置按钮为相对定位 */
  background-color:  white;/* 背景颜色 */
  text-align: center; /* 水平居中文本 */
  border-color: white;/* 背景颜色 */
  border-radius: 0px;
  margin-top: 0px;
  // padding-top:0px ;
  margin-bottom: 0px;
  // padding-bottom: 0px;
  // margin-left: 0px; 
    // width: 200px;

}
.el-button_a_span {
  position: absolute; /* 设置文本容器为绝对定位 */
  top: 50%; /* 向上偏移50% */
  left: 50%; /* 向左偏移50% */
  transform: translate(-50%, -50%); /* 修正偏移，使其真正居中 */
  /* 你也可以添加其他样式，例如文本颜色、字体大小等 */
}


.el-button_b_span {
  position: absolute; /* 设置文本容器为绝对定位 */
  top: 50%; /* 向上偏移50% */
  left: 50%; /* 向左偏移50% */
  transform: translate(-50%, -50%); /* 修正偏移，使其真正居中 */
  /* 你也可以添加其他样式，例如文本颜色、字体大小等 */
}
.el-button_a:hover, .el-button_b:hover {
  opacity: 0.8; /* 鼠标悬停时的透明度 */
}

.el-button_a:active, .el-button_b:active {
  transform: translateY(2px); /* 鼠标按下时的效果 */
}
// .el-button_a_span{
//   line-height: 50%;
// }
// .el-button_b_span{
//   line-height: 50%;
// }
.captcha-form-item_confirmPassword{
  // margin-bottom: 5px;
  // padding-bottom: 5px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.el-form-item_code{
  margin-bottom: 0px;
  padding-bottom: 0px;
}
</style>
