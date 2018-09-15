<template>
  <div class="container" v-if="JSON.stringify(detailData)!=='{}'" >
    <div class="talkDetail">
      <talkListDetail :List="detailData" @showFirstComment="showFirstComment" :selfId="selfId" @handleAction="handleAction"></talkListDetail>
    </div>
    <div class="commentContent">
        <FComment @showSecondComment="showSecond" @showApply="showSecond" :List="item" v-for="(item,index) in detailData.comments" :key="index" :commentIndex="index" :selfId="selfId" @handleAction="handleAction"></FComment>
    </div>
    <div class="whiteSpace">

    </div>
    <div class="FcommentInput" >
        <div class="images" @click="preImage" v-show="imagePaths.length">
            <div class="imageItem" v-for="(item,index) in imagePaths" :key="index">
              <img :src="item" alt="image" :data-id="index">
              <div class="delete" @click.stop="deleteImage(index)"><img src="../../../static/images/rel/delete.png" alt=""></div>
            </div>
        </div>
        <div class="sub">
          <img src="/static/images/rel/addPic-no.png" alt="addPic" class="addPicIcon" @click="chooseImage" v-show="imagePaths.length!==3">
          <input type="text" placeholder="说说你的看法..." :focus="Fstatus" v-model="Fcontent" @focus="onFFocus" @blur="onFBlur" cursor-spacing="4">
          <form report-submit="true" @submit="relFComment" >
          <button formType="submit" type="default"  class="subButton">发送</button>
          </form>
        </div>
    </div>

    <div class="commentInputButton" v-show="!Fstatus&&!Sstatus" @click="onFFocus">
        说说你的看法
    </div>   

      <div class="ScommentInput" v-show="Sstatus">
        <div class="sub">
          <input type="text" :placeholder="'回复'+toWho.name+':'" :focus="Sstatus" @blur="onBlur" v-model="Scontent" cursor-spacing="4">
          <form report-submit="true" @submit="relScomment" >
          <button formType="submit" type="default"  class="subButton">发送</button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import talkListDetail from "./components/talkListDetail";
import FComment from "./components/FComment";
const { http, uploadFile } = require("@/utils/http.js");
const qcloud = require("@/wafer2/index.js");
const { host } = require("@/config.js");
const util = require("@/utils/index.js");

export default {
  onLoad(option) {
    // console.log(JSON.stringify(this.detailData));
    const session = qcloud.Session.get();
    const pages = getCurrentPages();
    this.selfId = session.user.id;
    this.id = pages[pages.length - 1].options.id;
    this.loadData();
  },
  onShow() {},
  onUnload() {
    this.resetData();
  },
  onPullDownRefresh() {
    this.loadData();
  },
  components: {
    talkListDetail,
    FComment
  },

  data() {
    return {
      detailData: {},
      imagePaths: [],
      imageIds: [],
      Fstatus: false,
      Sstatus: false,
      Fcontent: "",
      Scontent: "",
      toWho: {},
      id: "",
      selfId: "",
    };
  },
  methods: {
    loadData() {
      http({
        api: `/say/${this.id}`,
        method: "GET",
        success: res => {
          console.log(res);
          if (res.statusCode === 200) {
            this.detailData = res.data.data;
          }
          wx.stopPullDownRefresh();
        },
        fail: err => {
          console.log(err);
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
      this.imageIds.splice(index, 1);
    },
    chooseImage() {
      this.Fstatus = true;
      new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 3 - this.imagePaths.length, // 默认3
          sizeType: ["compressed", "original"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            // if (this.imagePaths.length + res.tempFilePaths.length > 3) {
            //   reject("最多只能上传三张哦");
            //   return;
            // }
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
                console.log(res);
                if (res.statusCode === 200) {
                  this.imageIds.push(res.data.data.id);
                }
              },
              fail: error => {
                console.log(error);
              }
            });
          }
        },
        tip => {
          util.showModel("提醒", tip);
        }
      );
    },
    showFirstComment() {
      this.Fstatus = true;
      this.Sstatus = false;
    },
    showSecond(event) {
      this.toWho = event;
      console.log(event);
      this.Fstatus = false;
      this.Sstatus = true;
    },
    onBlur() {
      this.Fstatus = false;
      this.Sstatus = false;
    },
    relFComment(event) {
      http({
        api: `/say/comment`,
        method: "POST",
        data: {
          content: this.Fcontent,
          images: this.imageIds,
          say_id: this.detailData.id,
          form_id: event.mp.detail.formId
        },
        success: res => {
          console.log("add Fcomment:", res);
          if (res.statusCode === 200) {
            util.showSuccess("发布成功");
            this.imagePaths = [];
            this.imageIds = [];
            this.Fcontent = "";
            this.Fstatus = false;
            this.Sstatus = false;
            this.loadData();
          }
        }
      });
    },
    relScomment(event) {
      let formId = event.mp.detail.formId;
      if (this.toWho.toId) {
        http({
          api: `/say/comment/comment`,
          method: "POST",
          data: {
            content: this.Scontent,
            say_comment_id: this.toWho.id,
            to_say_comment_comment_id: this.toWho.toId,
            form_id: formId
          },
          success: res => {
            console.log("add Scomment:", res);
            if (res.statusCode === 200) {
              this.refreshFcomment(this.toWho.commentIndex);
            }
          }
        });
      } else {
        http({
          api: `/say/comment/comment`,
          method: "POST",
          data: {
            content: this.Scontent,
            say_comment_id: this.toWho.id,
            form_id: formId
          },
          success: res => {
            console.log("add apply:", res);
            if (res.statusCode === 200) {
              this.refreshFcomment(this.toWho.commentIndex);
            }
          }
        });
      }
    },
    refreshFcomment(index) {
      this.toWho = {};
      this.Scontent = "";
      this.Fstatus = false;
      this.Sstatus = false;
      http({
        api: `/say/comment/${this.detailData.comments[index].id}`,
        method: "GET",
        success: res => {
          console.log(res);
          if (res.statusCode === 200) {
            this.$set(this.detailData.comments, index, res.data.data);
            // this.detailData.comments[index] = res.data.data;
            console.log(this.detailData.comments[index]);
          }
        }
      });
    },
    resetData() {
      this.detailData = {};
      this.imagePaths = [];
      this.Fstatus = false;
      this.Sstatus = false;
      this.Fcontent = "";
      this.Scontent = "";
      this.toWho = {};
    },
    handleAction({ type, id, commentIndex }) {
      if (type === "detail") {
        http({
          api: `/say/${id}`,
          method: "DELETE",
          success: res => {
            if (res.statusCode == 200) {
              util.showSuccess("删除成功");
              wx.switchTab({
                url: "../index/main"
              });
            }
          },
          fail: err => {
            console.log(err);
          }
        });
      } else if (type === "comment") {
        http({
          api: `/say/comment/${id}`,
          method: "DELETE",
          success: res => {
            if (res.statusCode == 200) {
              util.showSuccess("删除成功");
              this.loadData();
            }
          },
          fail: err => {
            console.log(err);
          }
        });
      } else if (type === "apply") {
        http({
          api: `/say/comment/comment/${id}`,
          method: "DELETE",
          success: res => {
            if (res.statusCode == 200) {
              util.showSuccess("删除成功");
              this.refreshFcomment(commentIndex);
            }
          },
          fail: err => {
            console.log(err);
          }
        });
      }
    },
    onFFocus() {
      this.Fstatus = true;
    },
    onFBlur() {
      this.Fstatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.container {
  background-color: #eeeeee;
  .talkDetail {
    background-color: #ffffff;
  }
  .commentContent {
    background-color: #ffffff;
  }
  .whiteSpace {
    height: 90rpx;
    width: 100%;
    background: #ffffff;
  }
  .FcommentInput {
    position: fixed;
    bottom: 0;
    width: 100%;
    border: 2rpx solid #dddddd;
    box-sizing: border-box;
    background-color: #ffffff;
    .images {
      background: #ffffff;
      height: 200rpx;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      line-height: 200rpx;
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
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .sub {
      height: 90rpx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .addPicIcon {
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      input {
        padding-left: 10rpx;
        margin-left: 10rpx;
        width: 70%;
        height: 60rpx;
        border: 1px solid #dddddd;
        white-space: nowrap;
        border-radius: 10rpx;
      }
      .subButton {
        box-sizing: border-box;
        width: 100rpx;
        font-size: 22rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border: none;
        color: $headerBg;
        background-color: #ffffff;
      }
    }
  }
  .ScommentInput {
    position: fixed;
    bottom: 0;
    width: 100%;
    border: 2rpx solid #dddddd;
    box-sizing: border-box;
    background-color: #ffffff;
    padding-bottom: 10rpx;
    .sub {
      height: 90rpx;
      width: 100%;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      .addPicIcon {
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      input {
        padding-left: 10rpx;
        margin-left: 10rpx;
        width: 90%;
        height: 60rpx;
        border: 1px solid #dddddd;
        white-space: nowrap;
        border-radius: 10rpx;
      }
      .subButton {
        box-sizing: border-box;
        width: 100rpx;
        font-size: 22rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border: none;
        color: $headerBg;
        background-color: #ffffff;
      }
    }
  }
  .commentInputButton {
    position: fixed;
    bottom: 0;
    width: 100%;
    border: 2rpx solid #dddddd;
    box-sizing: border-box;
    background-color: #ffffff;
    height: 93rpx;
    line-height: 93rpx;
    color: #dddddd;
    padding-left: 40rpx;
  }
}
</style>

