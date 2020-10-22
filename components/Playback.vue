<template>
  <Card class="filler">
    <div class="button" :class="{ stop: start }" @click="startVideo">
      {{ buttonText }}
    </div>

    <div class="progress-bar">
      <div class="progress">
        <div class="determinate" :style="{ width: progressPercentage }"></div>
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
  props: ["videoTime", "videoPlaybackStatus", "videoStatus", "percentage"],
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
      const roundedSeconds = Math.round(this.videoTime);
      return this.mmss(roundedSeconds);
    },
    progressPercentage() {
      const percentage = this.percentage * 100;
      return `${percentage}%`;
    },
  },
  methods: {
    pad(num) {
      return ("0" + num).slice(-2);
    },
    mmss(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      minutes = minutes % 60;
      return `${this.pad(minutes)}:${this.pad(secs)}`;
    },
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
  transition: 500ms all;
  .determinate {
    background-color: rgb(107, 208, 80);
    transition: 500ms all;
  }
}

.show-time {
  width: 100px;
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
}
</style>
