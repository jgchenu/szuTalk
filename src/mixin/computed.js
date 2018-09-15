const {
  formatTime
} = require('@/utils/index.js')
export default {
  computed: {
    computedTime() {
      return formatTime(this.List.updated_at);
    },
  }
}
