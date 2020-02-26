import { run } from "xxtest-myjs";

/**
 * javascript comment
 * @Author: xiangxiao3
 * @Date: 2020-02-22 11:37:20
 * @Desc:
 */
function parseDaddyName(str, scriptname) {
  try {
    if (str.indexOf("export default") > -1) {
      str = str.replace(/export default /, "module.exports = ");
    }

    // js to js function from  https://github.com/anuoua/minejs
    const runner = run(str, {}, true);

    return typeof runner[scriptname] === "function"
      ? runner[scriptname]()
      : runner[scriptname];
  } catch (error) {
    console.error(error);
  }
}

/**
 * javascript comment
 * @Author: xiangxiao3
 * @Date: 2020-02-26 15:35:49
 * @Desc: get propertys from script
 */
function fetchExpression(key, script, type = "data") {
  if (key.match(/[a-zA-Z]+/)) {
    let props = parseDaddyName(script.content, type);
    // 用.分割，form.name => props[form][name]
    return key.split(".").reduce((res, val) => res[val], props);
  } else {
    return run(key);
  }
}

export { parseDaddyName, fetchExpression };
