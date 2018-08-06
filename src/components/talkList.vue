<template>
    <div class="talkList">
        <div class="header">
            <div class="avatar">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像">
            </div>
            <div class="msg">
                <div class="name">the_J</div>
                <div class="time">17:23</div>
            </div>
            <div class="identity">
                学生
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.talkList {
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .msg {
      width: 100rpx;
      text-align: center;
      line-height: 40rpx;
      .name {
        font-size: 30rpx;
        vertical-align: top;
      }
      .time {
        font-size: 20rpx;
        color: #dddddd;
      }
    }
    .identity {
      width: 80rpx;
      height: 40rpx;
      line-height: 40rpx;
      background-color: rgba(93, 172, 247, 0.678);
      text-align: center;
      border-radius: 8rpx;
    }
  }
}
</style>

