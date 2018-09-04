<template>
    <div class="FComment" >
      <div class="avatar">
          <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像">
      </div>
      <div class="container">
        <div class="header">
            <div class="msg">
                <div class="name">the_J</div>
                <div class="time">18-7-29 17:23</div>
            </div>
            <div class="identity">
                <img src="../../static/images/me/auth.png" alt="auth">
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
          <div class="comment"  @click="showSecondComment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">1评论</div>
           <div class="like"><img src="/static/images/index/like.png" alt="" class="likeIcon">6赞</div>
        </div>
        <div class="secondComments">
          <div class="container" @click="showSecondComment">
              <span class="from">光 </span>回复<span class="to"> 煮的米</span>: <span class="content">
                开门，查水表！！
              </span>
          </div>
        </div>
      </div>
        
    </div>
</template>

<script>
export default {
  components: {},
  methods: {
    showSecondComment() {
      this.$emit("showSecondComment");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.FComment {
  position: relative;
  padding: 10rpx 20rpx;
  margin: 10px;
  .avatar {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .container {
    box-sizing: border-box;
    padding-left: 80rpx;
    border-bottom: 2rpx solid #dddddd;
    .header {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      height: 100rpx;
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
        width: 40rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        border-radius: 20rpx;
        align-self: flex-start;
        margin-top: 10rpx;
        color: #ffffff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .report {
        position: absolute;
        right: 40rpx;
        img {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .content {
      .message {
        font-size: 12px;
        .label {
          color: $identityBg;
          display: inline-block;
        }
      }
      .images {
        padding: 10rpx 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        img {
          width: 180rpx;
          height: 180rpx;
          margin: 0 6rpx;
        }
      }
    }
    .footer {
      padding: 10rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .like {
        font-size: 20rpx;
        .likeIcon {
          width: 30rpx;
          height: 30rpx;
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
    .secondComments {
      width: 100%;
      overflow: auto;
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
    }
  }
}
</style>

