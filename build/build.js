const rollup = require('rollup').rollup;
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');
const fs = require('fs');

const inputOptions = {
  input: 'src/index.js',
  plugins: [
    vue({
      compileTemplate: true,
      // css: true,
      css(styles, stylesNodes) {
        write(
          'dist/vue-full-screen-file-drop.css',
          new CleanCSS({ format: 'beautify' }).minify(styles).styles,
        );
        write(
          'dist/vue-full-screen-file-drop.min.css',
          new CleanCSS().minify(styles).styles,
        );
      },
    }),
    buble(),
  ],
};

const outputOptions = {
  name: 'VueFullScreenFileDrop',
  file: 'dist/vue-full-screen-file-drop.js',
  format: 'umd',
};

function write(dest, code) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(dest, code, function(err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve();
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

async function build() {
  const bundle = await rollup(inputOptions);
  const { code } = await bundle.generate(outputOptions);
  write('dist/vue-full-screen-file-drop.js', code);
  const minified = UglifyJS.minify(code, {
    sourceMap: {
      filename: 'vue-full-screen-file-drop.min.js',
    },
  });
  write('dist/vue-full-screen-file-drop.min.js', minified.code);
  write('dist/vue-full-screen-file-drop.min.js.map', minified.map);
}

build();
