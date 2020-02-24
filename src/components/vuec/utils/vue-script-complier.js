import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

/**
 * javascript comment
 * @Author: xiangxiao3
 * @Date: 2020-02-22 11:37:20
 * @Desc:
 */
function parseDaddyName(str, parentname) {
  const ast = parser.parse(str, { sourceType: 'module' });
  let result = {};

  traverse(ast, {
    ObjectProperty(path) {
      const parent = path.findParent(p => {
        return p.node.key ? p.node.key.name === parentname : false;
      });
      if (parent) {
        result[path.node.key.name] = path.node.value.value;
      }
    },
  });
  return result;
}

// /**
//  * javascript comment
//  * @Author: xiangxiao3
//  * @Date: 2020-02-22 11:37:20
//  * @Desc:
//  */
function parseGetFunction(str, parentname) {
  const ast = parser.parse(str, { sourceType: 'module' });
  let result = {};

  traverse(ast, {
    ObjectMethod(path) {
      const parent = path.findParent(p => p.isObjectProperty());
      if (parent && parent.node.key.name === parentname) {
        result[path.node.key.name] = path.node;
      }
    },
  });
  return result;
}

export { parseDaddyName, parseGetFunction };
