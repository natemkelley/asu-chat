<template>
  <div
    ref="draggableContainer"
    class="draggable-container"
    @mousedown="dragMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["top", "left"],
  mounted() {
    this.$refs.draggableContainer.style.top = `${this.top}px`;
    this.$refs.draggableContainer.style.left = `${this.left}px`;
  },
  data: function() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  methods: {
    dragMouseDown: function(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style scoped lang="scss">
.draggable-container {
  position: absolute;
  z-index: 9999;
  padding: 5px 20px;
  width: 160px;
  border-radius: 12px;
  border: 3px solid black;
  box-shadow: 0 0 black;
  top: 0;
  background: white;
  cursor: move;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
