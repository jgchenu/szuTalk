<template>
  <div class="container" v-if="JSON.stringify(userInfo)!=='{}'">
      <div class="header">
            <img class="avatar" :src="userInfo.avatar_url" alt="头像" @click="preImage" >
            <div class="right">
            <div class="msg"><div class="name">{{userInfo.name}}</div></div>
            <div class="like"><img class="likeIcon" src="/static/images/me/like.png" alt="点赞"><span class="likeText">获得<span>{{userInfo.star_count}}赞</span></span></div>
            </div>
      </div>
        <div  class="dataBox">
          <!-- <div class="refresh" v-show="loading&&isRefresh">下拉刷新</div> -->
          <mainList v-for="(item,index) in indexList" :key="index" :List="item"/>
           <div class="loadMore" v-show="(loading&&!isRefresh)||finish">{{finish?'全部加载完成':'正在加载...'}}</div>
          </div>
      </div>     
</template>

<script>
import mainList from "../../components/mainList";
const { http } = require("./../../utils/http.js");
const util = require("./../../utils/index.js");

export default {
  onPullDownRefresh: function() {
    this.refresh();
  },
  onReachBottom: function() {
    this.loadMore();
  },
  onLoad() {
    //由于在http中做了节流操作，时间为100ms，所以要进行计时之后才能进行第二个请求
    this.userId = this.$root.$mp.query.userId;
    this.refresh();
  },
  onUnload() {
    this.clearCahe();
  },
  data() {
    return {
      userId: "",
      userInfo: {},
      indexList: [],
      page: 1,
      finish: false,
      loading: false,
      isRefresh: false
    };
  },
  components: {
    mainList
  },
  methods: {
    preImage() {
      wx.previewImage({
        current: this.userInfo.avatar_url, // 当前显示图片的http链接
        urls: [this.userInfo.avatar_url] // 需要预览的图片http链接列表
      });
    },
    loadData() {
      if (this.finish || this.loading) {
        return;
      }
      this.loading = true;
      http({
        api: `/user/say/${this.userId}`,
        method: "GET",
        data: { page: this.page },
        success: res => {
          console.log(res);
          this.loading = false;
          this.isRefresh = false;
          if (res.statusCode === 200) {
            if (res.data.data.data.length > 0) {
              if (res.data.data.meta.next_page) {
                // this.page = res.data.data.links.next_page_url.split("=")[1];
                this.page = res.data.data.meta.next_page;
              } else {
                this.finish = true;
                this.page = 1;
              }
              wx.stopPullDownRefresh();
              this.indexList = this.indexList.concat(res.data.data.data);
            } else {
              util.showTip("已经加载完了", 1000);
            }
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    loadMore() {
      this.loadData();
    },
    refresh() {
      this.finish = false;
      this.isRefresh = true;
      this.page = 1;
      this.indexList = [];
      new Promise((resolve, reject) => {
        this.loadUser(resolve);
      }).then(() => {
        setTimeout(() => {
          this.loadData();
        }, 101);
      });
    },
    loadUser(resolve) {
      http({
        api: `/user/${this.userId}`,
        method: "GET",
        success: res => {
          if (res.statusCode === 200) {
            this.userInfo = res.data.data;
            resolve();
          }
        }
      });
    },
    clearCahe() {
      this.page = 1;
      this.finish = false;
      this.userInfo = {};
      this.indexList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    height: 200rpx;
    width: 100%;
 background: linear-gradient(to bottom, $meHeaderBgRight, $meHeaderBgLeft);
    // background-color: #198af4;
    .avatar {
      margin: 0 40rpx;
      height: 140rpx;
      width: 140rpx;
      border-radius: 50%;
      box-shadow: 0 0 30rpx #ffffff;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: 60rpx;
      .msg {
        color: #ffffff;
        .name {
          font-size: 36rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        .label {
          text-align: center;
          width: 100rpx;
          padding: 4rpx 8rpx;
          border-radius: 6rpx;
          background-color: $identityBg;
        }
      }
      .like {
        display: flex;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-size: 26rpx;
        .likeIcon {
          width: 40rpx;
          height: 40rpx;
        }
        .likeText {
          margin-left: 10rpx;
          span {
            color: $coinColor;
          }
        }
      }
    }
  }
  .dataBox {
    box-sizing: border-box;
    // height: calc( 100% - 81px );
    // padding-top: 80rpx;
    .refresh {
      line-height: 60rpx;
      text-align: center;
      color: #dddddd;
    }
    .scrollView {
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
      overflow: scroll;
      text-align: center;
      height: 100%;
    }
    .loadMore {
      @extend .refresh;
    }
  }
}
</style>

