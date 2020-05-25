<template>
  <div class="page">
    <div class="loader" v-if="loading"><RotateSquare2 /></div>
    <div v-else class="indicators">
      <div class="box">
        <Battery
          class="item"
          :indicatorToggles="indicatorToggles"
          :isAdmin="robot"
          :roomId="id"
        />
        <BinaryIndicator
          class="item"
          name="Stuck"
          :indicatorToggles="indicatorToggles"
          :isAdmin="robot"
          :roomId="id"
        />
        <TextIndicator
          class="item"
          name="Blockage"
          :indicatorToggles="indicatorToggles"
          :isAdmin="robot"
          :roomId="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { RotateSquare2 } from "@/node_modules/vue-loading-spinner";
import Battery from "@/components/Battery";
import BinaryIndicator from "@/components/BinaryIndicator";
import TextIndicator from "@/components/textIndicator";

export default {
  layout: "chat",
  data() {
    return {
      active: false,
      roomId: null,
      loading: true,
      indicatorToggles: [],
      robot: null,
      sessionName: "Session Name",
    };
  },
  components: {
    RotateSquare2,
    Battery,
    BinaryIndicator,
    TextIndicator,
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
        this.loading = false;
        this.roomId = data.data().uuid;
      });

    this.$fireStore
      .collection("rooms")
      .doc(this.id)
      .collection("indicatorToggles")
      .orderBy("timeStamp", "desc")
      .onSnapshot((data) => {
        if (data.docs.length) {
          this.indicatorToggles = data.docs.map((doc) => doc.data());
        }
      });
  },
  methods: {},
  created() {
    this.robot = this.$route.query.robot;
  },
};
</script>

<style scoped lang="scss">
.loader {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  margin-top: 30px;
}

.indicators {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .box {
    background: rgb(238, 238, 238);
    max-width: 550px;
    width: 100vw;
    height: auto;
    border: 3px solid black;
    padding: 10px;
    .item {
      border: 3px solid black;
      border-radius: 15px;
      padding: 10px;
      margin-bottom: 10px;
      background: rgb(197, 197, 197);
    }
  }
}
</style>
