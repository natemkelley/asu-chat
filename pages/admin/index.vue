<template>
  <div></div>
</template>

<script>
export default {
  beforeMount() {
          let pathArr = window.location.pathname.split("/");
    let currentRoute = pathArr[pathArr.length - 1];
    if (currentRoute == "admin" || currentRoute == "admin/") {
    this.$router.push({
      path: "/admin/createRoom"
    });
    }
  }
};
</script>
