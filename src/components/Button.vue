<template>
    <div class="button">
        {{buttonText}}
    </div>
</template>

<script>
export default {
  props: ["buttonText"]
};
</script>

<style lang="scss">
@import "./../style/vars.scss";
.button {
  height: 80rpx;
  line-height: 80rpx;
  padding: 4rpx 60rpx;
  text-align: center;
  background-color: $identityBg;
  color: #ffffff;
  display: inline-block;
  border-radius: 10rpx;
  font-size: 34rpx;
  font-weight: bold;
  box-shadow: 0 0 8rpx #aaaaaa;
}
</style>

