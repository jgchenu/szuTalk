<template>
  <div class="container">
    <web-view :src="newsUrls[id]"></web-view>  
  </div>
</template>

<script>
export default {
  onLoad(options) {
    this.id = options.id;
  },
  components: {},

  data() {
    return {
      id: 0,
      newsUrls: [
        "https://mp.weixin.qq.com/s/G44gNXWmanr-8IIbM_NMwQ",
        "https://mp.weixin.qq.com/s/oB5dNqn9gz29SKq9hePBWQ",
        "https://mp.weixin.qq.com/s/dJgjwKdjG1GTIk6Cd713tg",
        "https://mp.weixin.qq.com/s/tFYa9-wUGgoack4UGjDQig"
      ]
    };
  },

  created() {}
};
</script>

<style lang="scss" scoped>
</style>

