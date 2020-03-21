<template>
  <div>
    <div class="container create-room">
      <h4 class="center-align">Create Room</h4>

      <div class="row">
        <div class="input-field col s12">
          <input v-model="roomName" id="roomName" type="text" />
          <label for="roomName">Room Name</label>
          <span class="helper-text"
            >This is used to assist participant in joining the room</span
          >
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input v-model="org" id="email" type="text" class="" />
          <label for="email">Organization</label>
          <span class="helper-text">This is used to filter studies</span>
        </div>
      </div>

      <div class="right">
        <button
          @click="createRoom"
          class="btn waves-effect waves-light"
          :class="{ grey: !roomName || !org }"
          type="submit"
          name="action"
        >
          Create
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      roomName: null,
      org: null
    };
  },
  methods: {
    createRoom() {
      if (!this.roomName) {
        M.toast({ html: "No Room Name!", classes: "red rounded" });
        return;
      }
      if (!this.org) {
        M.toast({ html: "No Orgization!", classes: "red rounded" });
        return;
      }

      let uuid = uuidv4();
      this.$fireStore
        .collection("rooms")
        .doc(uuid)
        .set({
          roomName: this.roomName,
          org: this.org,
          time: new Date(),
          active: true,
          numberOfChat: 0,
          uuid: uuid,
          navigatorTyping: false,
          robotTyping: false,
          chats: []
        })
        .then(data => {
          this.$router.push({
            path: "/chat/" + uuid,
            query: { robot: true }
          });
        });
    }
  }
};
</script>

<style scoped>
.create-room {
  max-width: 430px;
  padding: 25px;
}

.create-room .row {
  margin-bottom: 0px;
}
</style>
