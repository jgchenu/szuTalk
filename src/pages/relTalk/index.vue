<template>
  <div class="container">
        <div class="typeText">
          <textarea  cols="30" rows="10" placeholder="写下在深大遇到的趣事吧~"></textarea>
        </div>
        <div class="actionIcon">
          <div class="addPic"><img src="/static/images/rel/addPic.png" alt="添加图片"></div>
          <div class="addTopic"><img src="/static/images/rel/addTopic.png" alt="添加话题"></div>
        </div>
        <div class="images">
            <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/4.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/5.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/6.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/7.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/8.jpg" alt="头像" class="imageItem">
            <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像" class="imageItem">
        </div>
        <div class="subButtonWrap"> <Button buttonText="发布" /></div>
         
  </div>
</template>

<script>
import Button from "../../components/Button";
export default {
  components: { Button },

  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  overflow: hidden;
  .typeText {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
  }
  .actionIcon {
    @extend .typeText;
    display: flex;
    align-items: center;
    border-bottom: 4rpx dotted #dddddd;
    .addPic,
    .addTopic {
      width: 80rpx;
      height: 80rpx;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .addPic {
      margin-right: 40rpx;
    }
  }
  .images {
    background: #ffffff;
    height: 200rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    line-height: 200rpx;
    box-shadow: 0 4rpx 10rpx #aaaaaa;
    &::-webkit-scrollbar {
      display: none;
    }
    .imageItem {
      vertical-align: middle;
      margin: 0 20rpx;
      height: 140rpx;
      width: 140rpx;
    }
  }
  .subButtonWrap{
    margin-top: 120rpx;
    width: 100%;
    text-align: center;
  }
}
</style>



