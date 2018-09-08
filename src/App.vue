<script>
import mta from "mta-wechat-analysis";
export default {
  created() {
    // 调用API从本地缓存中获取数据
  },
  onLaunch(options) {
    mta.App.init({
      appID: "500640997",
      eventID: "500640998",
      statPullDownFresh: true,
      statShareApp: true,
      statReachBottom: true
    });
  }
};
</script>

<style lang="scss">
@import "./style/default.scss";
</style>


