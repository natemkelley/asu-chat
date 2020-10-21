<template>
  <Card class="filler">
    <div class="button" :class="{ stop: start }" @click="startVideo">
      {{ buttonText }}
    </div>

    <div class="progress-bar">
      <div class="progress">
        <div class="determinate" style="width: 70%"></div>
      </div>
      <div class="show-time">{{ timerText }}</div>
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
    timerText() {
      return Math.round(this.videoTime);
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
        M.toast({ html: "A video has not been loaded on the primary page" });
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 20px;
}
.button.stop {
  background: rgb(235, 104, 104);
}

.progress-bar {
  display: flex;
  width: 100%;
  font-size: 20px;
}

.progress {
  height: 40px;
  margin: 0;
  background-color: rgb(214, 236, 207);
  .determinate {
    background-color: rgb(107, 208, 80);
  }
}

.show-time {
  width: 100px;
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
}
</style>
