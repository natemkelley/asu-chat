<template>
  <div class="points-modal">
    <div class="modal">
      <div class="modal-content">
        <transition name="bounce" mode="out-in">
          <h1 :key="points">{{ points }}</h1>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["points"],
  mounted() {
    const options = { endingTop: 35, opacity: 1 };
    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, options);
    instances[0].open();
  },
};
</script>

<style scoped>
.points-modal {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  border-radius: 25px;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold !important;
}
</style>
