<template>
  <div class="container">
        <div class="header">
            <div class="coin">
              ￥
            </div>
            <div class="count">余额:<span>￥7.10</span></div>
            <div class="buttons">
              <div class="recharge">充值</div>
              <div class="withdraw">提现</div>
            </div>
        </div>
        <div class="title">
          交易明细
        </div>
        <div class="content">
          <recordList></recordList>
          <recordList></recordList>
          <recordList></recordList>
        </div>
  </div>
</template>

<script>
import recordList from '../../components/recordList'
export default {
  components: {recordList},

  data() {
    return {};
  },

  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  .header {
    height: 340rpx;
    width: 100%;
    background: -webkit-gradient(
      linear,
      0 0,
      100% 0,
      from($meHeaderBgLeft),
      to($meHeaderBgRight)
    );
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .coin {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background-color: $coinBg;
      color: $coinColor;
      border: 4rpx solid $coinBorder;
      text-align: center;
      line-height: 120rpx;
      font-size: 60rpx;
    }
    .count {
      font-size: 34rpx;
      color: #ffffff;
      font-weight: bold;
      span {
        color: $coinColor;
      }
    }
    .buttons {
      width: 300rpx;
      display: flex;
      justify-content: space-between;
      .recharge,
      .withdraw {
        display: inline-block;
        width: 120rpx;
        height: 50rpx;
        line-height: 50rpx;
        border-radius: 5rpx;
        background: #ffffff;
        color: $identityBg;
        text-align: center;
      }
    }
  }
  .title{
    font-size: 32rpx;
    line-height: 60rpx;
    text-align: center;
    box-shadow: 0 4rpx 4rpx #dddddd;
  }
}
</style>

