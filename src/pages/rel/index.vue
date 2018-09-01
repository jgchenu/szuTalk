<template>
  <div class="container">
      <div class="buttons">
              <div class="relTalk" @click="relTalk"><img src="/static/images/bottom/talk.png" alt=""><div class="talkText">说说</div></div>
              <div class="relTask" @click="relTask"><img src="/static/images/bottom/task.png" alt=""><div class="taskText">任务</div></div>
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
  .buttons {
    width: 340rpx;
    height: 200rpx;
    border: 4rpx dotted $identityBg;
    border-radius: 80rpx;
    transition: transform 0.8s, opacity 0.8s;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    .relTalk {
      margin-top: 10rpx;
      flex: 1;
      text-align: center;
      border-right: 4rpx dotted $identityBg;
      img {
        width: 100rpx;
        height: 100rpx;
      }
    }
    .relTask {
      @extend .relTalk;
      border-right: none;
    }
  }
}
</style>

