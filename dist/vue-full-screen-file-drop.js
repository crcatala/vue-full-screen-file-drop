(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueFullScreenFileDrop = factory());
}(this, function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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

  function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof isShadowMode === 'function') {
          createInjectorSSR = createInjector;
          createInjector = isShadowMode;
          isShadowMode = false;
      }
      // Vue.extend constructor export interop
      var options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
      // render functions
      if (compiledTemplate && compiledTemplate.render) {
          options.render = compiledTemplate.render;
          options.staticRenderFns = compiledTemplate.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (injectStyle) {
                  injectStyle.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (injectStyle) {
          hook = isShadowMode
              ? function () {
                  injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
              }
              : function (context) {
                  injectStyle.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return defaultExport;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;
  // For security concerns, we use only base name in production mode. See https://github.com/vuejs/rollup-plugin-vue/issues/258
  script.__file = "/Users/christian/code/oss/vue-full-screen-file-drop/src/VueFullScreenFileDrop.vue";

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "vue-full-screen-file-drop", class: _vm.classes },
      [
        _vm._t("default", [
          _c("div", { staticClass: "vue-full-screen-file-drop__content" }, [
            _vm._v("\n      " + _vm._s(_vm.text) + "\n    ")
          ])
        ])
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-c9270262_0", { source: "\n.vue-full-screen-file-drop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10000;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.4);\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 200ms, opacity 200ms;\n}\n.vue-full-screen-file-drop--visible {\n  opacity: 1;\n  visibility: visible;\n}\n.vue-full-screen-file-drop__content {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  color: #fff;\n  font-size: 4em;\n}\n.vue-full-screen-file-drop__content:before {\n  border: 5px dashed #fff;\n  content: \"\";\n  bottom: 60px;\n  left: 60px;\n  position: absolute;\n  right: 60px;\n  top: 60px;\n}\n", map: {"version":3,"sources":["/Users/christian/code/oss/vue-full-screen-file-drop/src/VueFullScreenFileDrop.vue"],"names":[],"mappings":";AAoFA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,iCAAA;EACA,kBAAA;EACA,UAAA;EACA,2CAAA;AACA;AAEA;EACA,UAAA;EACA,mBAAA;AACA;AAEA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,cAAA;AACA;AAEA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;AACA","file":"VueFullScreenFileDrop.vue","sourcesContent":["<template>\n  <div class='vue-full-screen-file-drop' :class='classes'>\n    <slot>\n      <div class='vue-full-screen-file-drop__content'>\n        {{ text }}\n      </div>\n    </slot>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'VueFullScreenFileDrop',\n  props: {\n    formFieldName: {\n      type: String,\n      default: 'upload',\n    },\n    text: {\n      type: String,\n      default: 'Upload Files',\n    },\n  },\n  data() {\n    return {\n      visible: false,\n      lastTarget: null,\n    };\n  },\n  computed: {\n    classes() {\n      return {\n        'vue-full-screen-file-drop--visible': this.visible,\n      };\n    },\n  },\n  methods: {\n    onDragEnter(e) {\n      this.lastTarget = e.target;\n      this.visible = true;\n    },\n    onDragLeave(e) {\n      if (e.target === this.lastTarget) {\n        this.visible = false;\n      }\n    },\n    onDragOver(e) {\n      e.preventDefault();\n    },\n    onDrop(e) {\n      e.preventDefault();\n      this.visible = false;\n\n      const files = e.dataTransfer.files;\n      const formData = this.getFormData(files);\n\n      this.$emit('drop', formData, files);\n    },\n    getFormData(files) {\n      const formData = new FormData();\n\n      Array.prototype.forEach.call(files, file => {\n        formData.append(this.formFieldName, file, file.name);\n      });\n\n      return formData;\n    },\n  },\n  mounted() {\n    window.addEventListener('dragenter', this.onDragEnter);\n    window.addEventListener('dragleave', this.onDragLeave);\n    window.addEventListener('dragover', this.onDragOver);\n    window.addEventListener('drop', this.onDrop);\n  },\n  beforeDestroy() {\n    window.removeEventListener('dragenter', this.onDragEnter);\n    window.removeEventListener('dragleave', this.onDragLeave);\n    window.removeEventListener('dragover', this.onDragOver);\n    window.removeEventListener('drop', this.onDrop);\n  },\n};\n</script>\n\n<style lang='css'>\n  .vue-full-screen-file-drop {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 10000;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0,0,0,0.4);\n    visibility: hidden;\n    opacity: 0;\n    transition: visibility 200ms, opacity 200ms;\n  }\n\n  .vue-full-screen-file-drop--visible {\n    opacity: 1;\n    visibility: visible;\n  }\n\n  .vue-full-screen-file-drop__content {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    color: #fff;\n    font-size: 4em;\n  }\n\n  .vue-full-screen-file-drop__content:before {\n    border: 5px dashed #fff;\n    content: \"\";\n    bottom: 60px;\n    left: 60px;\n    position: absolute;\n    right: 60px;\n    top: 60px;\n  }\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var VueFullScreenFileDrop = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      createInjector,
      undefined
    );

  return VueFullScreenFileDrop;

}));
