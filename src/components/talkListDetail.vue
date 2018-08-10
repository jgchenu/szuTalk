<template>
    <div class="talkList" >
        <div class="header">
            <div class="avatar">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像">
            </div>
            <div class="msg">
                <div class="name">the_J</div>
                <div class="time">18-7-29 17:23</div>
            </div>
            <div class="identity">
                学生
            </div>
            <div class="report"><img src="/static/images/index/report.png" alt="举报"></div>
        </div>
        <div class="content">
          <div class="message">
            <div class="label">#南区#</div>发现南区超市门口好多条狗，他们都叫单身狗，突然发现我也skr单身狗。。
          </div>
          <div class="images">
                <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/4.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/5.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/6.jpg" alt="头像">  
                <img src="http://test.jgchen.xin/static/images/7.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/8.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">      
          </div>
        </div>
        <div class="footer">
          <div class="comment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">1评论</div>
           <div class="like"><img src="/static/images/index/like.png" alt="" class="likeIcon">6赞</div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.talkList {
  position: relative;
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
    .report {
      position: absolute;
      right: 20rpx;
      img {
        width: 40rpx;
        height: 40rpx;
      }
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
      padding: 10rpx 0;
      width: 100%;
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 0 10rpx;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    .like {
      font-size: 24rpx;
      font-weight: bold;
      .likeIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
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

