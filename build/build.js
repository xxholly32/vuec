var rollup = require("rollup");
// var buble = require("rollup-plugin-buble");
var commonjs = require("rollup-plugin-commonjs");
var nodeResolve = require("rollup-plugin-node-resolve");
var uglify = require("rollup-plugin-uglify");

var build = function(opts) {
  rollup
    .rollup({
      entry: "packages/" + opts.entry,
      plugins: [
        // buble({
        //   objectAssign: "assign"
        // }),
        commonjs(),
        nodeResolve()
      ].concat(opts.plugins || []),
      external: opts.external
    })
    .then(function(bundle) {
      var dest = "dist/" + (opts.output || opts.entry);

      console.log(dest);
      bundle.write({
        format: opts.format || "umd",
        moduleName: opts.moduleName || "Vuec",
        globals: {
          codemirror: "CodeMirror"
        },
        dest: dest
      });
    })
    .catch(function(err) {
      console.error(err);
    });
};

build({
  entry: "vuec/index.umd.js",
  output: "vuec/dist/vuec.js"
});

build({
  entry: "vuec/index.umd.js",
  output: "vuec/dist/vuec.min.js"
});
