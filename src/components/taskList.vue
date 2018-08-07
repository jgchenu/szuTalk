<template>
    <div class="taskList">
         <div class="header">
            <div class="avatar">
                ￥5111
            </div>
            <div class="msg">
                <div class="name">其他任务</div>
                <div class="time">17:23</div>
            </div>
            <div class="orderWrap">
                <div class="order">
                    接单!
                </div>
            </div>

        </div>
         <div class="content">
          <div class="message">
            <div class="label">#杜鹃山到冬筑#</div>帮忙去KFC买个全家桶，再加一盒阿姨炒粉；加急送到乔梧！！饿死我了orz
          </div>
          <div class="images">
                <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像"> 
                <div class="omitWrap">
                  <img src="/static/images/index/omit.png" alt="omit">
                   <span>9</span>
                </div>          
          </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../style/vars.scss";
.taskList {
  border: 2rpx solid #dddddd;
  padding: 10rpx 20rpx;
  box-shadow: 0 0 20rpx #bbbbbb;
  margin: 10px;
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    .avatar {
      padding: 5rpx;
      border-radius: 10%;
      background-color: $coinBg;
      color: $coinColor;
      line-height: 80rpx;
      text-align: center;
      font-weight: bold;
    }
    .msg {
      padding: 0 20rpx;
      text-align: center;
      line-height: 40rpx;
      .name {
        font-size: 30rpx;
        vertical-align: top;
      }
      .time {
        font-size: 12px;
        color: #bbbbbb;
      }
    }
    .orderWrap {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-self: flex-start;
      .order {
        padding: 0 10rpx;
        height: 60rpx;
        line-height: 60rpx;
        background-color: $coinBg;
        text-align: center;
        border-radius: 10rpx;
        margin-top: 10rpx;
        color: $coinColor;
        border: 2rpx solid rgb(255, 102, 21);
      }
    }
  }
  .content {
    .message {
      font-size: 16px;
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      position: relative;
      padding: 10rpx 0;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      width: 100%;
      height: 200rpx;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 0 10rpx;
      }
      .omitWrap {
        position: absolute;
        right: 30rpx;
        bottom: 20rpx;
        padding: 2rpx;
        background-color: rgba($color: #000000, $alpha: .2);
        font-size: 20rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        border-radius: 4rpx;
        img {
          width: 30rpx;
          height: 30rpx;
          margin: 0 6rpx;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

