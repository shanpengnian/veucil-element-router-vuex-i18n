<template>
  <div id="Index">
    <!-- <router-link to="/register">to</router-link> -->
    <el-button type="primary" @click="outLogin">{{ $t("lang.logout") }}</el-button>
    <el-button type="primary" @click="selectData">{{ $t("lang.test_data") }}</el-button>
    <el-row>
      <el-col :span="24">
        <el-image :src="src" class="indeximg"></el-image>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { apiAddressTwo } from '@/api/index'
export default {
  data() {
    return {
      name: "lang.index",
      src:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.leadto.com.cn%2Fuploads%2Fsoft%2F%E7%BD%91%E7%AB%99%E6%AD%A3%E5%9C%A8%E5%BB%BA%E8%AE%BE%E4%B8%AD%E6%A8%A1%E6%9D%BF1%2Fimages%2Fsite_under_main.jpg&refer=http%3A%2F%2Fwww.leadto.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652111631&t=047c3040954f8c51d76924d140de4650"
    };
  },
  methods:{
    outLogin(){
       this.$message.success("已退出");
       this.$store.commit('logout')
       this.$router.push("/login");
    },
    selectData(){
      apiAddressTwo().then(res=>{
            this.$message.success(res.data);
      })
    }
  }
};
</script>
<style lang="less" scoped>
 .indeximg{
      margin-top: 10vh;
   }
</style>
