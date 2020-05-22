<template>
  <div>
    <div class="container create-room">
      <h4 class="center-align">Create Room</h4>

      <div class="row choose-name">
        <div class="input-field col s12">
          <input v-model="roomName" id="roomName" type="text" />
          <label for="roomName">Room Name</label>
          <span class="helper-text"
            >This is used to assist participant in joining the room</span
          >
        </div>
      </div>

      <div class="row choose-org">
        <div class="input-field col s12">
          <input v-model="org" type="text" class="" />
          <label for="email">Organization</label>
          <span class="helper-text"
            >This is used to filter studies when exporting data</span
          >
        </div>
      </div>

      <div class="row add-indicators">
        <AddIndicators v-on:updateIndicators="updateIndicators" :org="org" />
      </div>

      <div class="right">
        <button
          @click="createRoom"
          class="btn waves-effect waves-light"
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
import AddIndicators from "@/components/addIndicators";

export default {
  components: { AddIndicators },
  data() {
    return {
      roomName: null,
      org: null,
      indicators: [],
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
          uuid: uuid,
          indicators: this.indicators,
        })
        .then((data) => {
          this.$router.push({
            path: "/room/" + uuid,
            query: { robot: true },
          });
        });
    },
    updateIndicators(data) {
      this.indicators = data;
    },
  },
  mounted() {
    var elems = this.$el.querySelectorAll("select");
    M.FormSelect.init(elems);
  },
};
</script>

<style scoped lang="scss">
.create-room {
  max-width: 430px;
  padding: 25px;
}

.create-room .row {
  margin-bottom: 0px;
  min-height: 97px;
}

.choose-type {
  .input-field {
    margin-top: 30px;
  }
  label {
    top: -23px;
    font-size: 13px;
  }
}
</style>
