<template>
  <div>
    {{ mission.missionName }}

    <MyMap />
  </div>
</template>

<script>
import MyMap from "@/components/MyMap.vue";

export default {
  props: ["mission"],
  components: { MyMap },
  data() {
    return {};
  },
  created() {
    this.$fireDb.ref().on("value", (snapshot) => {
      this.initializing = false;
      const {
        videoStatus,
        videoTime,
        videoPlaybackStatus,
        percentage,
      } = snapshot.val();
      this.videoStatus = videoStatus;
      this.videoTime = videoTime;
      this.videoPlaybackStatus = videoPlaybackStatus;
      this.percentage = percentage;
      this.loaded = true;
    });
  },
};
</script>

<style scoped></style>
