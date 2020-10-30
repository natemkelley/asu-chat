<template>
  <Card>
    <div class="stop-start">
      <div class="the-time">
        <vue-timepicker
          class="time"
          hide-clear-button
          v-model="yourTimeValue"
          format="mm:ss"
          input-class="myTime"
          input-width="100%"
          auto-scroll
          second-interval="5"
          @change="changeTimeHandler"
        ></vue-timepicker>
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
import { timerTime } from "@/helpers/index.js";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

//https://www.npmjs.com/package/vue-reactive-localstorage

export default {
  components: { Card, VueTimepicker },
  props: ["videoPlaybackStatus", "videoStatus"],
  data() {
    return {
      time: 25 * 60,
      updatingTime: 0,
      start: this.videoPlaybackStatus || false,
      timerObj: null,
      yourTimeValue: {
        HH: "0",
        mm: "25",
        ss: "00",
      },
    };
  },
  computed: {
    buttonText() {
      return this.start ? "RESTART" : "START";
    },
    timerTime() {
      if (this.updatingTime <= 0) {
        return `00:00`;
      }

      return timerTime(0, this.updatingTime);
    },
    inputTimerTime() {
      if (this.time <= 0) {
        return `00:00`;
      }

      return timerTime(0, this.time);
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
      console.log(this.time);
      this.updatingTime = this.time;
      console.log(this.updatingTime);

      if (this.timerObj) {
        this.clearInterval();
      }

      this.timerObj = setInterval(() => {
        this.updatingTime = this.updatingTime - 1;

        if (this.updatingTime <= 0) {
          this.updatingTime = 0;
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
    changeTimeHandler({ data }) {
      const mm = data.mm * 60;
      const ss = data.ss;
      this.time = Number(mm) + Number(ss);
    },
  },
  created() {
    this.updatingTime = this.time;
  },
};
</script>

<style lang="scss">
.stop-start {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  flex-wrap: wrap;

  .toggles {
    display: flex;
    flex-direction: column;
    height: 90px;
    justify-content: space-between;
  }

  .the-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 200px;
    max-width: 50%;
  }

  .time {
    position: relative;
    color: black !important;
    cursor: pointer !important;

    .myTime {
      color: black !important;
      width: 100%;
      border: none;
      border-bottom: none !important;
      width: 100%;
      padding: 0;
      text-align: center;
      cursor: pointer !important;
      width: 100%;
      font-size: 45px;
      line-height: 0;
      padding: 0;
      margin: 0;
      margin-top: -15px;
      margin-bottom: -15px;
    }
  }

  .material-icons {
    cursor: pointer;
    font-size: 35px;
    border-radius: 12px;
    border: 3px solid black;
    &:hover {
      background: rgb(236, 236, 236);
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
  .vue__time-picker .active {
    background: rgb(237, 175, 64) !important;
    color: black !important;
  }
}

.video-time {
  font-size: 90px;
}
</style>
