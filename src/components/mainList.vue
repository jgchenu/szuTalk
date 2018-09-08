<template>
    <div class="talkList">
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
          <div class="time">2018-7-29 17:23</div>
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
  border-bottom: 4rpx solid #cccccc;
  padding: 20rpx 20rpx;
  margin: 10px;
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
        background-color: rgba($color: #000000, $alpha: 0.2);
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
    justify-content: space-between;
    align-items: center;
    .like {
      font-size: 24rpx;
      font-weight: bold;
      display: flex;
      align-items: center;
      .likeIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
    .comment {
      @extend .like;
      .commentIcon {
        @extend .likeIcon;
      }
    }
  }
}
</style>

