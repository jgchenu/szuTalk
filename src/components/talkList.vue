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
        <div class="content">
          <div class="message">
            <div class="label">#南区#</div>发现南区超市门口好多条狗，他们都叫单身狗，突然发现我也skr单身狗。。
          </div>
          <div class="images">
                <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像"> 
                <div class="omitWrap">
                  <img src="/static/images/index/omit.png" alt="omit">
                   <span>9</span>
                </div>          
          </div>
        </div>
        <div class="footer">
          <div class="like"><img src="/static/images/index/like.png" alt="" class="likeIcon">6</div>
          <div class="comment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">3</div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.talkList {
  border: 2rpx solid #dddddd;
  padding: 10rpx 20rpx;
  box-shadow: 0 0 20rpx #bbbbbb;
  margin: 10px;
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
      padding: 0 20rpx;
      text-align: center;
      line-height: 40rpx;
      .name {
        font-size: 30rpx;
        vertical-align: top;
      }
      .time {
        font-size: 12px;
        color: #bbbbbb;
      }
    }
    .identity {
      width: 80rpx;
      height: 40rpx;
      line-height: 40rpx;
      background-color: $identityBg;
      text-align: center;
      border-radius: 20rpx;
      align-self: flex-start;
      margin-top: 10rpx;
      color: #ffffff;
    }
  }
  .content {
    .message {
      font-size: 16px;
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      position: relative;
      padding: 10rpx 0;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      width: 100%;
      height: 200rpx;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 0 10rpx;
      }
      .omitWrap {
        position: absolute;
        right: 30rpx;
        bottom: 20rpx;
        padding: 2rpx;
        background-color: rgba($color: #000000, $alpha: .2);
        font-size: 20rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        border-radius: 4rpx;
        img {
          width: 30rpx;
          height: 30rpx;
          margin: 0 6rpx;
          vertical-align: middle;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .like,
    .comment {
      margin-right: 100rpx;
      display: flex;
      align-items: flex-end;
      .likeIcon,
      .commentIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>

