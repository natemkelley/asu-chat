<template>
  <div
    class="waves-effect waves-light button"
    :class="{ stop: openModal }"
    @click="toggleModal"
  >
    {{ buttonText }}
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: { Card },
  data() {
    return {
      openModal: false,
    };
  },
  computed: {
    buttonText() {
      return this.openModal ? "CLOSE MODAL" : "OPEN MODAL";
    },
  },
  methods: {
    toggleModal() {
      this.openModal = !this.openModal;
      this.$fireDb.ref().update({
        showPointsModal: this.openModal,
      });
    },
  },
};
</script>

<style scoped>
.button {
  font-size: 30px;
  cursor: pointer;
  border: 3px solid black;
  padding: 3px 22px;
  border-radius: 12px;
  background: #35d435;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
}

.button.stop {
  background: rgb(235, 104, 104);
}
</style>
