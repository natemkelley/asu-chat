<template>
  <Card>
    <div class="stop-start">
      <div class="the-time">
        <div class="toggles">
          <i class="material-icons" @click="addTime">arrow_drop_up</i>
          <i class="material-icons" @click="subtractTime">arrow_drop_down</i>
        </div>
        <div class="time">{{ time.minute }} Minutes</div>
      </div>

      <div class="button" :class="{ stop: start }" @click="startTimer">
        {{ buttonText }}
      </div>
    </div>
    <div class="divider"></div>
    <div class="video-time center-align">
      {{ timerTime }}
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import cloneDeep from "@/node_modules/lodash/cloneDeep";

//https://www.npmjs.com/package/vue-reactive-localstorage

export default {
  components: { Card },
  props: ["videoPlaybackStatus", "videoStatus"],
  data() {
    return {
      time: { minute: 25, seconds: "0" },
      updatingTime: {},
      start: this.videoPlaybackStatus || false,
      timerObj: null,
    };
  },
  computed: {
    buttonText() {
      return this.start ? "RESTART" : "START";
    },
    timerTime() {
      const minutes =
        this.updatingTime.minute < 10
          ? `0${this.updatingTime.minute}`
          : this.updatingTime.minute;
      const seconds =
        this.updatingTime.seconds < 10
          ? `0${this.updatingTime.seconds}`
          : this.updatingTime.seconds;

      if (this.updatingTime.minute <= 0 && this.updatingTime.seconds <= 0) {
        return `00:00`;
      }

      return `${minutes}:${seconds}`;
    },
  },
  methods: {
    startTimer() {
      if (this.videoStatus) {
        this.start = true;
        this.initializeTimer();
      } else {
        M.toast({ html: "A video has not been loaded on the primary page" });
      }
    },
    initializeTimer() {
      this.updatingTime = cloneDeep(this.time);

      if (this.timerObj) {
        this.clearInterval();
      }

      this.timerObj = setInterval(() => {
        this.updatingTime.minute =
          Number(this.updatingTime.seconds) == 0
            ? this.updatingTime.minute - 1
            : this.updatingTime.minute;

        this.updatingTime.seconds =
          Number(this.updatingTime.seconds) == 0
            ? 59
            : this.updatingTime.seconds - 1;

        if (this.updatingTime.minute <= 0 && this.updatingTime.seconds <= 0) {
          this.updatingTime.minutes = 0;
          this.updatingTime.seconds = 0;
          this.clearInterval();
          return;
        }

        this.updateTime();
      }, 1000);
    },
    clearInterval() {
      clearInterval(this.timerObj);
    },
    updateTime() {
      this.$fireDb.ref().update({
        timerTime: this.updatingTime,
      });
    },
    addTime() {
      this.time.minute = this.time.minute + 1;
    },
    subtractTime() {
      this.time.minute = this.time.minute - 1;
      if (this.time.minute <= 0) this.time.minute = 0;
    },
  },
  created() {
    this.updatingTime = cloneDeep(this.time);
  },
};
</script>

<style lang="scss" scoped>
.stop-start {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;

  .toggles {
    display: flex;
    flex-direction: column;
  }

  .the-time {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time {
    margin-left: 10px;
  }

  .material-icons {
    cursor: pointer;
    font-size: 35px;
    &:hover {
      background: rgb(236, 236, 236);
      border-radius: 12px;
    }
  }

  .button {
    text-align: center;
    min-width: 139px;
    cursor: pointer;
    border: 3px solid black;
    padding: 3px 22px;
    border-radius: 12px;
    background: rgb(53, 212, 53);
  }
  .button.stop {
    background: rgb(235, 104, 104);
  }
}

.video-time {
  font-size: 90px;
}
</style>
