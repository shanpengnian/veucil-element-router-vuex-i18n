<template>
  <div id="app">
    <div id="Login">
      <el-container>
        <el-header height="68px">
          <div class="logo">
            <el-image
              style="width: 24px; height: 24px"
              :src="require('@/img/logo.png')"
            >
            </el-image>
            <div class="logo_name">LOGO</div>
          </div>
          <div>
            <el-dropdown
              trigger="click"
              placement="bottom"
              @command="lang_change"
            >
              <div class="el-dropdown-link lang-menu">
                <div
                  class="iconfont icon-diqiu earth"
                  style="fontsize: 20px"
                ></div>
                {{ lang }}<i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="英文">英文</el-dropdown-item>
                <el-dropdown-item command="中文">中文</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "中文",
    };
  },
  created() {
    const lang = this.cookie.get("lang");
    if (lang && lang === "en") {
      this.lang = "英文";
    }
  },
  methods: {
    lang_change(value) {
      value === "英文"
        ? (() => {
            this.$i18n.locale = "en";
            this.set_cookie("lang", "en", 6);
          })()
        : (() => {
            this.$i18n.locale = "cn";
            this.set_cookie("lang", "cn", 6);
          })();
      this.lang = value;
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  min-height: 100%;
}

#Login {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-header {
    box-shadow: 0px 3px 3px rgba(0, 82, 204, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
  }

  .el-main {
    height: 100%;
    position: relative;
    background: url(./img/login_bg.png) no-repeat bottom center / 100% auto;
  }

  .logo {
    display: flex;
    align-items: center;
    height: 100%;

    .logo_name {
      color: #2878ff;
      font-weight: 700;
      font-size: 18px;
      margin-left: 10px;
    }
  }

  .lang-menu {
    display: flex;
    align-items: center;
  }

  .earth {
    margin-right: 5px;
  }

  .el-dropdown {
    cursor: pointer;
    position: relative;
  }

  .el-icon-caret-bottom {
    margin-left: 5px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
