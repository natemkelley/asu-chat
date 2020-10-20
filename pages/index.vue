<template>
  <div class="admin-area" :style="computedStyle">
    <div v-if="!videoSrc && initializing" class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>

    <div v-show="!videoSrc && !initializing" class="file-field input-field">
      <div class="btn">
        <span>Choose Video File</span>
        <input
          @change="onFileChange($event.target.files)"
          type="file"
          accept="video/*"
          ref="fileInput"
        />
        <div v-show="false" class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
    </div>

    <VideoPlayer
      v-if="videoSrc"
      :src="videoSrc"
      :videoPlaybackStatus="videoPlaybackStatus"
      :time="time"
    />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      initializing: true,
      videoSrc: null,
      videoPlaybackStatus: false,
      time: 0,
    };
  },
  computed: {
    computedStyle() {
      return { display: !this.videoSrc ? "flex" : "block" };
    },
  },
  mounted() {
    this.resetVideo();
    this.$fireDb.ref().on("value", (snapshot) => {
      this.initializing = false;
      const { videoStatus, videoTime, videoPlaybackStatus } = snapshot.val();
      this.setVideoTime(videoTime);
      this.setVideoStatus(videoStatus);
      this.setVideoPlaybackStatus(videoPlaybackStatus);
    });
  },
  async beforeDestroy() {
    await this.resetVideo();
  },
  methods: {
    resetVideo() {
      this.setVideoStatus(false);
      this.setVideoTime(Number(0));
      this.setVideoPlaybackStatus(false);
    },
    onFileChange(fileList) {
      if (fileList[0]) {
        const file = fileList[0];
        const URL = window.URL || window.webkitURL;
        const fileURL = URL.createObjectURL(file);
        this.videoSrc = fileURL;
        this.setVideoStatus(true);
      }
    },
    setVideoStatus(status = false) {
      if (status != this.videoStatus) {
        this.videoStatus = status;
        this.$fireDb.ref().update({
          videoStatus: status,
        });
      }
    },
    setVideoTime(time = 0) {
      this.time = time;
      this.$fireDb.ref().update({
        videoTime: time,
      });
    },
    setVideoPlaybackStatus(status = false) {
      if (status != this.videoPlaybackStatus) {
        this.videoPlaybackStatus = status;
        this.$fireDb.ref().update({
          videoPlaybackStatus: status,
        });
      }
    },
  },
};
</script>

<style>
.admin-area {
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: black;
}
</style>
