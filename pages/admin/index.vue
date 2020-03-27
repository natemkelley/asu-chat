<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    let pathArr = window.location.pathname.split("/");
    let currentRoute = pathArr[pathArr.length - 2];
    if (currentRoute == "admin" || currentRoute == "admin/") {
      this.$router.push({
        path: "/admin/createRoom"
      });
    }
  }
};
</script>
