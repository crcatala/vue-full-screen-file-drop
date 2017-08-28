(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueFullScreenFileDrop = factory());
}(this, (function () { 'use strict';

var VueFullScreenFileDrop$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-full-screen-file-drop",class:_vm.classes},[_vm._t("default",[_c('div',{staticClass:"vue-full-screen-file-drop__content"},[_vm._v(_vm._s(_vm.text))])])],2)},staticRenderFns: [],
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
  data: function data() {
    return {
      visible: false,
      lastTarget: null,
    };
  },
  computed: {
    classes: function classes() {
      return {
        'vue-full-screen-file-drop--visible': this.visible,
      };
    },
  },
  methods: {
    onDragEnter: function onDragEnter(e) {
      this.lastTarget = e.target;
      this.visible = true;
    },
    onDragLeave: function onDragLeave(e) {
      if (e.target === this.lastTarget) {
        this.visible = false;
      }
    },
    onDragOver: function onDragOver(e) {
      e.preventDefault();
    },
    onDrop: function onDrop(e) {
      e.preventDefault();
      this.visible = false;

      var files = e.dataTransfer.files;
      var formData = this.getFormData(files);

      this.$emit('drop', formData, files);
    },
    getFormData: function getFormData(files) {
      var this$1 = this;

      var formData = new FormData();

      Array.prototype.forEach.call(files, function (file) {
        formData.append(this$1.formFieldName, file, file.name);
      });

      return formData;
    },
  },
  mounted: function mounted() {
    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('dragover', this.onDragOver);
    window.addEventListener('drop', this.onDrop);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('dragenter', this.onDragEnter);
    window.removeEventListener('dragleave', this.onDragLeave);
    window.removeEventListener('dragover', this.onDragOver);
    window.removeEventListener('drop', this.onDrop);
  },
};

return VueFullScreenFileDrop$1;

})));
