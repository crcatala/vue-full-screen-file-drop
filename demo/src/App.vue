<template>
  <div id='app'>
    <GithubRepoLink/>
    <div class='title'>
      Vue Full-Screen File Drop
    </div>
    <div class='subtitle'>
      Drag and drop files on page
    </div>
    <component :is='currentView' @drop='drop'></component>
    <img src='./assets/logo.png'>
    <div v-if='files' class='file-list'>
      <div v-for='(file, index) in files' class='file-item' :key='`${file}-${index}`'>
        {{ file }}
      </div>
    </div>
    <div class='example-selector' @click='exampleSelect'>
      👉 Try {{ nextExampleName }} Example
    </div>
  </div>
</template>

<script>
import ExampleBasic from './ExampleBasic.vue';
import ExampleCustomSlot from './ExampleCustomSlot.vue';
import GithubRepoLink from './GithubRepoLink.vue';

export default {
  name: 'app',
  components: {
    ExampleBasic,
    ExampleCustomSlot,
    GithubRepoLink,
  },
  data() {
    return {
      currentView: 'ExampleBasic',
      files: [],
    };
  },
  computed: {
    nextExampleName() {
      if (this.currentView === 'ExampleBasic') {
        return 'Custom Slot';
      } else {
        return 'Basic';
      }
    },
  },
  methods: {
    drop(formData, files) {
      this.files = Array.prototype.map.call(files, file => file.name);
    },
    exampleSelect() {
      if (this.currentView === 'ExampleBasic') {
        this.currentView = 'ExampleCustomSlot';
      } else {
        this.currentView = 'ExampleBasic';
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

.title {
  font-size: 1.8em;
}

.file-item {
  color: #2c3e50;
  font-size: 1.4em;
  padding: 0.2em;
}

.example-selector {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 6px;
  border: 1px solid grey;
  border-radius: 3px;
  cursor: pointer;
}
</style>
