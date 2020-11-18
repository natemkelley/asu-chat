<template>
  <div>
    <div class="row first-row">
      <div class="col m5 s12">
        <Timer :videoStatus="videoStatus" :setTime="mission.timerTime" />
      </div>
      <div class="col m4 s12">
        <Playback
          :videoPlaybackStatus="videoPlaybackStatus"
          :videoTime="videoTime"
          :videoStatus="videoStatus"
          :percentage="percentage"
          :stoppagesChanged="mission.stoppagesChanged"
        />
      </div>

      <div class="col m3 s12">
        <Sounds />
      </div>
    </div>

    <div class="row">
      <div class="col m12 s12">
        <MyMap :mission="mission" />
      </div>
    </div>
  </div>
</template>

<script>
import MyMap from "@/components/MyMap.vue";
import Playback from "@/components/Playback.vue";
import Timer from "@/components/Timer.vue";
import Sounds from "@/components/Sounds.vue";

export default {
  props: [
    "mission",
    "videoStatus",
    "videoTime",
    "videoPlaybackStatus",
    "percentage",
  ],
  components: { MyMap, Playback, Timer, Sounds },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;
  display: flex;
}

.first-row {
  .col {
    display: flex;
    flex-direction: column;
  }
}
</style>
