<template>
  <div>
    <div class="indicators-cont z-depth-1">
      <div class="collection">
        <a
          @click="toggleIndicator(ind)"
          v-for="ind in indicators"
          :key="ind.name"
          :class="{ clickable: robot, 'no-hover': !robot }"
          class="collection-item black-text"
          ><span class="badge white-text red" :class="{ green: ind.binary }">{{
            ind.binary
          }}</span
          >{{ ind.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["robot", "indicators", "id"],
  methods: {
    toggleIndicator(data) {
      if (!this.robot) {
        return;
      }

      this.indicators.forEach((element, n) => {
        if (element.uuid == data.uuid) {
          this.indicators[n].binary = !this.indicators[n].binary;
        }
      });

      var ref = this.$fireStore.collection("rooms").doc(this.id);
      ref
        .update({
          indicators: this.indicators
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });

      /*this.$fireStore
        .collection("rooms")
        .doc(this.id)
        .collection("chats")
        .add({
          message: '',
          chatNumber: newCount,
          timestamp: time,
          sender: this.robot ? "Robot" : "Navigator",
          roomName: this.sessionName,
          type: "message"
        });*/
    }
  },
  watch: {
    indicators() {
      console.log(this.indicators);
    }
  }
};
</script>

<style lang="scss" scoped>
.indicators-cont {
  background: white;
  border-radius: 15px;
  padding: 20px;
  .collection-item {
    padding: 13px;
  }
  .badge {
    border-radius: 7.5px;
    min-width: 50px;
    height: 25px;
    line-height: 25px;
    margin-top: calc(0.75rem - 13px);
  }
}

.collection-item.no-hover:hover {
  background: white !important;
}
</style>
