var SmartVars = {};
var SmartObjs = {};

var SmartVar =  {
  create(data, node, field) {
    let smart = {
      name: field || null,
      node: node,
      dataInternal: data,
      dataListener:  function(val) {},
      set data(val) {
        this.dataInternal = val;
        if (val == 0) {
          val = val.toString();
        }
        if (field) {
          val = this.dataListener({[field]: val}) || val;
        }
        else
          val = this.dataListener(val) || val;
        this.replaceValue(node, val);
      },
      get data() {
        return this.dataInternal;
      },
      getVar: function(field) {
        if (field.indexOf(".") != -1) {
          field = field.split('.').join('.value.data.');
          let to_change = this.data;
          for (f of field.split('.')) {
            to_change = to_change[f];
          }
          return to_change;
        }
        else if (!this.data[field]) {

        }
        return this.data[field];
      },
      cleanObj: function(obj) {
        let cleaned = {};
        for (key of Object.keys(obj)) {
          if (obj[key].value.node.localName == "smartobj") {
            cleaned[key] = this.cleanObj(obj[key].value.data);
          }
          else
            cleaned[key] = obj[key].value.data;
        }
        return cleaned;
      },
      replaceValue: function(node, value) {
        node.innerText = value;
      },
      getObjNodes: function(values, data) {
        let res = [];
        for (key of Object.keys(values)) {
          if (data[key]) {
            if (this.isObject(data[key].value.data) == true) {
              res = res.concat(this.getObjNodes(values[key], data[key].value.data));
            }
            else
              res.push({node: data[key].value.node, value: values[key]});
          }
        }
        return res;
      },
      isObject: function(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
      },
      replaceData: function(obj, data) {
        for (key of Object.keys(data)) {
          if (data[key] != undefined && obj[key] != undefined) {
            if (this.isObject(data[key].value.data) == true && this.isObject(obj[key]) == true) {
              this.replaceData(obj[key], data[key].value.data);
            }
            else {
              data[key].value.set(obj[key]);
            }
          }
        };
      },
      set: function(val, field) {
        if (!field) {
          if (this.isObject(val) == true && this.isObject(val) == true) {
            this.replaceData(val, this.data);
          }
          else
            this.data = val;
        }
        else if (this.isObject(val) != true) {
          this.getVar(field).value.set(val);
        }
        let to_set = this.data;
        if (this.isObject(this.data) == true) {
          to_set = this.cleanObj(this.data);
        }
        val = this.dataListener(to_set) || val;
        if (this.isObject(this.data) == true) {
          let to_update = this.getObjNodes(val, this.data);
          for (elem of to_update) {
            this.replaceValue(elem.node, elem.value);
          }
        }
      },
      get: function(val) {
        return this.dataInternal;
      },
      registerListener: function(listener) {
        this.dataListener = listener;
      },
      addClass: function(c) {
        this.node.classList.add(c);
      },
      removeClass: function(c) {
        this.node.classList.remove(c);
      }
      setStyle: function(prop, value) {
        this.node.style[prop] = value;
      }
    }
    return smart;
  },
  createObj(obj, node) {
    let smartObj = {};
    for (field of Object.keys(obj)) {
      smartObj[field] = {value: this.create(obj[field].value, obj[field].node, field)};
    }
    return smartObj;
  },
};

let vars = document.getElementsByTagName("smartVar");
for (smrtvar of vars) {
  SmartVars[smrtvar.id] = {value: SmartVar.create(smrtvar.innerText, smrtvar), node: smrtvar};
}

function findSmartChilds(node) {
  let res = [];
  for (elem of node.children) {
    if (elem.localName == "smartobjfield") {
      res.push({name: elem.id, value: elem.innerText, node: elem, type: "field"});
    }
    else if (elem.localName == "smartobj") {
      res.push({name: elem.id, node: elem, value: findSmartChilds(elem), type: "obj"});
    }
    if (elem.children.length > 0)
      res = res.concat(findSmartChilds(elem));
  }
  return res;
}

function hasParent(objs, obj) {
  for (pobj of objs) {
    for (child of pobj.value) {
      if (child.name == obj.id && child.type == "obj")
        return true;
      if (child.type == "obj")
        return hasParent(child.value, obj);
    }
  }
  return false;
}

function makeObjTree(HTMLobjs) {
  var objs = [].slice.call(HTMLobjs);
  let res = [];
  for (let i = 0; i < objs.length; i++) {
    if (hasParent(res, objs[i]) == false)
      res.push({name: objs[i].id, node: objs[i], value: findSmartChilds(objs[i]), type: "obj"});
  }
  return res;
}

function createSmartObjects(parent) {
  let obj = {};
  for (child of parent.value) {
    if (child.type == "obj") {
      obj[child.name] = {node: child.node, value: createSmartObjects(child)};
    } else {
      obj[child.name] = {value: child.value, node: child.node};
    }
  }
  let res = SmartVar.createObj(obj, obj.obj);
  return res;
}

let objs = document.getElementsByTagName("smartObj");
let smrtobjs = makeObjTree(objs);
for (smrtobj of smrtobjs) {
  SmartObjs[smrtobj.node.id] = { node: smrtobj.node, value: SmartVar.create(createSmartObjects(smrtobj))};
}