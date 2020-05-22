<template>
  <div class="page container">
    <div class="loader" v-show="loading"><RotateSquare2 /></div>

    <div v-show="!loading" class="row"></div>
  </div>
</template>

<script>
import { RotateSquare2 } from "@/node_modules/vue-loading-spinner";
import ThreeCircle from "@/components/threeCircles";
import ViewIndicators from "@/components/viewIndicators";

export default {
  layout: "chat",
  data() {
    return {
      active: false,
      id: null,
      loading: true,
      indicators: [],
      robot: null,
      sessionName: "Session Name",
    };
  },
  components: {
    RotateSquare2,
    ThreeCircle,
    ViewIndicators,
  },
  async asyncData({ params, error }) {
    return params;
  },
  mounted() {
    this.$fireStore
      .collection("rooms")
      .doc(this.id)
      .onSnapshot((data) => {
        this.sessionName = data.data().roomName;
        document.title = "ASU Chat | " + this.sessionName;
        this.active = data.data().active;
        this.indicators = data.data().indicators || [];
        this.loading = false;
      });
  },
  methods: {},
  created() {
    this.robot = this.$route.query.robot;
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 850px;
  min-width: 500px;
}

.loader {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  margin-top: 30px;
}

.dialogue-area {
  position: relative;
  margin-top: 5vh;
  .dialogue-box {
    position: relative;
    background: white;
    height: 70vh;
    min-height: 100%;
    border-radius: 20px;
    overflow: hidden;
  }

  .sidebar {
    padding: 0px 20px;
    .row {
      margin-left: 0;
      margin-right: 0;
    }

    .cont {
      width: 100%;
      max-width: 250px;
    }
    .session-name {
      background: white;
      border-radius: 15px;
      padding: 10px;
      text-align: center;
      h5 {
        margin: 5px 0px;
      }
    }
    .close-session {
      background: white;
      border-radius: 15px;
      padding: 20px;
      .btn-small {
        width: 100%;
      }
      p {
        margin-bottom: 0px;
      }
    }
  }
}

.messages {
  min-height: 100%;
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 17px;
  margin-top: 0px;
  .robot {
    display: flex;
    -webkit-box-align: start;
    align-items: flex-start;
    .robot-img {
      max-width: 60px;
      display: inline;
      margin-bottom: -15px;
    }
    .text {
      display: inline-block;
      padding: 8px 10px;
      background-color: #dadada;
      max-width: 70%;
      border-radius: 10px;
      margin-top: 5px;
    }
  }
  .me {
    display: flex;
    justify-content: flex-end;
    padding: 0px 20px;
    .text {
      display: inline-block;
      padding: 8px 10px;
      background-color: #70a2ff;
      max-width: 70%;
      border-radius: 10px;
      margin-top: 5px;
    }
  }
  .message {
    .row {
      margin-bottom: 5px;
    }
  }
  li:first-child {
    padding-top: 20px;
  }
  li:last-child {
    padding-bottom: 25px;
  }
  .loading-btns {
    display: inline;
    width: 100px;
    margin-top: -17px;
    margin-left: -5px;
  }
}

.typing-area {
  width: 100%;
  border-radius: 12px;
  background: white;
  margin-top: 0px;
  padding: 15px;
  .row {
    margin: 0;
    margin-bottom: 3px;
  }
  textarea {
    border: 1px solid rgba(0, 0, 0, 0.155);
    font-size: 17px;
  }
}

@media only screen and (max-width: 600px) {
  .dialogue-area {
    margin-top: 15px;
    .dialogue-box {
      height: 60vh;
      margin-top: 0vh;
    }
  }
  .sidebar {
    position: absolute;
    margin-top: 0px;
  }

  .row-typing-area {
    position: relative;
  }

  .dialogue-area .sidebar {
    padding: 0px 20px;
    padding: 0px 0px;
    .cont {
      max-width: 100%;
    }
  }
}
</style>
