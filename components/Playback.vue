<template>
  <Card>
    <div class="stop-start">
      <div class="the-time">
        <div class="toggles">
          <i class="material-icons" @click="addTime">arrow_drop_up</i>
          <i class="material-icons" @click="subtractTime">arrow_drop_down</i>
        </div>
        <div class="time">{{ time }} Minutes</div>
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

export default {
  components: { Card },
  props: ["videoTime", "videoPlaybackStatus", "videoStatus"],
  data() {
    return {
      time: 25,
      start: this.videoPlaybackStatus || false,
    };
  },
  computed: {
    buttonText() {
      return this.start ? "STOP" : "PAUSE";
    },
    timerTime() {
      const prop = "0:00";
      return !this.start ? `${this.time}:00` : prop;
    },
  },
  methods: {
    startTimer() {
      if (this.videoStatus) {
        this.start = !this.start;
        this.$fireDb.ref().update({
          videoPlaybackStatus: this.start,
        });
      } else {
        M.toast({ html: "A video has not been loaded" });
      }
    },
    addTime() {
      this.time = this.time + 1;
    },
    subtractTime() {
      this.time = this.time - 1;
      if (this.time <= 0) this.time = 0;
    },
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
