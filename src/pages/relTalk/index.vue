<template>
  <div class="container">
        <div class="typeText">
          <textarea  cols="30" rows="10" placeholder="写下在深大遇到的趣事吧~"></textarea>
        </div>
        <div class="actionIcon">
          <div class="addPic" @click="chooseImage"><img src="/static/images/rel/addPic.png" alt="添加图片"></div>
          <div class="addTopic"><img src="/static/images/rel/addTopic.png" alt="添加话题"></div>
        </div>
        <div class="images" @click="preImage">
            <div class="imageItem" v-for="(item,index) in imagePaths" :key="index">
              <img :src="item" alt="image" :data-id="index">
              <div class="delete" @click.stop="deleteImage(index)">x</div>
            </div>
        </div>
        <div class="subButtonWrap"> <Button buttonText="发布" /></div>
         
  </div>
</template>

<script>
import Button from "../../components/Button";
export default {
  components: { Button },

  data() {
    return {
      imagePaths: []
    };
  },
  methods: {
    chooseImage() {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.imagePaths = this.imagePaths.concat(res.tempFilePaths);
        }
      });
    },
    preImage(e) {
      if (this.imagePaths.length) {
        let id = e.target.dataset.id;
        if (id === undefined) {
          return;
        }
        wx.previewImage({
          current: this.imagePaths[id], // 当前显示图片的http链接
          urls: this.imagePaths // 需要预览的图片http链接列表
        });
      }
    },
    deleteImage(index) {
      this.imagePaths.splice(index, 1);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";

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
      display: inline-block;
      position: relative;
      vertical-align: middle;
      margin: 0 20rpx;
      height: 140rpx;
      width: 140rpx;
      img {
        width: 100%;
        height: 100%;
      }
      .delete {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        background-color: $meContentBg;
        line-height: 20px;
        right: 0;
        top: 0;
      }
    }
  }
  .subButtonWrap {
    margin-top: 120rpx;
    width: 100%;
    text-align: center;
  }
}
</style>



