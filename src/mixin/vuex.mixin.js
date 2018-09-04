import {
  mapState,
  mapMutation
} from 'vuex'
module.exports = {
  methods: {
    ...mapMutation(['changeSwitchTab'])
  },
  computed: {
    ...mapState(['switchTab'])
  }
}
