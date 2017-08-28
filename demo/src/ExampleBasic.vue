<template>
  <div>
    <VueFullScreenFileDrop @drop='drop'/>
  </div>
</template>

<script>
import VueFullScreenFileDrop from 'plugin';
import 'plugin.css';

export default {
  name: 'ExampleBasic',
  components: {
    VueFullScreenFileDrop,
  },
  methods: {
    drop(formData, files) {
      this.$emit('drop', formData, files);
    },
  },
};
</script>

<style>
</style>
