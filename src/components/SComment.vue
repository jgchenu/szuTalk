<template>
  <div class="container">
          <span class="from">光 </span>回复<span class="to"> 煮的米</span>: <span class="content">
            开门，查水表！！
          </span>
  </div>

</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>
@import "./../style/vars.scss";
.container {
  box-sizing: border-box;
  width: 100%;
  padding: 10rpx;
  font-size: 24rpx;
  .from {
    color: $identityBg;
    font-weight: bold;
  }
  .to {
    @extend .from;
  }
}
</style>

