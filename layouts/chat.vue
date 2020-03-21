<template>
  <div class="page">
    <nuxt />
  </div>
</template>

<script>
export default {
    beforeMount(){ 
        document.body.style.background = 'rgb(238, 238, 238)';
    },
    beforeDestroy(){
              document.body.style.background = 'white';
    }
}
</script>

<style scoped>

</style>