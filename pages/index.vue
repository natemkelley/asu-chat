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

    <Draggable :top="70">{{ points }} </Draggable>
    <Draggable> {{ displayTimerTime }} </Draggable>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Draggable from "@/components/Draggable.vue";

export default {
  components: {
    VideoPlayer,
    Draggable,
  },
  data() {
    return {
      initializing: true,
      videoSrc: null,
      videoPlaybackStatus: false,
      time: 0,
      timerTime: { minute: 0, seconds: 0 },
      points: "0/100",
    };
  },
  computed: {
    displayTimerTime() {
      const minutes =
        this.timerTime.minute < 10
          ? `0${this.timerTime.minute}`
          : this.timerTime.minute;
      const seconds =
        this.timerTime.seconds < 10
          ? `0${this.timerTime.seconds}`
          : this.timerTime.seconds;

      if (this.timerTime.minute <= 0 && this.timerTime.seconds <= 0) {
        return `00:00`;
      }

      return `${minutes}:${seconds}`;
    },
    computedStyle() {
      return { display: !this.videoSrc ? "flex" : "block" };
    },
  },
  mounted() {
    this.resetVideo();
    this.$fireDb.ref().on("value", (snapshot) => {
      this.initializing = false;
      const {
        videoStatus,
        videoTime,
        videoPlaybackStatus,
        timerTime,
      } = snapshot.val();
      this.setVideoStatus(videoStatus);
      this.setVideoPlaybackStatus(videoPlaybackStatus);
      this.setVideoTime(videoTime);
      this.setTimerTime(timerTime);
    });
  },
  async beforeDestroy() {
    await this.resetVideo();
  },
  methods: {
    setTimerTime(timerTime) {
      this.timerTime = timerTime;
    },
    pad(num) {
      return ("0" + num).slice(-2);
    },
    mmss(secs) {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      minutes = minutes % 60;
      return `${this.pad(minutes)}:${this.pad(secs)}`;
    },
    resetVideo() {
      this.$fireDb.ref().update({
        percentage: 0,
        videoPlaybackStatus: false,
        videoStatus: false,
        videoTime: 0,
        timerTime: { minute: 0, seconds: 0 },
      });
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
  beforeDestroy() {
    this.resetVideo();
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
