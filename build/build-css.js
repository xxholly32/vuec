var fs = require("fs");
var cssnano = require("cssnano").process;
var resolve = require("path").resolve;
var postcss = require("postcss");

var file = "vuec.css";
var processor = postcss([require("postcss-salad")]);

var save = function(file, content) {
  fs.writeFileSync(resolve(__dirname, "../packages/vuec/dist/", file), content);
};
var load = function(file) {
  return fs
    .readFileSync(resolve(__dirname, "../packages/vuec/style/", file))
    .toString();
};
var loadDist = function(file) {
  return fs
    .readFileSync(resolve(__dirname, "../packages/vuec/dist/", file))
    .toString();
};

processor
  .process(load(file), {
    from: resolve(__dirname, "../packages/vuec/style/", file)
  })
  .then(function(result) {
    save(file, result.css);
    console.log("salad - " + file);
    cssnano(loadDist(file)).then(function(result) {
      save("vuec.min.css", result.css);
      console.log("cssnao - vuec.min.css");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
