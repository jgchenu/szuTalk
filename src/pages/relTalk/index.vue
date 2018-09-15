<template>
  <div class="container">
        <div class="typeText">
          <!-- <input type="text" class="topicInput" v-model="topic" v-show="topic"> -->
          <textarea  cols="30" rows="10" placeholder="写下在深大遇到的趣事吧~" v-model="content"></textarea>
        </div>
        <div class="actionIcon">
          <div class="addPic" @click="chooseImage" v-show="imagePaths.length!==9"><img src="/static/images/rel/addPic.png" alt="添加图片"></div>
          <!-- <div class="addTopic"><img src="/static/images/rel/addTopic.png" alt="添加话题"></div> -->
        </div>
        <div class="images" @click="preImage"  v-show="imagePaths.length">
            <div class="imageItem" v-for="(item,index) in imagePaths" :key="index">
              <img :src="item" alt="image" :data-id="index">
              <div class="delete" @click.stop="deleteImage(index)"><img src="../../../static/images/rel/delete.png" alt=""></div>
            </div>
        </div>
        <!-- <div class="subButtonWrap" @click="rel"> <Button buttonText="发布" /></div> -->
        <div class="subButtonWrap">
        <form report-submit="true" @submit="formSubmit" >
          <button formType="submit" type="default"  class="submitButton">发布</button>
        </form>
        </div>

  </div>
</template>

<script>
// import Button from "../../components/Button";
const { host } = require("@/config.js");
const { http, uploadFile } = require("@/utils/http.js");
const util = require("@/utils/index.js");

const qcloud = require("@/wafer2/index.js");
export default {
  // components: { Button },

  data() {
    return {
      imagePaths: [],
      imageIds: [],
      content: ""
    };
  },
  methods: {
    chooseImage() {
      new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 9 - this.imagePaths.length, // 默认9
          sizeType: ["compressed", "original"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            this.imagePaths = this.imagePaths.concat(res.tempFilePaths);
            resolve(res.tempFilePaths);
          }
        });
      }).then(
        paths => {
          for (let i = 0; i < paths.length; i++) {
            uploadFile({
              api: `/image`,
              filePath: paths[i],
              name: "image",
              success: res => {
                if (res.statusCode === 200) {
                  this.imageIds.push(res.data.data.id);
                }
              },
              fail: error => {}
            });
          }
        },
        tip => {
          util.showModel("提醒", tip);
        }
      );
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
      this.imageIds.splice(index, 1);
    },
    formSubmit(event) {
      let reg = new RegExp("\n", "g");
      let str = this.content.replace(reg, "<br>");
      http({
        api: "/say",
        method: "POST",
        data: {
          content: str,
          images: this.imageIds,
          form_id: event.mp.detail.formId
        },
        success: res => {
          if (res.statusCode === 200) {
            util.showSuccess("发布成功");
            this.imagePaths = [];
            this.imageIds = [];
            this.content = "";
            wx.setStorageSync("relData", res.data.data);
            setTimeout(() => {
              wx.switchTab({
                url: "../index/main"
              });
            }, 200);
          }
        }
      });
    }
  }
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
    .topicInput {
      color: $meHeaderBgRight;
    }
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
        width: 30rpx;
        height: 30rpx;
        right: 5rpx;
        top: 5rpx;
        line-height: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .subButtonWrap {
    margin-top: 120rpx;
    width: 100%;
    text-align: center;
    .submitButton {
      height: 80rpx;
      line-height: 80rpx;
      padding: 4rpx 60rpx;
      text-align: center;
      background-color: $identityBg;
      color: #ffffff;
      display: inline-block;
      border-radius: 10rpx;
      font-size: 34rpx;
      font-weight: bold;
      box-shadow: 0 0 8rpx #aaaaaa;
    }
  }
}
</style>



