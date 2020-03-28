<template>
  <div class="page container">
    <div class="loader" v-show="loading"><RotateSquare2 /></div>

    <div v-show="!loading" class="row dialogue-area">
      <div class="dialogue-box z-depth-1 col offset-m2 m6 s8">
        <ul
          class="messages"
          v-chat-scroll="{ always: true, smooth: true, scrollonremoved: true }"
        >
          <li
            class="message"
            :key="message + n"
            v-for="(message, n) in messages"
          >
            <div class="row robot" v-if="message.sender == 'Robot'">
              <div class="robot-img">
                <img
                  src="@/assets/images/robot.jpg"
                  alt=""
                  class="responsive-img circle"
                />
              </div>
              <div class="text">{{ message.message }}</div>
            </div>

            <div class="row me" v-if="message.sender == 'Navigator'">
              <div class="text">{{ message.message }}</div>
            </div>
          </li>
          <li class="message typing" v-if="robotTyping || navigatorTyping">
            <div class="row robot" v-show="robotTyping && !robot">
              <div class="robot-img">
                <img
                  src="https://images.assetsdelivery.com/compings_v2/ppbig/ppbig1904/ppbig190403249.jpg"
                  alt=""
                  class="responsive-img circle"
                />
              </div>
              <div class="loading-btns">
                <img
                  class="responsive-img"
                  src="https://media0.giphy.com/media/12yixaK3jASpb2/source.gif"
                />
              </div>
            </div>
            <div class="row me" v-show="navigatorTyping && robot">
              <div class="loading-btns">
                <img
                  class="responsive-img"
                  src="https://media0.giphy.com/media/12yixaK3jASpb2/source.gif"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="sidebar col m4 s4">
        <div class="row cont session-name z-depth-1">
          <h5>{{ sessionName }}</h5>
        </div>
        <div class="row cont close-session z-depth-1" v-if="robot">
          <a
            @click="closeSession"
            class="btn waves-effect waves-light red darken-1 btn-small"
            >End Session</a
          >
          <p>
            When you end the session you will be redirected to a page where you
            can export your data .
          </p>
        </div>
      </div>
    </div>

    <div v-if="!loading && !observe" class="row">
      <div class="typing-area z-depth-2 col offset-m2 m6 s8">
        <div class="row">
          <textarea
            @keydown="updateTyping"
            v-model="textarea"
            v-on:keyup.enter="sendMessage"
          ></textarea>
        </div>
        <div class="row">
          <button
            :class="{ disabled: !textarea }"
            class="right btn green darken-1 waves-effect waves-light"
            @click="sendMessage"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
import { RotateSquare2 } from "@/node_modules/vue-loading-spinner";
import ThreeCircle from "@/components/threeCircles";
import ViewIndicators from '@/components/viewIndicators'

export default {
  layout: "chat",
  data() {
    return {
      active: false,
      textarea: null,
      id: null,
      loading: true,
      messages: [],
      observe: null,
      robot: null,
      robotTyping: false,
      navigatorTyping: false,
      typing: false,
      sessionName: "Session Name"
    };
  },
  components: {
    RotateSquare2,
    ThreeCircle,
    ViewIndicators
  },
  async asyncData({ params, error }) {
    return params;
  },
  mounted() {
    //room
    this.$fireStore
      .collection("rooms")
      .doc(this.id)
      .onSnapshot(data => {
        this.sessionName = data.data().roomName;
        document.title = "ASU Chat | " + this.sessionName;
        this.active = data.data().active;
      });
    //chat
    this.$fireStore
      .collection("rooms")
      .doc(this.id)
      .collection("chats")
      .orderBy("chatNumber")
      .onSnapshot(data => {
        this.messages = [];
        data.docs.forEach(doc => {
          this.messages.push(doc.data());
        });
        this.loading = false;
      });
  },
  methods: {
    sendMessage() {
      this.textarea = this.textarea.trim();
      if (!this.textarea) {
        M.toast({ html: "Please enter something", classes: "red rounded" });
        return;
      }

      if (!this.active) {
        M.toast({
          html: "Session is no longer active",
          classes: "red rounded"
        });
        return;
      }

      var updateCount = this.$fireStore.collection("rooms").doc(this.id);
      this.$fireStore
        .runTransaction(transaction => {
          return transaction.get(updateCount).then(function(sfDoc) {
            if (!sfDoc.exists) {
              throw "Document does not exist!";
            }

            var newNum = sfDoc.data().numberOfChat + 1;
            transaction.update(updateCount, { numberOfChat: newNum });
            return newNum;
          });
        })
        .then(newCount => {
          let time = new Date().getTime();

          this.$fireStore
            .collection("rooms")
            .doc(this.id)
            .collection("chats")
            .add({
              message: this.textarea,
              chatNumber: newCount,
              timestamp: time,
              sender: this.robot ? "Robot" : "Navigator",
              roomName: this.sessionName
            });

          this.textarea = null;
        });
    },
    updateTyping() {
      this.typing = true;
    },
    closeSession() {
      this.$fireStore
        .collection("rooms")
        .doc(this.id)
        .update({
          active: false
        })
        .then(() => {
          this.$router.push({
            path: "/admin/pastRooms"
          });
        });
    }
  },
  created() {
    this.observe = this.$route.query.observe;
    this.robot = this.$route.query.robot;
  }
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

    .cont{
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
</style>
