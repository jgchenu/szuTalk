const {
  http
} = require("../utils/http.js");

export default {
  props: {
    List: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isStar: this.List.is_star,
      starCount: this.List.star_count
    };
  },
  computed: {
    computedTime() {
      return this.List.updated_at.split(" ")[1];
    },
    computedContent() {
      let reg = new RegExp("<br>", "g");
      let str = this.List.content.replace(reg, "\n");
      let content = str.slice(0, 100);
      content = content.length < 60 ? content : content + "...";
      return content;
    },
    computedImages() {
      let arr = this.List.file_urls.slice(0, 3);
      return arr;
    },
    computedStar() {
      let url = `/static/images/index/${this.isStar ? "" : "no-"}like.png`;
      return url;
    }
  },
  methods: {
    goDetail() {
      wx.navigateTo({
        url: `../detail/main?id=${this.List.id}`
      });
    },
    handleStar() {
      let method = this.isStar ? "DELETE" : "POST";
      http({
        api: `/say/${this.List.id}/star`,
        method,
        success: res => {
          if (res.statusCode === 200) {
            this.isStar = !this.isStar;
            if (method === "DELETE") {
              this.starCount--;
            } else {
              this.starCount++;
            }
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    }
  }
};
