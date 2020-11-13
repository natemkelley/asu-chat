<template>
  <div class="admin-area" :style="computedStyle">
    <div v-if="!videoSrc && initializing" class="preloader-wrapper big active">
      <div class="spinner-layer spinner-red-only">
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
      <div class="waves-effect waves-light btn grow asu-maroon">
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
    />

    <Draggable v-if="!initializing" :top="20" :left="0">
      {{ displayTimerTime }}
    </Draggable>

    <Draggable v-if="!initializing" :top="70" :left="0">
      <transition name="bounce" mode="out-in">
        <span :key="points">{{ points }}</span>
      </transition>
    </Draggable>
    <ClientSounds :sound="sound" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import Draggable from "@/components/Draggable.vue";
import ClientSounds from "@/components/ClientSounds.vue";
import { timerTime } from "@/helpers/index.js";
export default {
  components: {
    VideoPlayer,
    Draggable,
    ClientSounds,
  },
  data() {
    return {
      initializing: true,
      videoSrc: null,
      videoPlaybackStatus: false,
      timerTime: 0,
      points: "0/100",
      sound: "",
    };
  },
  computed: {
    displayTimerTime() {
      return timerTime(0, this.timerTime);
    },
    computedStyle() {
      return { display: !this.videoSrc ? "flex" : "block" };
    },
  },
  created() {
    document.addEventListener("beforeunload", this.resetVideo);
  },
  mounted() {
    this.resetVideo();
    this.$fireDb.ref().on("value", (snapshot) => {
      this.initializing = false;
      const {
        videoStatus,
        videoPlaybackStatus,
        timerTime,
        points,
        sound,
      } = snapshot.val();
      this.setVideoStatus(videoStatus);
      this.setVideoPlaybackStatus(videoPlaybackStatus);
      this.setTimerTime(timerTime);
      this.setPoints(points);
      this.setSound(sound);
    });
  },
  async beforeDestroy() {
    await this.resetVideo();
  },
  methods: {
    setSound(sound) {
      this.sound = sound;
    },
    setPoints(points) {
      this.points = points;
    },
    setTimerTime(timerTime) {
      this.timerTime = timerTime;
    },
    resetVideo() {
      this.$fireDb.ref().update({
        percentage: 0,
        videoPlaybackStatus: false,
        videoStatus: false,
        videoTime: 0,
        timerTime: 0,
        points: "0/100",
        sound: "",
      });
    },
    onFileChange(fileList) {
      if (fileList[0]) {
        const file = fileList[0];
        const URL = window.URL || window.webkitURL;
        const fileURL = URL.createObjectURL(file);
        this.videoSrc = fileURL;
        this.setVideoStatus(file.name);
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

<style lang="scss">
.admin-area {
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: black;
}

.grow {
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.25);
  }
}
</style>
