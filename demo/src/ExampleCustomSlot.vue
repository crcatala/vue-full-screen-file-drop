<template>
  <div>
    <VueFullScreenFileDrop @drop='drop'>
      <div class='custom-content'>
        🍕 Custom Slot Content 🍕
      </div>
    </VueFullScreenFileDrop>
  </div>
</template>

<script>
import VueFullScreenFileDrop from 'plugin';
import 'plugin.css';

export default {
  name: 'ExampleCustomSlot',
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

<style scoped>
.custom-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #FF8C8C;
  font-size: 2.8em;
}

.custom-content:before {
  border: 5px dashed #353A42;
  content: "";
  bottom: 60px;
  left: 60px;
  position: absolute;
  right: 60px;
  top: 60px;
}
</style>
