<template>
  <div id="change">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="left"
    >
      <div class="register_title">{{ $t("lang.updataMM") }}</div>
      <el-form-item :label="$t('lang.originMM')" prop="originPass">
        <el-input v-model="ruleForm.originPass"></el-input>
      </el-form-item>
      <el-form-item :label="$t('lang.new_MM')" prop="newPass">
        <el-input v-model="ruleForm.newPass"></el-input>
      </el-form-item>
      <el-form-item :label="$t('lang.check_password')" prop="checkNewPass">
        <el-input type="password" v-model="ruleForm.checkNewPass"></el-input>
      </el-form-item>
      <div class="register_cancle">
        <el-button
          type="primary"
          class="btn_register"
          @click="change"
          @keyup="change"
          >{{ $t("lang.confirm") }}</el-button
        >
        <el-button type="info" plain @click="cancle">{{
          $t("lang.register_cancle")
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var ruleCheckPass = (rule, value, callback) => {
      if (this.ruleForm.checkNewPass == "") {
        callback(new Error("确认密码不能为空"));
      } else if (this.ruleForm.originPass !== this.ruleForm.checkNewPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        originPass: "",
        newPass: "",
        checkNewPass: "",
      },
      rules: {
        originPass: [
          {
            trigger: "blur",
            required: true,
            message: "原密码不能为空",
          },
        ],
        newPass: [
          {
            trigger: "blur",
            required: true,
            message: "新密码不能为空",
          },
        ],
        checkNewPass: [
          {
            trigger: "blur",
            validator: ruleCheckPass,
          },
        ],
      },
      canSend: null,
    };
  },
  methods: {
    cancle() {
      this.$router.push("/login");
    },
    change() {
      let data = this.ruleForm;
      if (
        data.originPass == "" ||
        data.newPass == "" ||
        data.checkNewPass == ""
      ) {
        this.$message.error("数据不能为空");
      } else {
        this.$axios({
          method: "post",
          url: "http://localhost:9999",
          data: {
            oldMM: data.originPass,
            newMM: data.newPass,
            tele: "17396232021",
          },
        }).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#change {
  height: 100%;
  .demo-ruleForm {
    width: 562px;
    height: 671px;
    position: absolute;
    left: 45%;
    top: 50px;
    box-shadow: 0px 5px 20px rgba(0, 82, 204, 0.3);
  }
  .el-input,
  .el-form-item__content,
  .el-input__inner {
    width: 320px;
    height: 36px;
  }
  .register_title {
    height: 74px;
    width: 100%;
    line-height: 74px;
    text-align: center;
    font-size: 22px;
    color: #fff;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 82, 204, 1);
    border-radius: 3px;
    background-color: rgba(0, 82, 204, 1);
    margin-bottom: 50px;
  }
  .el-form-item {
    padding: 0 45px 0 60px;
  }
  .tele .el-input,
  .tele .el-input__inner {
    width: 215px;
  }
  .get_code {
    width: 105px;
    height: 40px;
    padding: 0;
  }
  .code .el-input,
  .code .el-form-item__content,
  .code .el-input__inner {
    width: 114px;
  }
  .register_cancle {
    margin-top: 105px;
    .el-button {
      width: 160px;
      height: 40px;
    }
    .btn_register {
      margin-right: 50px;
    }
  }
  .el-input__icon {
    line-height: 36px;
  }
  .el-form-item__error {
    top: 115%;
  }
  .el-form-item {
    margin-bottom: 40px;
  }
  /deep/.el-form-item__content {
    text-align: start;
  }
}
</style>