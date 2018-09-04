<template>
  <div class="container" v-if="JSON.stringify(talkDetail)!=='{}'">
    <div class="talkDetail">
      <talkListDetail :talkDetail="talkDetail" @showFirstComment="showFirstComment"></talkListDetail>
    </div>
    <div class="commentContent">
        <FComment @showSecondComment="showSecondComment"></FComment>
    </div>
    <div class="FcommentInput" v-show="Fstatus">
        <div class="images" @click="preImage" v-show="imagePaths.length">
            <div class="imageItem" v-for="(item,index) in imagePaths" :key="index" >
              <img :src="item" alt="image" :data-id="index">
              <div class="delete" @click.stop="deleteImage(index)">x</div>
            </div>
        </div>
        <div class="sub">
          <img src="/static/images/rel/addPic-no.png" alt="addPic" class="addPicIcon" @click="chooseImage">
          <input type="text" placeholder="说说你的看法..." :focus="Fstatus">
          <div class="subButton" >发表</div>
        </div>
    </div>
      <div class="ScommentInput" v-show="Sstatus">
        <div class="sub">
          <input type="text" placeholder="说说你的看法..." :focus="Sstatus" @blur="blur">
          <div class="subButton" >发表</div>
        </div>
    </div>
  </div>
</template>

<script>
import talkListDetail from "../../components/talkListDetail";
import FComment from "../../components/FComment";
const http = require("../../utils/http.js");
const qcloud = require("./../../wafer2/index.js");
const { host } = require("./../../config.js");
const util = require("../../utils/index.js");

export default {
  onLoad() {
    let id = (this.$root.$mp.query.id );
    console.log(this.$root.$mp.query);
    http({
      api: `/say/${id}`,
      method: "GET",
      success: res => {
        console.log(res);
        if (res.statusCode === 200) {
          this.talkDetail = res.data.data;
        }
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  components: {
    talkListDetail,
    FComment
  },

  data() {
    return {
      isFocus: false,
      talkDetail: {},
      imagePaths: [],
      imageIds: [],
      Fstatus: false,
      Sstatus: false
    };
  },
  methods: {
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.isFocus = false;
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
      new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            if (this.imagePaths.length + res.tempFilePaths.length > 3) {
              reject("最多只能上传三张哦");
              return;
            }
            this.imagePaths = this.imagePaths.concat(res.tempFilePaths);
            resolve(res.tempFilePaths);
          }
        });
      }).then(
        paths => {
          for (let i = 0; i < paths.length; i++) {
            qcloud.upload({
              url: `${host}/image`,
              filePath: paths[i],
              header: {
                accept: "application/json" // 默认值
              },
              name: "image",
              success: res => {
                let data = JSON.parse(res.data);
                if (data.code === 0) {
                  this.imageIds.push(data.data.id);
                }
                console.log(res);
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
    showSecondComment() {
      this.Fstatus = false;
      this.Sstatus = true;
    },
    blur() {
      this.Fstatus = false;
      this.Sstatus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  padding-bottom: 100rpx;
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
      }
      .subButton {
        width: 80rpx;
        text-align: center;
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
        width: 90%;
        height: 60rpx;
        border: 1px solid #dddddd;
        white-space: nowrap;
      }
      .subButton {
        width: 80rpx;
        text-align: center;
      }
    }
  }
}
</style>

