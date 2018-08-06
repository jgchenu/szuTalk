<template>
  <div class="container">
        <talkList></talkList>
  </div>
</template>

<script>
import talkList from "../../components/talkList";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    talkList
  },

  methods: {},

  created() {}
};
</script>

<style lang="scss" scoped>
</style>

