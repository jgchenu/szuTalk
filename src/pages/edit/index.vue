<template>
  <div class="container">
    <div class="section" @click="avatarAction">
      <span class="Text">头像</span>
      <div class="rightSection">
      <img class="Pic" :src="userInfo.avatar_url" alt="头像" >
      <img src="/static/images/me/right.png" alt=">" class="right">
      </div>

      </div>
    <div class="section" @click="goEditDetail">
      <span class="Text">昵称</span>
      <div class="rightSection">
      <span class="name">{{userInfo.name}}</span>
      <img src="/static/images/me/right.png" alt=">" class="right">
    </div>
    </div>
  </div>
</template>

<script>
import vuexMixin from "@/mixin/vuex.js";
const qcloud = require("@/wafer2/index.js");
const util = require("@/utils/index.js");
const { host } = require("@/config.js");

export default {
  mixins: [vuexMixin],
  data() {
    return {};
  },
  components: {},

  methods: {
    goEditDetail() {
      wx.navigateTo({
        url: "../editDetail/main"
      });
    },
    uploadImage() {
      new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["compressed","original"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            util.showBusy("上传中", 20000);
            resolve(res.tempFilePaths[0]);
          }
        });
      }).then(
        path => {
          qcloud.upload({
            url: `${host}/user/${this.userInfo.id}`,
            filePath: path,
            header: {
              accept: "application/json" // 默认值
            },
            name: "avatar",
            formData: {
              _method: "PUT",
              name: this.userInfo.name
            },
            success: res => {
              wx.hideToast();
              if (res.statusCode === 200) {
                this.setUserInfo(res.data.data.data);
              }
            },
            fail: error => {
              console.log(error);
            }
          });
        },
        tip => {
          util.showModel("提醒", tip);
        }
      );
    },
    avatarAction() {
      wx.showActionSheet({
        itemList: ["预览", "更换图片"],
        success: res => {
          if (res.tapIndex === 0) {
            this.preImage();
          } else if (res.tapIndex === 1) {
            this.uploadImage();
          }
        }
      });
    },
    preImage() {
      wx.previewImage({
        current: this.userInfo.avatar_url, // 当前显示图片的http链接
        urls: [this.userInfo.avatar_url] // 需要预览的图片http链接列表
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  width: 100%;
  .section {
    height: 160rpx;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #dddddd;
    .Text {
      flex: 1;
      font-size: 32rpx;
      color: #000;
      margin-left: 40rpx;
    }
    .rightSection {
      flex: 3;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img.Pic {
        height: 110rpx;
        width: 110rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }
      span.name {
        font-size: 34rpx;
        font-weight: bold;
        color: $identityBg;
        margin-right: 40rpx;
      }
      img.right {
        height: 50rpx;
        width: 50rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>

