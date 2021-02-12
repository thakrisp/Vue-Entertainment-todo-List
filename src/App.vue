<template>
  <div class="container mx-auto max-w-max px-4 text-center">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      class="object-none object-center"
    />
  </div>
  <layout />
</template>

<script>
import layout from './components/Layout';

export default {
  name: 'App',
  components: {
    layout,
  },
  props: {},
};
</script>

<style src="./assets/css/tailwind.css" />

<style>
body {
  background-color: rgba(12, 12, 12, 0.89);
}
</style>
