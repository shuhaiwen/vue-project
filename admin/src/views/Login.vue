<template>
  <div class="login">
    <el-card class="card">
      <div slot="header">
        <span>登录系统</span>
      </div>
      <!-- ref="loginFormRef" 中ref属性指定节点一个id，可以方便调用dom，this.refs.[id]就访问到这个节点
          :model="LoginForm" 使表单绑定数据对象
          :rules="LoginRules" 指定表单验证规则
       -->
      <el-form :model="LoginForm" ref="loginFormRef" label-width="80px" :rules="LoginRules">
        <!-- prop="username" username是loginForm中的username，这需要对应，不能随便写 
            @keyup.native.enter 中指定native，可以使监听原生事件
        -->
        <el-form-item label="用户名" prop="username" @keyup.native.enter="login">
          <el-input
            v-model="LoginForm.username"
            placeholder="admin"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" @keyup.native.enter="login">
          <el-input
            v-model="LoginForm.password"
            placeholder="123456"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {loginReq} from "../network/login";
export default {
  name: "Login",
  data() {
    //验证规则方法
    let checkUsername = (rule, value, callback) => {
      const regUsername = /^[a-zA-Z][\w]{2,9}$/;
      if (regUsername.test(value)) return callback();
      callback(new Error("请输入合法的用户名"));
    };
    let checkPassword = (rule, value, callback) => {
      const regPsw = /^[\w.]{5,15}$/;
      if (regPsw.test(value)) return callback();
      callback(new Error("请输入合法的登陆密码"));
    };
    return {
      LoginForm: {
        username: "admin",
        password: "123456"
      },
      LoginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            validator: checkUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入登陆密码",
            trigger: "blur"
          },
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();//重置表单中输入框内容
    },
    login() {
      //验证登录信息
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error("请输入格式正确的用户名和密码");
        const res = await loginReq(this.LoginForm);
        console.log(res);
        if (!res) return this.$message.error("请求结果无效");
        this.$message.success("登陆成功");
        //保存token
        sessionStorage.setItem('user-info',res.data)
        //验证成功，进入主页
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
 background:linear-gradient(90deg, #36d1dc 0%,#5b86e5 100% );
  height: 100vh; //必须有高度
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 18.75rem;
    margin-left: 0;

    el-form {
      .btns {
        margin-bottom: 0;
        /deep/ .el-form-item__content {
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>
<style>
