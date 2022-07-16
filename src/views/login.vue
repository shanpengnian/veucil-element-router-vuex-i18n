<template>
  <el-form :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
    <div class="login_title">{{ $t("lang.login") }}</div>
    <el-form-item prop="telephone">
      <el-input
        type="text"
        v-model="ruleForm.telephone"
        :placeholder="$t('lang.username')"
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        :placeholder="$t('lang.password')"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="remember_forget">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox :label="$t('lang.remember')" name="type"></el-checkbox>
      </el-checkbox-group>
      <div class="forget_mm" @click="$router.push('/forget')">
        {{ $t("lang.forget") }}
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        class="submit"
        type="primary"
        @click="login"
        @keyup.enter="login"
        >{{ $t("lang.submit") }}
      </el-button>
    </el-form-item>
    <div class="register" @click="$router.push('/register')">
      {{ $t("lang.register") }}
    </div>
  </el-form>
</template>

<script>
import { apiAddress } from '@/api/index'
export default {
  name: "Login",
  data() {
    return {
      name: "lang.login",
      ruleForm: {
        telephone: "",
        password: "",
        type: false,
      },
      rules: {
        telephone: [
          {
            trigger: "blur",
          },
        ],
        password: [
          {
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      let params = {
        tele: this.ruleForm.telephone,
        password: this.ruleForm.password,
      };
      console.log(JSON.stringify(params))
      apiAddress({
        type: 0,
        sort: 1
      }).then(res => {
        // 获取数据成功后的其他操作
          this.$message.success("登录成功！");
          this.$store.commit('login',res.data)
          // 登录成功跳入主页
          this.$router.push("/");
      })

      return
      // 账号登录
      this.$axios({
        method: "get",
        url: "http://localhost:8089",
        params: params,
      }).then((res) => {
        let returnData = res.data;
        if (returnData.code === 200 && returnData.data.data.length > 0) {
          if (this.ruleForm.type) {
            // 限时登录
            this.set_cookie(
              "userToken",
              this.encryption(JSON.stringify(params)),
              6
            );
          }
          this.$message.success("登录成功！");
          // 临时登录
          this.set_cookie("onceToken", this.encryption(JSON.stringify(params)));
          this.$store.commit("setUserState");
          // 登录成功跳入主页
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#Login {
  .demo-ruleForm {
    width: 400px;
    height: 430px;
    box-shadow: 0px 0px 20px rgba(0, 82, 204, 0.3);
    padding: 50px 30px 0 30px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 10%;
  }

  .el-form-item__content {
    margin: 0;
  }

  /deep/.el-input__inner {
    width: 335px;
    height: 40px;
    border-color: rgba(220, 223, 230, 1);
    background-color: rgba(244, 244, 244, 1);
    color: #666666;
    border-width: 1px;
    border-style: solid;
  }

  .login_title {
    text-align: left;
    margin-bottom: 15px;
  }

  .submit {
    box-shadow: 0px 3px 20px rgb(0 82 204 / 30%);
    font-size: 16px;
    color: #ffffff;
    background-color: rgba(0, 82, 204, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 82, 204, 1);
    border-radius: 3px;
    width: 100%;
    height: 44px;
  }

  .remember_forget /deep/.el-form-item__content {
    display: flex;
    justify-content: space-between;
    color: #0052cc;
  }

  /deep/.el-checkbox__label {
    color: #0052cc;
  }

  .register {
    color: #0052cc;
  }

  .forget_mm,
  .register {
    cursor: pointer;
  }

  .remember_forget::after,
  .remember_forget /deep/.el-form-item__content::after,
  .remember_forget::before,
  .remember_forget /deep/.el-form-item__content::before {
    display: none;
  }
}
</style>
