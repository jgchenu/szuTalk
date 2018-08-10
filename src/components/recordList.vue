<template>
  <div class="container">
      <div class="record">
          <div class="title">快递任务接单</div>
          <div class="money">收入￥10.00</div>
          <div class="time">2018-7-29 17:12</div>
      </div>
  </div>
</template>

<script>


export default {
  components: {

  },

  data () {
    return {
  
    }
  },

  created () {

  }
}
</script>

<style lang="scss" scoped>
.container{
    .record{
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        padding: 30rpx;
        box-shadow: 0 4rpx 4rpx #dddddd;
        .title{
            font-size: 30rpx;
            font-weight: bold;
        }
        .money{
            @extend .title;
        }
        .time{
            font-size: 24rpx;
            color: #dddddd;
        }
    }
}
</style>

