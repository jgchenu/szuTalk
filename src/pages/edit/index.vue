<template>
  <div class="container">
    <div class="section">
      <span class="Text">头像</span>
      <div class="rightSection">
      <img class="Pic" src="https://dxlfb468n8ekd.cloudfront.net/gsc/QKP62V/00/ed/06/00ed06ee2ecb4fe38e8052c2d2c4b5f2/images/我的/头像_u234.png?token=4ed89b8cb7dc3fa1cd4865d6f7714558" alt="">
      <img src="/static/images/me/right.png" alt="" class="right">
      </div>

      </div>
    <div class="section">
      <span class="Text">昵称</span>
      <div class="rightSection">
      <span class="name">The_J</span>
      <img src="/static/images/me/right.png" alt="" class="right">
    </div>
    </div>
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
@import "../../style/vars.scss";
.container {
  width: 100%;
  .section {
    height: 160rpx;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #dddddd;
    .Text {
      flex: 1;
      font-size: 32rpx;
      color: #000;
      margin-left: 40rpx;
    }
    .rightSection {
      flex: 3;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img.Pic {
        height: 110rpx;
        width: 110rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }
      span.name{
        font-size: 34rpx;
        font-weight: bold;
        color: $identityBg;
        margin-right: 10rpx;

      }
      img.right {
        height: 50rpx;
        width: 50rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>

