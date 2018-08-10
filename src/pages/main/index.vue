<template>
  <div class="container">
      <div class="header">
            <img class="avatar" src="http://test.jgchen.xin/static/images/2.jpg" alt="头像" >
            <div class="msg"><div class="name">the_J的主页</div> <div class="label">学生</div></div>
            <div class="like"><img class="likeIcon" src="/static/images/me/no-like.png" alt="点赞"><div class="likeText">获得赞：<span>66</span></div></div>
      </div>
      <div class="content">
        <mainList></mainList>
        <mainList></mainList>
        <mainList></mainList>

      </div>
  </div>
</template>

<script>
import mainList from "../../components/mainList";
export default {
  components: {
    mainList
  },
  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 160rpx;
    width: 100%;
    background: -webkit-gradient(
      linear,
      0 0,
      100% 0,
      from($meHeaderBgLeft),
      to($meHeaderBgRight)
    );
    .avatar {
      height: 120rpx;
      width: 120rpx;
      border-radius: 50%;
      box-shadow: 0 0 30rpx #ffffff;
    }
    .msg {
      color: #ffffff;
      .name {
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      .label {
        text-align: center;
        width: 100rpx;
        padding: 4rpx 8rpx;
        border-radius: 6rpx;
        background-color: $identityBg;
      }
    }
    .like {
      text-align: center;
      color: #ffffff;
      .likeIcon {
        width: 50rpx;
        height: 50rpx;
      }
      .likeText {
        span {
          color: $coinColor;
        }
      }
    }
  }
  .content {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

