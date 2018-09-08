import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import store from './../vuex/store'
export default {
  methods: {
    ...mapMutations(['loadUserInfo']),
    ...mapActions(['loadUserInfo'])
  },
  computed: {
    ...mapState(['userInfo'])
  },
  store
}
