<template>
  <Card class="filler">
    <div
      class="waves-effect waves-light button"
      :class="{ stop: start }"
      @click="startVideo"
    >
      {{ buttonText }}
    </div>

    <div class="progress-bar">
      <div
        class="progress tooltipped"
        data-position="bottom"
        :data-tooltip="progressHoverText"
      >
        <div class="determinate" :style="{ width: progressPercentage }"></div>
      </div>
      <div class="show-time">{{ timerText }}</div>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import cloneDeep from "@/node_modules/lodash/cloneDeep";
import { timerTime } from "@/helpers/index.js";

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
      return timerTime(0, Math.round(this.videoTime));
    },
    progressPercentage() {
      const percentage = this.percentage * 100;
      return `${percentage}%`;
    },
    progressHoverText() {
      const percent = Number(this.percentage).toFixed(4) * 100;
      return percent.toFixed(1) + "% Completed";
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
    startTooltip() {
      const options = {};
      const elems = document.querySelectorAll(".tooltipped");
      const instances = M.Tooltip.init(elems, options);
    },
  },
  mounted() {
    this.start = this.videoPlaybackStatus || false;
    this.$fireDb.ref().update({
      videoPlaybackStatus: this.start,
    });
    this.startTooltip();
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
