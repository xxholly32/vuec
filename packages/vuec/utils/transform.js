import { fetchExpression } from "./vue-script-complier";
// function renderScoped(h, slotarr) {
//   let slots = {};
//   for (let slot of slotarr) {
//     slots.body = () =>
//       h(slot.type, {
//         props: slot.props,
//         attr: slot.attr,
//       });
//   }
//   return slots;
// }

function transformStr(str, script) {
  const braces = /(?={{).*(?<=}})/;

  // TODO： cant match spaces
  const match = str.match(/(?<={{\s+).*(?=\s+}})/);

  if (match) {
    str = str.replace(braces, fetchExpression(match[0], script));
  }
  return str;
}

function renderElement(h, comp, script) {
  let children = [];

  if (comp.children && comp.children.length > 0) {
    for (let n of comp.children) {
      if (n.type === 1) {
        children.push(renderElement(h, n, script));
      } else if (n.type === 2) {
        // {{xx}} 表达式解析
        children.push(transformStr(n.text, script));
      } else if (n.type === 3) {
        children.push(n.text);
      }
    }
  }
  let props = {};
  let slot = null;
  let style = comp.staticStyle ? JSON.parse(comp.staticStyle) : {};
  let kclass = comp.staticClass
    ? comp.staticClass
        .slice(1, comp.staticClass.length - 1)
        .split(" ")
        .reduce((res, val) => {
          res[val] = val;
          return res;
        }, {})
    : [];
  let on = {};
  let domProps = {};

  if (comp.attrsMap) {
    for (let key in comp.attrsMap) {
      // filter string contant :, like :msg
      let match = key.match(/(?<=:).*/);

      if (match) {
        props[match[0]] = script
          ? fetchExpression(comp.attrsMap[key], script)
          : {};
      } else if (key === "v-slot" || key === "slot") {
        slot = comp.attrsMap[key];
      } else if (key === "style") {
        continue;
      } else if (key === "class") {
        continue;
      } else if (key === "model" || key === "v-model") {
        props.value = fetchExpression(comp.attrsMap[key], script);
        // 未加入双向绑定，mock可以从这里面加
        // debugger;
        continue;
      } else if (key.match(/(?<=(@|v-))\w+/)) {
        // event
        let eventkey = key.match(/(?<=(@|v-))\w+/)[0];
        on[eventkey] = fetchExpression(comp.attrsMap[key], script, "methods");
        continue;
      } else {
        props[key] = comp.attrsMap[key];
      }
    }
  }

  // depobj api https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  const depObj = {
    // props: comp.attrsMap,
    props,
    slot,
    style,
    class: kclass,
    domProps,
    on
    // scopedSlots: comp.scopedSlots ? renderScoped(h, comp.scopedSlots) : null,
  };
  const tag = comp.tag === "template" ? "div" : comp.tag;

  return h(tag, depObj, children);
}

export default {
  renderFunc: renderElement
};
