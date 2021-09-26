<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
    <the-footer></the-footer>

</template>

<script>
import TheHeader from './components/general/TheHeader.vue';
import TheFooter from './components/general/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter
  },
  data: () => ({
    //
  }),
}
</script>

<style>

* {
  box-sizing: border-box;
}


html {
  font-family: "Roboto", sans-serif;
}

body {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    min-height: 100vh;
    margin-bottom: 50px;
}

.btn-primary{
        background-color: #3B4018;
        border: solid 1px #efefef;
        color: #fff;
        transition: all 200ms ease-in-out;
    }

.btn-primary:hover{
        background-color: #fff;
        border: solid 1px #3B4018;
        color: #3B4018;
    }

.btn-outline-primary{
        background-color: #fff;
        border: solid 1px #3B4018;
        color: #3B4018;
}

.btn-outline-primary:hover{
      background-color: #3B4018;
        border: solid 1px #efefef;
        color: #fff;
        transition: all 200ms ease-in-out;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

 .btn-check:focus + .btn-primary, .btn-primary:focus {

    box-shadow: 0 0 0 0.25rem rgb(49 132 253 / 50%);

    background-color: #3B4018;
        border: solid 1px #efefef;
        color: #fff;
}

.btn-primary:disabled, .btn-primary.disabled {
  background-color: #e5e9ec;
  border-color: #e5e9ec;
  color: #2b2b2b;
}

</style>
