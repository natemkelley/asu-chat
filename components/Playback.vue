<template>
  <Card class="filler">
    <div class="button" :class="{ stop: start }" @click="startVideo">
      {{ buttonText }}
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import cloneDeep from "@/node_modules/lodash/cloneDeep";

export default {
  components: { Card },
  props: ["videoTime", "videoPlaybackStatus", "videoStatus"],
  data() {
    return {
      start: false,
    };
  },
  computed: {
    buttonText() {
      return !this.start ? "START VIDEO" : "STOP VIDEO";
    },
  },
  methods: {
    startVideo() {
      if (this.videoStatus) {
        this.start = !this.start;
        this.$fireDb.ref().update({
          videoPlaybackStatus: this.start,
        });
      } else {
        M.toast({ html: "A video has not been loaded" });
      }
    },
  },
  mounted() {
    this.start = this.videoPlaybackStatus || false;
    this.$fireDb.ref().update({
      videoPlaybackStatus: this.start,
    });
  },
  watch: {
    videoPlaybackStatus() {
      this.start = this.videoPlaybackStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.filler {
  display: flex;
}

.button {
  font-size: 30px;
  cursor: pointer;
  border: 3px solid black;
  padding: 3px 22px;
  border-radius: 12px;
  background: #35d435;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button.stop {
  background: rgb(235, 104, 104);
}
</style>
