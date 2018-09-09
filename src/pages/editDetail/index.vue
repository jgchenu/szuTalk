<template>
<div class="wrap">
  <div class="container">
    <div class="section">
      <input type="text" v-model="name" class="nameInput" :focus="nameInputFocus" @focus="handleFocus" :class="{nameInputActive:nameInputFocus}" @blur="handleBlur">
      <span class="nameText">取个响当当的名字吧~</span>
    </div>
    <div class="saveButton" @click="updateUser">
    <Button buttonText="保存"></Button>
    </div>
  </div>
  </div>
</template>

<script>
import vuexMixin from "../../mixin/vuex.mixin.js";
const qcloud = require("./../../wafer2/index.js");
const util = require("../../utils/index.js");
const http = require("../../utils/http.js");
import Button from "../../components/Button";
export default {
  mixins: [vuexMixin],
  data() {
    return {
      nameInputFocus: false,
      name:''
    };
  },
  components: { Button },
  methods: {
    handleFocus() {
      this.nameInputFocus = true;
    },
    handleBlur() {
      this.nameInputFocus = false;
    },
    updateUser() {
      http({
        api: `/user/${this.userInfo.id}`,
        method: "PUT",
        data: {
          name: this.name
        },
        success: res => {
          if (res.statusCode === 200) {
            this.setUserInfo(res.data.data);
            util.showSuccess('保存成功')
          }
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.wrap {
  height: 1334rpx;
  background-color: #fafafa;
  .container {
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 0 8rpx #aaaaaa;
    padding: 40rpx 60rpx;
    .section {
      width: 100%;
      padding: 10rpx 0;
      .nameInput {
        display: block;
        border-bottom: 2rpx solid #dddddd;
      }
      .nameInputActive {
        border-bottom: 2rpx solid $identityBg;
      }
      .nameText {
        display: block;
        margin-top: 20rpx;
        color: #cccccc;
      }
    }
    .saveButton {
      margin-top: 100rpx;
      text-align: center;
    }
  }
}
</style>

