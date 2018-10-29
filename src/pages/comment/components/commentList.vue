<template>
  <div class="container" @click="goDetail">
  <div  v-if="List.type===1" class="section">
      <div class="header">
        <div class="apply">
          <div class="applyPerson">
            <span class="from">{{List.data.user.name}} </span>回复<span> 你</span>:
          </div>
        </div>
      </div>
      <div class="content">
        <div class="applyContent">{{List.data.comment.summary}}</div>
        <div class="talkContent">
          <div class="msg">我:{{List.data.say.summary}}</div>
        </div>
        <div class="time">{{computedTime}}</div>
      </div>
    </div>
  
  <div  v-if="List.type===2"  class="section">
    <div class="header">
      <div class="apply">
       <div class="applyPerson" >
          <span class="from">{{List.data.user.name}} </span>回复<span> 你</span>:
      </div>

      </div>
    </div>
    <div class="content">
      <div class="applyContent">{{List.data.comment.summary}}</div>
      <div class="talkContent">
        <div class="msg">我:{{List.data.say.comment.summary}}</div>
      </div>
        <div class="time">{{computedTime}}</div>
    </div>
  </div>



  <div  v-if="List.type===3"  class="section">
    <div class="header">
      <div class="apply">
        <div class="applyPerson" >
          <span class="from" >{{List.data.user.name}} </span>点赞<span> 你的说说</span>:
        </div>
      </div>
    </div>
    <div class="content">
      <div class="talkContent">
        <div class="msg">我:{{List.data.say.summary}}</div>
      </div>
        <div class="time">{{computedTime}}</div>
    </div>
    </div>

  <div  v-if="List.type===4"  class="section">
    <div class="header">
      <div class="apply">
      <div class="applyPerson"  v-if="List.type===4">
          <span class="from" >{{List.data.user.name}} </span>点赞<span> 你</span>:       
        </div>
      </div>
    </div>
    <div class="content">
      <div class="talkContent">
        <div class="msg">我:{{List.data.say.summary}}</div>
      </div>
        <div class="time">{{computedTime}}</div>
    </div>
    </div>
  </div>
</template>

<script>
const { formatTime } = require("@/utils/index.js");

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
  computed: {
    computedTime() {
      return formatTime(this.List.updated_at);
    }
  },
  methods: {
    goDetail() {
      wx.navigateTo({
        url: `../detail/main?id=${this.List.data.say.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.container {
  padding: 30rpx 30rpx 10rpx 30rpx;
  box-sizing: border-box;
  box-shadow: 0 2rpx 4rpx #aaaaaa;
  background-color: #ffffff;
  margin:0 0 16rpx 0;
  .section {
    background: #ffffff;
    .header {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      background: #ffffff;
      .apply {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .applyPerson {
          margin-bottom: 6rpx;
          .from {
            color: $meHeaderBgRight;
            font-weight: bold;
          }
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
      background: #ffffff;
      font-size: 24rpx;
      padding: 15rpx 0;
      .applyContent {
        background: #ffffff;
        padding-bottom: 15rpx;
        color: #000000;
        word-wrap: break-word;
        overflow: auto;
      }
      .talkContent {
        width: 100%;
        box-sizing: border-box;
        background: $gray;
        padding: 24rpx 0 24rpx 10rpx;
        word-wrap: break-word;
        overflow: auto;
        .msg {
          color: #6B6B6B;
        }
      }
      .time {
        font-size: 22rpx;
        color: #dddddd;
        text-align: left;
        color: #aaaaaa;
        margin-top: 20rpx;
      }
    }
  }
}
</style>

