<template>
  <div>
  <div class="container"  v-if="indexList.length>0">
    <div  class="dataBox">
    <commentList v-for="(item,index) in indexList" :key="index" :List="item"/>
      <div class="loadMore" v-show="(loading&&!isRefresh)||finish">{{finish?'全部加载完成':'正在加载...'}}</div>
    </div>
  </div>
  <div v-else class="noneApply">
     还没有人回复你呀，快点去发说说吧
  </div>
  </div>
</template>

<script>
const { http } = require("@/utils/http.js");
const util = require("@/utils/index.js");
import commentList from "./components/commentList";
export default {
  onLoad() {
    this.refresh();
  },
  onPullDownRefresh: function() {
    this.refresh();
  },
  onReachBottom: function() {
    this.loadMore();
  },
  onUnload() {
    this.clearCahe();
  },
  data() {
    return {
      indexList: [],
      page: 1,
      finish: false,
      loading: false,
      isRefresh: false
    };
  },
  components: { commentList },
  methods: {
    loadData() {
      if (this.finish || this.loading) {
        return;
      }
      this.loading = true;
      http({
        api: "/user/notification",
        method: "GET",
        data: { page: this.page },
        success: res => {
          console.dir(res);
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
              util.showTip("", "已经加载完了");
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
      this.loadData();
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
@import "@/style/vars.scss";
.container {
  background-color: $gray;
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
      color: #000;
    }
  }
}

.noneApply {
  text-align: center;
  color: #000000;
}
</style>

