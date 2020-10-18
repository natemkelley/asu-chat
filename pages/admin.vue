<template>
  <div class="admin-area">
    <video-player />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },

  created() {
    this.$fireStore.collection("rooms").onSnapshot((data) => {
      data.docs.forEach((doc) => {
        //console.log(doc.data());
      });
    });
  },
};
</script>

<style>
.admin-area {
  height: 100vh;
  width: 100vw;
  background: black;
}
</style>
