<template>
  <div class='vue-full-screen-file-drop' :class='classes'>
    <slot>
      <div class='vue-full-screen-file-drop__content'>
        {{ text }}
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VueFullScreenFileDrop',
  props: {
    formFieldName: {
      type: String,
      default: 'upload',
    },
    text: {
      type: String,
      default: 'Upload Files',
    },
  },
  data() {
    return {
      visible: false,
      lastTarget: null,
    };
  },
  computed: {
    classes() {
      return {
        'vue-full-screen-file-drop--visible': this.visible,
      };
    },
  },
  methods: {
    onDragEnter(e) {
      this.lastTarget = e.target;
      this.show();
    },
    onDragLeave(e) {
      if (e.target === this.lastTarget) {
        this.hide();
      }
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();
      this.hide();

      const files = e.dataTransfer.files;
      const formData = this.getFormData(files);

      this.$emit('drop', formData, files);
    },
    getFormData(files) {
      const formData = new FormData();

      Array.prototype.forEach.call(files, file => {
        formData.append(this.formFieldName, file, file.name);
      });

      return formData;
    },
	show() {	
      this.visible = true;
	  document.body.classList.add('file-drop-open');
	},
	hide() {	
        this.visible = false;
		document.body.classList.remove('file-drop-open');
	},
  },
  mounted() {
    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('dragover', this.onDragOver);
    window.addEventListener('drop', this.onDrop);
  },
  beforeDestroy() {
    window.removeEventListener('dragenter', this.onDragEnter);
    window.removeEventListener('dragleave', this.onDragLeave);
    window.removeEventListener('dragover', this.onDragOver);
    window.removeEventListener('drop', this.onDrop);
  },
};
</script>

<style lang='css'>
  .vue-full-screen-file-drop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    visibility: hidden;
    opacity: 0;
    transition: visibility 200ms, opacity 200ms;
  }

  .vue-full-screen-file-drop--visible {
    opacity: 1;
    visibility: visible;
  }

  .vue-full-screen-file-drop__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 4em;
  }

  .vue-full-screen-file-drop__content:before {
    border: 5px dashed #fff;
    content: "";
    bottom: 60px;
    left: 60px;
    position: absolute;
    right: 60px;
    top: 60px;
  }
</style>
