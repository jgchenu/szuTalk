<template>
  <div class="container">
    <!-- <div class="header">
      <div class="avatar">
        <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
      </div>
      <div class="apply">
        <div class="applyPerson">
          <span class="from">{{List.data.user.name}} </span>回复<span> 你</span>:
        </div>
        <div class="time">{{List.updated_at}}</div>
      </div>
    </div> -->
    <div class="content">
      <!-- <div class="image"></div> -->
      <div class="msg">{{List.content}}</div>
      <!-- <div class="talkContent">
        <div class="msg">我:{{List.data.say.summary}}</div>
      </div> -->
    </div>
  </div>

</template>

<script>
export default {
  props: {
    List: {
      type: Object,
      default: {}
    }
  },
  components: {},
  onLoad() {},
  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.container {
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  // box-shadow: 0 2rpx 4rpx #bbbbbb;
  border-bottom: 1rpx solid #dddddd;
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
  .content {
    font-size: 26rpx;
    padding: 20rpx 0;
    color: #aaaaaa;
  }
  .talkContent {
    margin-top: 14rpx;
    width: 100%;
    box-sizing: border-box;
    background: $gray;
    padding: 30rpx 0;
    line-height: 50rpx;
    padding-left: 20rpx;
    font-size: 28rpx;
    .title {
      color: #000;
      font-weight: bold;
    }
    .msg {
      color: #bbbbbb;
    }
  }
}
</style>

