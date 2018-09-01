<template>
        <div class="tabBar">
        <div class="index" @click="console.log(1111)">首页</div>
        <div class="me" @click="goDetail">我</div>
        </div>
</template>

<script>
export default {
  mounted() {
    console.log("tabber");
  },
  methods: {
    goDetail() {
      wx.navigateTo({
        url: "../detail/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tabBar {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  line-height: 100rpx;

  z-index: 1111;
  .index.me {
    flex: 1;
  }
}
</style>

