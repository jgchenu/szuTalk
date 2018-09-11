<template>
    <div class="container">
       <scroll-view  class="Tabs">
          <div v-for="(item,index) in tabs" :id="index" :class="{item_on:activeIndex == index }" @click="tabClick" :key="index" class="tabItem" :style="{width:tabW+'rpx'}">{{item}}</div>
          <div class="slider" :style="{'transform':'translateX('+transfromLeft+'rpx)','width':borderWidth+'rpx'}"></div>
      </scroll-view>
    </div>
</template>

<script>
export default {
  props: ["tabs", "tabW", "activeIndex"],
  data() {
    return {
      borderWidth: 60
    };
  },
  methods: {
    tabClick(e) {
      var idIndex = e.currentTarget.id;
      this.$emit("bindChange", { index: parseInt(idIndex) });
    }
  },
  computed: {
    transfromLeft() {
      let left = this.activeIndex * this.tabW +( this.tabW - this.borderWidth)/2;
      return left;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.container {
  .Tabs {
    box-sizing: border-box;
    white-space: nowrap;
    background: white;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 187.5rpx;
    .tabItem {
      display: inline-block;
      text-align: center;
      font-size: 30rpx;
      // border-right: 1rpx solid #eeefff;
    }
    .search {
      display: inline-block;
      vertical-align: middle;
      line-height: 80rpx;
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .item_on {
      color: $topMenu;
      font-size: 32rpx;
    }
    .slider {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: $topMenu;
      transition: transform 0.3s;
    }
  }
}
</style>
