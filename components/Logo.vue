<template>
  <div>
    <div class="container active-room">
      <h4 class="center-align">Active Rooms</h4>

      <ul class="collection">
        <li v-for="room in rooms" :key="room.uuid" class="collection-item">
          <div>
            {{ room.roomName }}
            <a
              @click="join(room.uuid)"
              class=" clickable secondary-content waves-effect waves-light btn btn-small light-green darken-2"
              >Join</a
            >
            <a
              @click="observe(room.uuid)"
              class="clickable secondary-content waves-effect waves-light btn btn-small light-blue darken-2"
              >Observe</a
            >
            <a
              @click="end(room.uuid)"
              class="clickable secondary-content waves-effect waves-light btn btn-small red darken-2"
              >End</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      loading: true,
      rooms: []
    };
  },
  mounted() {
    this.$fireStore
      .collection("rooms")
      .where("active", "==", true)
      .onSnapshot(data => {
        setTimeout(() => {
          this.rooms = [];
          data.docs.forEach(doc => {
            this.rooms.push(doc.data());
          });
          this.loading = false;
        }, 300);
      });
  },
  methods: {
    observe(uuid) {
      this.$router.push({
        path: "/chat/" + uuid,
        query: { observe: true }
      });
    },
    join(uuid) {
      this.$router.push({
        path: "/chat/" + uuid,
        query: { robot: true }
      });
    },
    end(uuid) {
      this.$fireStore
        .collection("rooms")
        .doc(uuid)
        .update({
          active: false
        });
    }
  }
};
</script>

<style scoped lang="scss">
.loader {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-top: 30px;
}

.active-room {
  max-width: 530px;
  padding: 25px;
}

.active-room .row {
  margin-bottom: 0px;
}

.btn {
  margin-top: -5px;
}

.secondary-content {
  margin-left: 12.5px;
}

.collection {
  border: none;
}

.collection-item {
  padding: 10px 4px 15px 15px;
  margin-bottom: 15px;
}
</style>
