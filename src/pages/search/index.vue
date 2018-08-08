<template>
  <div class="container">
    <div class="searchNav">
      <input type="text" class="searchInput">
      <img src="/static/images/index/no-search.png" alt="搜索" class="searchIcon">
    </div>
    
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      logs: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/vars.scss';
.Tabs {
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  white-space: nowrap;
  z-index: 100;
  background: white;
  height: 80rpx;
  line-height: 80rpx;
  .tabItem {
    display: inline-block;
    text-align: center;
    font-size: 32rpx;
    width: 187.5rpx;
    padding-bottom: 20rpx;
  }
  .search {
    display: inline-block;
    vertical-align: middle;
    line-height: 80rpx;
    img {
      vertical-align: middle;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .item_on {
    color: $topMenu;
  }
  .slider {
    position: absolute;
    bottom: 40rpx;
    left: 0;
    width: 187.5rpx;
    height: 2px;
    background: $topMenu;
    transition: transform 0.3s;
  }
}
</style>

