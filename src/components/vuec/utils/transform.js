import { parseDaddyName } from "./vue-script-complier";
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

function fetchScript(script, key) {
  let props = parseDaddyName(script.content, "data");
  return props[key];
}
function transformStr(str, script) {
  const braces = /(?={{).*(?<=}})/;

  // TODO： cant match spaces
  const match = str.match(/(?<={{\s+).*(?=\s+}})/);

  if (match) {
    str = str.replace(braces, fetchScript(script, match[0]));
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
        children.push(transformStr(n.text, script));
      } else if (n.type === 3) {
        children.push(n.text);
      }
    }
  }
  let props = {};
  let slot = null;

  if (comp.attrsMap) {
    for (let key in comp.attrsMap) {
      // filter string contant :, like :msg
      let match = key.match(/(?<=:).*/);

      if (match) {
        props[match[0]] = script ? fetchScript(script, match[0]) : {};
      } else if (key === "v-slot") {
        slot = comp.attrsMap[key];
      } else if (key === "slot") {
        slot = comp.attrsMap[key];
      } else {
        props[key] = comp.attrsMap[key];
      }
    }
  }

  const depObj = {
    // props: comp.attrsMap,
    props,
    slot
    // attr: comp.attr,
    // scopedSlots: comp.scopedSlots ? renderScoped(h, comp.scopedSlots) : null,
  };
  const tag = comp.tag === "template" ? "div" : comp.tag;

  // depobj api https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return h(tag, depObj, children);
}

export default {
  renderFunc: (h, ast, script) => {
    return renderElement(h, ast, script);
  }
};
