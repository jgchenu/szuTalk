<template>
  <div class="container">
              <div class="relTalk" @click="relTalk"><img src="/static/images/bottom/talk.png" alt=""><div class="talkText">说说</div></div>
              <div class="relTask" @click="relTask"><img src="/static/images/bottom/task.png" alt=""><div class="taskText">任务</div></div>
              <div class="express" @click="relExpress"><img src="/static/images/bottom/express.png" alt=""><div class="expressText">快递</div></div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },
  methods: {
    relTalk() {
      wx.navigateTo({ url: "../relTalk/main" });
    },
    relTask() {
      wx.navigateTo({ url: "../relTask/main" });
    },
    relExpress() {
      wx.navigateTo({ url: "../express/main" });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  width: 100%;
  display: flex;
  .relTalk {
    margin-top: 10rpx;
    text-align: center;
    flex: 1;
    img {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .relTask,
  .express {
    @extend .relTalk;
    border-right: none;
  }
}
</style>

