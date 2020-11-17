<template>
  <div class="row">
    <div class="col m4 s12">
      <Timer :videoStatus="videoStatus" :setTime="mission.timerTime" />
    </div>
    <div class="col m3 s12">
      <Playback
        :videoPlaybackStatus="videoPlaybackStatus"
        :videoTime="videoTime"
        :videoStatus="videoStatus"
        :percentage="percentage"
      />
    </div>
    <div class="col m3 s12">
      <Sounds />
    </div>
    <div class="col m2">
      <OpenModal />
    </div>
    <div class="col m12 s12">
      <MyMap :mission="mission" />
    </div>
  </div>
</template>

<script>
import MyMap from "@/components/MyMap.vue";
import Playback from "@/components/Playback.vue";
import Timer from "@/components/Timer.vue";
import Sounds from "@/components/Sounds.vue";
import OpenModal from "@/components/OpenModal.vue";

export default {
  props: [
    "mission",
    "videoStatus",
    "videoTime",
    "videoPlaybackStatus",
    "percentage",
  ],
  components: { MyMap, Playback, Timer, Sounds, OpenModal },
  data() {
    return {
      videoStatus: null,
      videoTime: 0,
      videoPlaybackStatus: null,
      percentage: 0,
      loaded: false,
    };
  },
};
</script>

<style scoped></style>
