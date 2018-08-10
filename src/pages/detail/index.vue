<template>
  <div class="container">
    <div class="talkDetail">
      <talkListDetail></talkListDetail>
    </div>
    <div class="commentContent">

    </div>
    <div class="commentInput">
        <input type="text" placeholder="说说你的看法...">
    </div>
  </div>
</template>

<script>
import talkListDetail from "../../components/talkListDetail";
export default {
  components: {
    talkListDetail
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  .commentInput {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    border: 2rpx solid #dddddd;
    box-sizing: border-box;
    padding-left: 40rpx;
    input {
      height: 100%;
      width: 100%;
    }
  }
}
</style>

