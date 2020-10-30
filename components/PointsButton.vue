<template>
  <div class="points-button" :class="{ 'light-red': red }">
    {{ label }}
    <div class="waves-effect waves-light button" :class="{ 'light-red': red }">
      {{ points }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "points", "red"],
};
</script>

<style lang="scss" scoped>
.points-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 1px;
  cursor: pointer;
  padding: 2px;
  &:hover {
    background: #d6eccf;
    border-radius: 2px;
  }
  .button {
    text-align: center;
    min-width: 139px;
    cursor: pointer;
    border: 3px solid black;
    padding: 1px 21px;
    border-radius: 12px;
    background: #35d435;
  }
  .light-red {
    background: #eb6868;
  }
}
.light-red {
  &:hover {
    background: #eb686854;
  }
}
</style>
