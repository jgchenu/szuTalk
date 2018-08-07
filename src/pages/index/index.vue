<template>
  <div class="container">
      <scroll-view  class="Tabs" style="width:100%">
          <div v-for="(item,index) in tabs" :id="index" :class="{item_on:activeIndex == index }"  :scroll-into-view="index" @click="tabClick" :key="index" class="tabItem">{{item}}
        </div>
        <!-- <div class="weui-navbar-slider" :style="{transform:'translateX('+slideOffset+'px)'}"></div> -->
      </scroll-view>
    <swiper :current="activeIndex" >
      <swiper-item>
        <talkList></talkList>
      </swiper-item>
      <swiper-item>
          <taskList></taskList>
      </swiper-item>
    </swiper>

       
  </div>
</template>

<script>
import talkList from "../../components/talkList";
import taskList from "../../components/taskList";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      tabs: [
        "综合与绘画",
        "艺术喷漆",
        "泥塑",
        "纸面绘画",
        "布面绘画",
        "中国油画",
        "水墨画"
      ],
      activeIndex: 0,
      slideOffset: 0,
      tabW: 0
    };
  },

  components: {
    talkList,
    taskList
  },

  methods: {
    tabClick() {}
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.container {
  .Tabs {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .tabItem {
    }
  }
}
</style>

