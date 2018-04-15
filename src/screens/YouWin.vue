<template>
<div class="you-win">
  <button v-on:click="show = !show">Переключить</button>
  <transition name="fade" :duration="{ 'enter-active': 3000, leave: 3000 }">
    <p v-if="show">привет</p>
  </transition>
  <br>
  You Win<br>Congratulations!
  <br>
  <br>
  <router-link to="gameplay">Start Game</router-link>
</div>
</template>

<script>
export default {
  data() {
    return { show: false };
  },
};
</script>

<style lang="scss">
  .fade-enter-active {
    // transition: opacity 0.1s ease 0s;
    transition-property: opacity;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-leave-active {
    color: #000;
    transition: opacity 0.1s ease 0s;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .you-win {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 50px 20px;
    z-index: 9999;
    background: #fafafa;
    font-size: 36px;
    color: mediumseagreen;
  }
</style>
