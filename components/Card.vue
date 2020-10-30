<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss">
.card {
  width: 100%;
  min-height: 270px;
  border: 3px solid black;
  border-radius: 15px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.divider {
  height: 3px;
  overflow: hidden;
  background-color: black;
  margin: 12px 0px;
}
</style>
