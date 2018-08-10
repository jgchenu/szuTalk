<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
      </div>
      <div class="apply">
        <div class="applyPerson">
          <span class="from">光 </span>回复<span> 你</span>:
        </div>
        <div class="time">2018/7/29 10:14</div>
      </div>
      <div class="label">
        学生
      </div>
    </div>
    <div class="content">
        我在马路边捡到一分钱，把它交到警察叔叔手里面~
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
@import "./../style/vars.scss";
.container {
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  box-shadow: 0 2rpx 4rpx #bbbbbb; 
  .header {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 20rpx;
      img {
        box-shadow: 0 0 4rpx #bbbbbb;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }
    .apply {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .applyPerson {
        margin-bottom: 6rpx;
      }
      .time {
        font-size: 22rpx;
        color: #dddddd;
      }
    }
    .label {
      align-self: flex-start;
      background-color: $identityBg;
      color: #ffffff;
      padding: 2rpx 10rpx;
      border-radius: 10rpx;
      font-size: 24rpx;
      text-align: center;
      margin-top: 12rpx;
    }
  }
  .content{
    font-size: 26rpx;
    padding: 20rpx 0;
  }
}
</style>

