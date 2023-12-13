"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Feature: () => Feature,
  Serializer: () => Serializer,
  compileJSON: () => compileJSON,
  createPlugin: () => createPlugin,
  createReference: () => createReference,
  crossSerialize: () => crossSerialize,
  crossSerializeAsync: () => crossSerializeAsync,
  crossSerializeStream: () => crossSerializeStream,
  default: () => src_default,
  deserialize: () => deserialize,
  fromCrossJSON: () => fromCrossJSON,
  fromJSON: () => fromJSON,
  getCrossReferenceHeader: () => getCrossReferenceHeader,
  serialize: () => serialize,
  serializeAsync: () => serializeAsync,
  toCrossJSON: () => toCrossJSON,
  toCrossJSONAsync: () => toCrossJSONAsync,
  toCrossJSONStream: () => toCrossJSONStream,
  toJSON: () => toJSON,
  toJSONAsync: () => toJSONAsync
});
module.exports = __toCommonJS(src_exports);

// src/core/UnsupportedTypeError.ts
var { toString } = Object.prototype;
var UnsupportedTypeError = class extends Error {
  constructor(value) {
    super('Unsupported type "' + toString.call(value) + '"');
    this.value = value;
  }
};

// src/core/utils/assert.ts
function assert(cond, error) {
  if (!cond) {
    throw error;
  }
}

// src/core/constants.ts
var SYMBOL_STRING = {
  [0 /* AsyncIterator */]: "Symbol.asyncIterator",
  [1 /* HasInstance */]: "Symbol.hasInstance",
  [2 /* IsConcatSpreadable */]: "Symbol.isConcatSpreadable",
  [3 /* Iterator */]: "Symbol.iterator",
  [4 /* Match */]: "Symbol.match",
  [5 /* MatchAll */]: "Symbol.matchAll",
  [6 /* Replace */]: "Symbol.replace",
  [7 /* Search */]: "Symbol.search",
  [8 /* Species */]: "Symbol.species",
  [9 /* Split */]: "Symbol.split",
  [10 /* ToPrimitive */]: "Symbol.toPrimitive",
  [11 /* ToStringTag */]: "Symbol.toStringTag",
  [12 /* Unscopables */]: "Symbol.unscopables"
};
var INV_SYMBOL_REF = {
  [Symbol.asyncIterator]: 0 /* AsyncIterator */,
  [Symbol.hasInstance]: 1 /* HasInstance */,
  [Symbol.isConcatSpreadable]: 2 /* IsConcatSpreadable */,
  [Symbol.iterator]: 3 /* Iterator */,
  [Symbol.match]: 4 /* Match */,
  [Symbol.matchAll]: 5 /* MatchAll */,
  [Symbol.replace]: 6 /* Replace */,
  [Symbol.search]: 7 /* Search */,
  [Symbol.species]: 8 /* Species */,
  [Symbol.split]: 9 /* Split */,
  [Symbol.toPrimitive]: 10 /* ToPrimitive */,
  [Symbol.toStringTag]: 11 /* ToStringTag */,
  [Symbol.unscopables]: 12 /* Unscopables */
};
var SYMBOL_REF = {
  [0 /* AsyncIterator */]: Symbol.asyncIterator,
  [1 /* HasInstance */]: Symbol.hasInstance,
  [2 /* IsConcatSpreadable */]: Symbol.isConcatSpreadable,
  [3 /* Iterator */]: Symbol.iterator,
  [4 /* Match */]: Symbol.match,
  [5 /* MatchAll */]: Symbol.matchAll,
  [6 /* Replace */]: Symbol.replace,
  [7 /* Search */]: Symbol.search,
  [8 /* Species */]: Symbol.species,
  [9 /* Split */]: Symbol.split,
  [10 /* ToPrimitive */]: Symbol.toPrimitive,
  [11 /* ToStringTag */]: Symbol.toStringTag,
  [12 /* Unscopables */]: Symbol.unscopables
};
var CONSTANT_STRING = {
  [2 /* True */]: "!0",
  [3 /* False */]: "!1",
  [1 /* Undefined */]: "void 0",
  [0 /* Null */]: "null",
  [4 /* NegativeZero */]: "-0",
  [5 /* Infinity */]: "1/0",
  [6 /* NegativeInfinity */]: "-1/0",
  [7 /* NaN */]: "0/0"
};
var CONSTANT_VAL = {
  [2 /* True */]: true,
  [3 /* False */]: false,
  [1 /* Undefined */]: void 0,
  [0 /* Null */]: null,
  [4 /* NegativeZero */]: -0,
  [5 /* Infinity */]: Infinity,
  [6 /* NegativeInfinity */]: -Infinity,
  [7 /* NaN */]: NaN
};
var ERROR_CONSTRUCTOR_STRING = {
  [0 /* Error */]: "Error",
  [1 /* EvalError */]: "EvalError",
  [2 /* RangeError */]: "RangeError",
  [3 /* ReferenceError */]: "ReferenceError",
  [4 /* SyntaxError */]: "SyntaxError",
  [5 /* TypeError */]: "TypeError",
  [6 /* URIError */]: "URIError"
};
var ERROR_CONSTRUCTOR = {
  [0 /* Error */]: Error,
  [1 /* EvalError */]: EvalError,
  [2 /* RangeError */]: RangeError,
  [3 /* ReferenceError */]: ReferenceError,
  [4 /* SyntaxError */]: SyntaxError,
  [5 /* TypeError */]: TypeError,
  [6 /* URIError */]: URIError
};

// src/core/literals.ts
function createConstantNode(value) {
  return {
    t: 2 /* Constant */,
    i: void 0,
    s: value,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
var TRUE_NODE = createConstantNode(2 /* True */);
var FALSE_NODE = createConstantNode(3 /* False */);
var UNDEFINED_NODE = createConstantNode(1 /* Undefined */);
var NULL_NODE = createConstantNode(0 /* Null */);
var NEG_ZERO_NODE = createConstantNode(4 /* NegativeZero */);
var INFINITY_NODE = createConstantNode(5 /* Infinity */);
var NEG_INFINITY_NODE = createConstantNode(6 /* NegativeInfinity */);
var NAN_NODE = createConstantNode(7 /* NaN */);

// src/core/string.ts
function serializeChar(str) {
  switch (str) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return void 0;
  }
}
function serializeString(str) {
  let result = "";
  let lastPos = 0;
  let replacement;
  for (let i = 0, len = str.length; i < len; i++) {
    replacement = serializeChar(str[i]);
    if (replacement) {
      result += str.slice(lastPos, i) + replacement;
      lastPos = i + 1;
    }
  }
  if (lastPos === 0) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return result;
}
function deserializeString(str) {
  return str.replace(/\\"/g, '"').replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\b/g, "\b").replace(/\\t/g, "	").replace(/\\f/g, "\f").replace(/\\x3C/g, "<").replace(/\\u2028/g, "\u2028").replace(/\\u2029/g, "\u2029");
}

// src/core/keys.ts
var REFERENCES_KEY = "__SEROVAL_REFS__";
var GLOBAL_CONTEXT_REFERENCES = "$R";
var GLOBAL_CONTEXT_R = `self.${GLOBAL_CONTEXT_REFERENCES}`;
function getCrossReferenceHeader(id) {
  if (id == null) {
    return `${GLOBAL_CONTEXT_R}=${GLOBAL_CONTEXT_R}||[]`;
  }
  return `(${GLOBAL_CONTEXT_R}=${GLOBAL_CONTEXT_R}||{})["${serializeString(id)}"]=[]`;
}

// src/core/reference.ts
var REFERENCE = /* @__PURE__ */ new Map();
var INV_REFERENCE = /* @__PURE__ */ new Map();
function createReference(id, value) {
  REFERENCE.set(value, id);
  INV_REFERENCE.set(id, value);
  return value;
}
function hasReferenceID(value) {
  return REFERENCE.has(value);
}
function hasReference(id) {
  return INV_REFERENCE.has(id);
}
function getReferenceID(value) {
  assert(hasReferenceID(value), new Error("Missing reference id"));
  return REFERENCE.get(value);
}
function getReference(id) {
  assert(hasReference(id), new Error("Missing reference for id:" + id));
  return INV_REFERENCE.get(id);
}
if (typeof globalThis !== void 0) {
  Object.defineProperty(globalThis, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof window !== void 0) {
  Object.defineProperty(window, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof self !== void 0) {
  Object.defineProperty(self, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
} else if (typeof global !== void 0) {
  Object.defineProperty(global, REFERENCES_KEY, {
    value: INV_REFERENCE,
    configurable: true,
    writable: false,
    enumerable: false
  });
}

// src/core/compat.ts
var Feature = /* @__PURE__ */ ((Feature2) => {
  Feature2[Feature2["AggregateError"] = 1] = "AggregateError";
  Feature2[Feature2["ArrowFunction"] = 4] = "ArrowFunction";
  Feature2[Feature2["BigInt"] = 8] = "BigInt";
  Feature2[Feature2["ErrorPrototypeStack"] = 16] = "ErrorPrototypeStack";
  Feature2[Feature2["Map"] = 32] = "Map";
  Feature2[Feature2["ObjectAssign"] = 128] = "ObjectAssign";
  Feature2[Feature2["Promise"] = 256] = "Promise";
  Feature2[Feature2["Set"] = 512] = "Set";
  Feature2[Feature2["Symbol"] = 1024] = "Symbol";
  Feature2[Feature2["TypedArray"] = 2048] = "TypedArray";
  Feature2[Feature2["BigIntTypedArray"] = 4096] = "BigIntTypedArray";
  Feature2[Feature2["WebAPI"] = 8192] = "WebAPI";
  return Feature2;
})(Feature || {});
var ALL_ENABLED = 16383;
var BIGINT_FLAG = 4096 /* BigIntTypedArray */ | 8 /* BigInt */;

// src/core/utils/error.ts
function getErrorConstructor(error) {
  if (error instanceof EvalError) {
    return 1 /* EvalError */;
  }
  if (error instanceof RangeError) {
    return 2 /* RangeError */;
  }
  if (error instanceof ReferenceError) {
    return 3 /* ReferenceError */;
  }
  if (error instanceof SyntaxError) {
    return 4 /* SyntaxError */;
  }
  if (error instanceof TypeError) {
    return 5 /* TypeError */;
  }
  if (error instanceof URIError) {
    return 6 /* URIError */;
  }
  return 0 /* Error */;
}
function getErrorOptions(error, features) {
  let options;
  const constructor = ERROR_CONSTRUCTOR_STRING[getErrorConstructor(error)];
  if (error.name !== constructor) {
    options = { name: error.name };
  } else if (error.constructor.name !== constructor) {
    options = { name: error.constructor.name };
  }
  const names = Object.getOwnPropertyNames(error);
  for (let i = 0, len = names.length, name; i < len; i++) {
    name = names[i];
    if (name !== "name" && name !== "message") {
      if (name === "stack") {
        if (features & 16 /* ErrorPrototypeStack */) {
          options = options || {};
          options[name] = error[name];
        }
      } else {
        options = options || {};
        options[name] = error[name];
      }
    }
  }
  return options;
}

// src/core/utils/get-object-flag.ts
function getObjectFlag(obj) {
  if (Object.isFrozen(obj)) {
    return 3 /* Frozen */;
  }
  if (Object.isSealed(obj)) {
    return 2 /* Sealed */;
  }
  if (Object.isExtensible(obj)) {
    return 0 /* None */;
  }
  return 1 /* NonExtensible */;
}

// src/core/base-primitives.ts
function createNumberNode(value) {
  switch (value) {
    case Infinity:
      return INFINITY_NODE;
    case -Infinity:
      return NEG_INFINITY_NODE;
    default:
      if (value !== value) {
        return NAN_NODE;
      }
      if (Object.is(value, -0)) {
        return NEG_ZERO_NODE;
      }
      return {
        t: 0 /* Number */,
        i: void 0,
        s: value,
        l: void 0,
        c: void 0,
        m: void 0,
        p: void 0,
        e: void 0,
        a: void 0,
        f: void 0,
        b: void 0,
        o: void 0
      };
  }
}
function createStringNode(value) {
  return {
    t: 1 /* String */,
    i: void 0,
    s: serializeString(value),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createBigIntNode(current) {
  return {
    t: 3 /* BigInt */,
    i: void 0,
    s: "" + current,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createIndexedValueNode(id) {
  return {
    t: 4 /* IndexedValue */,
    i: id,
    s: void 0,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createDateNode(id, current) {
  return {
    t: 5 /* Date */,
    i: id,
    s: current.toISOString(),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    f: void 0,
    a: void 0,
    b: void 0,
    o: void 0
  };
}
function createRegExpNode(id, current) {
  return {
    t: 6 /* RegExp */,
    i: id,
    s: void 0,
    l: void 0,
    c: current.source,
    m: current.flags,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createArrayBufferNode(id, current) {
  const bytes = new Uint8Array(current);
  const len = bytes.length;
  const values = new Array(len);
  for (let i = 0; i < len; i++) {
    values[i] = bytes[i];
  }
  return {
    t: 21 /* ArrayBuffer */,
    i: id,
    s: values,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createWKSymbolNode(id, current) {
  assert(current in INV_SYMBOL_REF, new Error("Only well-known symbols are supported."));
  return {
    t: 17 /* WKSymbol */,
    i: id,
    s: INV_SYMBOL_REF[current],
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createReferenceNode(id, ref) {
  return {
    t: 20 /* Reference */,
    i: id,
    s: serializeString(getReferenceID(ref)),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createPluginNode(id, tag, value) {
  return {
    t: 40 /* Plugin */,
    i: id,
    s: value,
    l: void 0,
    c: serializeString(tag),
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createArrayNode(id, current, parsedItems) {
  return {
    t: 9 /* Array */,
    i: id,
    s: void 0,
    l: current.length,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: parsedItems,
    f: void 0,
    b: void 0,
    o: getObjectFlag(current)
  };
}
function createBoxedNode(id, boxed) {
  return {
    t: 27 /* Boxed */,
    i: id,
    s: void 0,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: boxed,
    b: void 0,
    o: void 0
  };
}
function createTypedArrayNode(id, current, buffer) {
  return {
    t: 15 /* TypedArray */,
    i: id,
    s: void 0,
    l: current.length,
    c: current.constructor.name,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: buffer,
    b: current.byteOffset,
    o: void 0
  };
}
function createBigIntTypedArrayNode(id, current, buffer) {
  return {
    t: 16 /* BigIntTypedArray */,
    i: id,
    s: void 0,
    l: current.length,
    c: current.constructor.name,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: buffer,
    b: current.byteOffset,
    o: void 0
  };
}
function createDataViewNode(id, current, buffer) {
  return {
    t: 22 /* DataView */,
    i: id,
    s: void 0,
    l: current.byteLength,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: buffer,
    b: current.byteOffset,
    o: void 0
  };
}
function createErrorNode(id, current, options) {
  return {
    t: 13 /* Error */,
    i: id,
    s: getErrorConstructor(current),
    l: void 0,
    c: void 0,
    m: serializeString(current.message),
    p: options,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createAggregateErrorNode(id, current, options) {
  return {
    t: 14 /* AggregateError */,
    i: id,
    s: getErrorConstructor(current),
    l: void 0,
    c: void 0,
    m: serializeString(current.message),
    p: options,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createSetNode(id, size, items) {
  return {
    t: 7 /* Set */,
    i: id,
    s: void 0,
    l: size,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: items,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createIteratorFactoryInstanceNode(factory, items) {
  return {
    t: 43 /* IteratorFactoryInstance */,
    i: void 0,
    s: void 0,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: [
      factory,
      items
    ],
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createAsyncIteratorFactoryInstanceNode(factory, items) {
  return {
    t: 45 /* AsyncIteratorFactoryInstance */,
    i: void 0,
    s: void 0,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: [
      factory,
      items
    ],
    f: void 0,
    b: void 0,
    o: void 0
  };
}

// src/core/utils/constructors.ts
function createRequestOptions(current, body) {
  return {
    body,
    cache: current.cache,
    credentials: current.credentials,
    headers: current.headers,
    integrity: current.integrity,
    keepalive: current.keepalive,
    method: current.method,
    mode: current.mode,
    redirect: current.redirect,
    referrer: current.referrer,
    referrerPolicy: current.referrerPolicy
  };
}
function createResponseOptions(current) {
  return {
    headers: current.headers,
    status: current.status,
    statusText: current.statusText
  };
}
function createEventOptions(current) {
  return {
    bubbles: current.bubbles,
    cancelable: current.cancelable,
    composed: current.composed
  };
}
function createCustomEventOptions(current) {
  return {
    detail: current.detail,
    bubbles: current.bubbles,
    cancelable: current.cancelable,
    composed: current.composed
  };
}

// src/core/utils/iterator-to-sequence.ts
function iteratorToSequence(source) {
  const values = [];
  let throwsAt = -1;
  let doneAt = -1;
  const iterator = source[Symbol.iterator]();
  while (true) {
    try {
      const value = iterator.next();
      values.push(value.value);
      if (value.done) {
        doneAt = values.length - 1;
        break;
      }
    } catch (error) {
      throwsAt = values.length;
      values.push(error);
    }
  }
  return {
    v: values,
    t: throwsAt,
    d: doneAt
  };
}
function sequenceToIterator(sequence) {
  return () => {
    let index = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (index > sequence.d) {
          return {
            done: true,
            value: void 0
          };
        }
        const currentIndex = index++;
        const currentItem = sequence.v[currentIndex];
        if (currentIndex === sequence.t) {
          throw currentItem;
        }
        return {
          done: currentIndex === sequence.d,
          value: currentItem
        };
      }
    };
  };
}
async function asyncIteratorToSequence(source) {
  const values = [];
  let throwsAt = -1;
  let doneAt = -1;
  const iterator = source[Symbol.asyncIterator]();
  while (true) {
    try {
      const value = await iterator.next();
      values.push(value.value);
      if (value.done) {
        doneAt = values.length - 1;
        break;
      }
    } catch (error) {
      throwsAt = values.length;
      values.push(error);
    }
  }
  return {
    v: values,
    t: throwsAt,
    d: doneAt
  };
}
function sequenceToAsyncIterator(sequence) {
  return () => {
    let index = 0;
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        if (index > sequence.d) {
          return {
            done: true,
            value: void 0
          };
        }
        const currentIndex = index++;
        const currentItem = sequence.v[currentIndex];
        if (currentIndex === sequence.t) {
          throw currentItem;
        }
        return Promise.resolve({
          done: currentIndex === sequence.d,
          value: currentItem
        });
      }
    };
  };
}
function asyncIteratorToReadableStream(source, parser) {
  return new ReadableStream({
    async start(controller) {
      const iterator = source[Symbol.asyncIterator]();
      while (parser.isAlive()) {
        try {
          const result = await iterator.next();
          controller.enqueue([result.done ? 2 : 0, result.value]);
          if (result.done) {
            controller.close();
            return;
          }
        } catch (error) {
          controller.enqueue([1, error]);
        }
      }
      controller.close();
    }
  });
}
function readableStreamToAsyncIterator(source) {
  let current = source;
  return () => {
    const [left, right] = current.tee();
    const clone = left;
    current = right;
    const reader = clone.getReader();
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next() {
        const result = await reader.read();
        if (result.done) {
          return {
            done: true,
            value: void 0
          };
        }
        const [status, value] = result.value;
        if (status === 1) {
          throw value;
        }
        return {
          done: status === 2,
          value
        };
      }
    };
  };
}
async function readableStreamToSequence(stream) {
  const values = [];
  let throwsAt = -1;
  let doneAt = -1;
  const iterator = stream.getReader();
  while (true) {
    try {
      const value = await iterator.read();
      values.push(value.value);
      if (value.done) {
        doneAt = values.length - 1;
        break;
      }
    } catch (error) {
      throwsAt = values.length;
      doneAt = throwsAt;
      values.push(error);
      break;
    }
  }
  return {
    v: values,
    t: throwsAt,
    d: doneAt
  };
}
function sequenceToReadableStream(sequence) {
  return new ReadableStream({
    start(controller) {
      for (let i = 0; i < sequence.d; i++) {
        controller.enqueue(sequence.v[i]);
      }
      if (sequence.t === -1) {
        controller.close();
      } else {
        controller.error(sequence.v[sequence.t]);
      }
    }
  });
}

// src/core/special-reference.ts
var UNIVERSAL_SENTINEL = {};
var ITERATOR = {};
var ASYNC_ITERATOR = {};
var SPECIAL_REFS = {
  [0 /* MapSentinel */]: {},
  [1 /* ReadableStream */]: {},
  [2 /* PromiseConstructor */]: {},
  [3 /* PromiseResolve */]: {},
  [4 /* PromiseReject */]: {},
  [5 /* ReadableStreamConstructor */]: {},
  [6 /* ReadableStreamEnqueue */]: {},
  [7 /* ReadableStreamError */]: {},
  [8 /* ReadableStreamClose */]: {}
};

// src/core/context/parser.ts
var BaseParserContext = class {
  constructor(options) {
    this.marked = /* @__PURE__ */ new Set();
    this.plugins = options.plugins;
    this.features = ALL_ENABLED ^ (options.disabledFeatures || 0);
    this.refs = options.refs || /* @__PURE__ */ new Map();
  }
  markRef(id) {
    this.marked.add(id);
  }
  isMarked(id) {
    return this.marked.has(id);
  }
  getReference(current) {
    const registeredID = this.refs.get(current);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const id = this.refs.size;
    this.refs.set(current, id);
    if (hasReferenceID(current)) {
      return createReferenceNode(id, current);
    }
    return id;
  }
  getStrictReference(current) {
    const registeredID = this.refs.get(current);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const id = this.refs.size;
    this.refs.set(current, id);
    return createReferenceNode(id, current);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  parseFunction(current) {
    assert(hasReferenceID(current), new Error("Cannot serialize function without reference ID."));
    return this.getStrictReference(current);
  }
  parseWKSymbol(current) {
    assert(this.features & 1024 /* Symbol */, new UnsupportedTypeError(current));
    const registeredID = this.refs.get(current);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const isValid = current in INV_SYMBOL_REF;
    assert(current in INV_SYMBOL_REF || hasReferenceID(current), new Error("Cannot serialize symbol without reference ID."));
    const id = this.refs.size;
    this.refs.set(current, id);
    if (isValid) {
      return createWKSymbolNode(id, current);
    }
    return createReferenceNode(id, current);
  }
  parseSpecialReference(ref) {
    const specialRef = SPECIAL_REFS[ref];
    const registeredID = this.refs.get(specialRef);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const id = this.refs.size;
    this.refs.set(specialRef, id);
    return {
      t: 41 /* SpecialReference */,
      i: id,
      s: ref,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: void 0,
      b: void 0,
      o: void 0
    };
  }
  parseIteratorFactory() {
    const registeredID = this.refs.get(ITERATOR);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const id = this.refs.size;
    this.refs.set(ITERATOR, id);
    return {
      t: 42 /* IteratorFactory */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: this.parseWKSymbol(Symbol.iterator),
      b: void 0,
      o: void 0
    };
  }
  parseAsyncIteratorFactory(streaming) {
    const registeredID = this.refs.get(ASYNC_ITERATOR);
    if (registeredID != null) {
      this.markRef(registeredID);
      return createIndexedValueNode(registeredID);
    }
    const id = this.refs.size;
    this.refs.set(ASYNC_ITERATOR, id);
    return {
      t: 44 /* AsyncIteratorFactory */,
      i: id,
      s: streaming,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: this.parseWKSymbol(Symbol.asyncIterator),
      b: void 0,
      o: void 0
    };
  }
  createObjectNode(id, current, empty, record) {
    return {
      t: empty ? 11 /* NullConstructor */ : 10 /* Object */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: record,
      e: void 0,
      a: void 0,
      f: void 0,
      b: void 0,
      o: getObjectFlag(current)
    };
  }
  createMapNode(id, k, v, s) {
    return {
      t: 8 /* Map */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: { k, v, s },
      a: void 0,
      f: this.parseSpecialReference(0 /* MapSentinel */),
      b: void 0,
      o: void 0
    };
  }
};

// src/core/utils/promise-to-result.ts
async function promiseToResult(current) {
  try {
    return [1, await current];
  } catch (e) {
    return [0, e];
  }
}

// src/core/web-api.ts
function createURLNode(id, current) {
  return {
    t: 18 /* URL */,
    i: id,
    s: serializeString(current.href),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    f: void 0,
    a: void 0,
    b: void 0,
    o: void 0
  };
}
function createURLSearchParamsNode(id, current) {
  return {
    t: 19 /* URLSearchParams */,
    i: id,
    s: serializeString(current.toString()),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    f: void 0,
    a: void 0,
    b: void 0,
    o: void 0
  };
}
function createDOMExceptionNode(id, current) {
  return {
    t: 39 /* DOMException */,
    i: id,
    s: serializeString(current.message),
    l: void 0,
    c: serializeString(current.name),
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: void 0,
    b: void 0,
    o: void 0
  };
}
function createEventNode(id, type, options) {
  return {
    t: 37 /* Event */,
    i: id,
    s: serializeString(type),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: options,
    b: void 0,
    o: void 0
  };
}
function createCustomEventNode(id, type, options) {
  return {
    t: 38 /* CustomEvent */,
    i: id,
    s: serializeString(type),
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: void 0,
    f: options,
    b: void 0,
    o: void 0
  };
}
function createReadableStreamNode(id, factory, items) {
  return {
    t: 46 /* ReadableStream */,
    i: id,
    s: void 0,
    l: void 0,
    c: void 0,
    m: void 0,
    p: void 0,
    e: void 0,
    a: [
      factory,
      items
    ],
    f: void 0,
    b: void 0,
    o: void 0
  };
}

// src/core/context/parser/async.ts
var BaseAsyncParserContext = class extends BaseParserContext {
  async parseItems(current) {
    const nodes = [];
    for (let i = 0, len = current.length; i < len; i++) {
      if (i in current) {
        nodes[i] = await this.parse(current[i]);
      }
    }
    return nodes;
  }
  async parseArray(id, current) {
    return createArrayNode(
      id,
      current,
      await this.parseItems(current)
    );
  }
  async parseProperties(properties) {
    const entries = Object.entries(properties);
    const keyNodes = [];
    const valueNodes = [];
    for (let i = 0, len = entries.length; i < len; i++) {
      keyNodes.push(serializeString(entries[i][0]));
      valueNodes.push(await this.parse(entries[i][1]));
    }
    if (this.features & 1024 /* Symbol */) {
      let symbol = Symbol.iterator;
      if (symbol in properties) {
        keyNodes.push(
          this.parseWKSymbol(symbol)
        );
        valueNodes.push(
          createIteratorFactoryInstanceNode(
            this.parseIteratorFactory(),
            await this.parse(
              iteratorToSequence(properties)
            )
          )
        );
      }
      symbol = Symbol.asyncIterator;
      if (symbol in properties) {
        keyNodes.push(
          this.parseWKSymbol(symbol)
        );
        valueNodes.push(
          createAsyncIteratorFactoryInstanceNode(
            this.parseAsyncIteratorFactory(0),
            await this.parse(
              await asyncIteratorToSequence(properties)
            )
          )
        );
      }
      symbol = Symbol.toStringTag;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(createStringNode(properties[symbol]));
      }
      symbol = Symbol.isConcatSpreadable;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(properties[symbol] ? TRUE_NODE : FALSE_NODE);
      }
    }
    return {
      k: keyNodes,
      v: valueNodes,
      s: keyNodes.length
    };
  }
  async parsePlainObject(id, current, empty) {
    return this.createObjectNode(
      id,
      current,
      empty,
      await this.parseProperties(current)
    );
  }
  async parseBoxed(id, current) {
    return createBoxedNode(id, await this.parse(current.valueOf()));
  }
  async parseTypedArray(id, current) {
    return createTypedArrayNode(id, current, await this.parse(current.buffer));
  }
  async parseBigIntTypedArray(id, current) {
    return createBigIntTypedArrayNode(id, current, await this.parse(current.buffer));
  }
  async parseDataView(id, current) {
    return createDataViewNode(id, current, await this.parse(current.buffer));
  }
  async parseError(id, current) {
    const options = getErrorOptions(current, this.features);
    return createErrorNode(
      id,
      current,
      options ? await this.parseProperties(options) : void 0
    );
  }
  async parseAggregateError(id, current) {
    const options = getErrorOptions(current, this.features);
    return createAggregateErrorNode(
      id,
      current,
      options ? await this.parseProperties(options) : void 0
    );
  }
  async parseMap(id, current) {
    const keyNodes = [];
    const valueNodes = [];
    for (const [key, value] of current.entries()) {
      keyNodes.push(await this.parse(key));
      valueNodes.push(await this.parse(value));
    }
    return this.createMapNode(
      id,
      keyNodes,
      valueNodes,
      current.size
    );
  }
  async parseSet(id, current) {
    const items = [];
    for (const item of current.keys()) {
      items.push(await this.parse(item));
    }
    return createSetNode(id, current.size, items);
  }
  async parseBlob(id, current) {
    return {
      t: 23 /* Blob */,
      i: id,
      s: void 0,
      l: void 0,
      c: serializeString(current.type),
      m: void 0,
      p: void 0,
      e: void 0,
      f: await this.parse(await current.arrayBuffer()),
      a: void 0,
      b: void 0,
      o: void 0
    };
  }
  async parseFile(id, current) {
    return {
      t: 24 /* File */,
      i: id,
      s: void 0,
      l: void 0,
      c: serializeString(current.type),
      m: serializeString(current.name),
      p: void 0,
      e: void 0,
      f: await this.parse(await current.arrayBuffer()),
      a: void 0,
      b: current.lastModified,
      o: void 0
    };
  }
  async parsePlainProperties(entries) {
    const size = entries.length;
    const keyNodes = [];
    const valueNodes = [];
    for (let i = 0; i < size; i++) {
      keyNodes.push(serializeString(entries[i][0]));
      valueNodes.push(await this.parse(entries[i][1]));
    }
    return {
      k: keyNodes,
      v: valueNodes,
      s: size
    };
  }
  async parseHeaders(id, current) {
    const items = [];
    current.forEach((value, key) => {
      items.push([key, value]);
    });
    return {
      t: 25 /* Headers */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: await this.parsePlainProperties(items),
      a: void 0,
      f: void 0,
      b: void 0,
      o: void 0
    };
  }
  async parseFormData(id, current) {
    const items = [];
    current.forEach((value, key) => {
      items.push([key, value]);
    });
    return {
      t: 26 /* FormData */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: await this.parsePlainProperties(items),
      a: void 0,
      f: void 0,
      b: void 0,
      o: void 0
    };
  }
  async parseRequest(id, current) {
    return {
      t: 35 /* Request */,
      i: id,
      s: serializeString(current.url),
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      f: await this.parse(
        createRequestOptions(current, current.body ? await current.clone().arrayBuffer() : null)
      ),
      a: void 0,
      b: void 0,
      o: void 0
    };
  }
  async parseResponse(id, current) {
    return {
      t: 36 /* Response */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      f: void 0,
      a: [
        current.body ? await this.parse(await current.clone().arrayBuffer()) : NULL_NODE,
        await this.parse(createResponseOptions(current))
      ],
      b: void 0,
      o: void 0
    };
  }
  async parseEvent(id, current) {
    return createEventNode(id, current.type, await this.parse(createEventOptions(current)));
  }
  async parseCustomEvent(id, current) {
    return createCustomEventNode(
      id,
      current.type,
      await this.parse(createCustomEventOptions(current))
    );
  }
  async parsePromise(id, current) {
    const [status, result] = await promiseToResult(current);
    return {
      t: 12 /* Promise */,
      i: id,
      s: status,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: await this.parse(result),
      b: void 0,
      o: void 0
    };
  }
  async parsePlugin(id, current) {
    const currentPlugins = this.plugins;
    if (currentPlugins) {
      for (let i = 0, len = currentPlugins.length; i < len; i++) {
        const plugin = currentPlugins[i];
        if (plugin.parse.async && plugin.test(current)) {
          return createPluginNode(
            id,
            plugin.tag,
            await plugin.parse.async(current, this, {
              id
            })
          );
        }
      }
    }
    return void 0;
  }
  async parseReadableStream(id, current) {
    return createReadableStreamNode(
      id,
      this.parseSpecialReference(1 /* ReadableStream */),
      await this.parse(
        await readableStreamToSequence(current)
      )
    );
  }
  async parseObject(id, current) {
    if (Array.isArray(current)) {
      return this.parseArray(id, current);
    }
    const currentClass = current.constructor;
    switch (currentClass) {
      case Object:
        return this.parsePlainObject(
          id,
          current,
          false
        );
      case void 0:
        return this.parsePlainObject(
          id,
          current,
          true
        );
      case Date:
        return createDateNode(id, current);
      case RegExp:
        return createRegExpNode(id, current);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(id, current);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(id, current);
      default:
        break;
    }
    const currentFeatures = this.features;
    if (currentFeatures & 256 /* Promise */ && (currentClass === Promise || current instanceof Promise)) {
      return this.parsePromise(id, current);
    }
    if (currentFeatures & 2048 /* TypedArray */) {
      switch (currentClass) {
        case ArrayBuffer:
          return createArrayBufferNode(id, current);
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
        case Uint8ClampedArray:
        case Float32Array:
        case Float64Array:
          return this.parseTypedArray(id, current);
        case DataView:
          return this.parseDataView(id, current);
        default:
          break;
      }
    }
    if ((currentFeatures & BIGINT_FLAG) === BIGINT_FLAG) {
      switch (currentClass) {
        case BigInt64Array:
        case BigUint64Array:
          return this.parseBigIntTypedArray(id, current);
        default:
          break;
      }
    }
    if (currentFeatures & 32 /* Map */ && currentClass === Map) {
      return this.parseMap(
        id,
        current
      );
    }
    if (currentFeatures & 512 /* Set */ && currentClass === Set) {
      return this.parseSet(
        id,
        current
      );
    }
    if (currentFeatures & 8192 /* WebAPI */) {
      switch (currentClass) {
        case (typeof URL !== "undefined" ? URL : UNIVERSAL_SENTINEL):
          return createURLNode(id, current);
        case (typeof URLSearchParams !== "undefined" ? URLSearchParams : UNIVERSAL_SENTINEL):
          return createURLSearchParamsNode(id, current);
        case (typeof Blob !== "undefined" ? Blob : UNIVERSAL_SENTINEL):
          return this.parseBlob(id, current);
        case (typeof File !== "undefined" ? File : UNIVERSAL_SENTINEL):
          return this.parseFile(id, current);
        case (typeof Headers !== "undefined" ? Headers : UNIVERSAL_SENTINEL):
          return this.parseHeaders(id, current);
        case (typeof FormData !== "undefined" ? FormData : UNIVERSAL_SENTINEL):
          return this.parseFormData(id, current);
        case (typeof Request !== "undefined" ? Request : UNIVERSAL_SENTINEL):
          return this.parseRequest(id, current);
        case (typeof Response !== "undefined" ? Response : UNIVERSAL_SENTINEL):
          return this.parseResponse(id, current);
        case (typeof Event !== "undefined" ? Event : UNIVERSAL_SENTINEL):
          return this.parseEvent(id, current);
        case (typeof CustomEvent !== "undefined" ? CustomEvent : UNIVERSAL_SENTINEL):
          return this.parseCustomEvent(id, current);
        case (typeof DOMException !== "undefined" ? DOMException : UNIVERSAL_SENTINEL):
          return createDOMExceptionNode(id, current);
        case (typeof ReadableStream !== "undefined" ? ReadableStream : UNIVERSAL_SENTINEL):
          return this.parseReadableStream(id, current);
        default:
          break;
      }
    }
    const parsed = await this.parsePlugin(id, current);
    if (parsed) {
      return parsed;
    }
    if (currentFeatures & 1 /* AggregateError */ && typeof AggregateError !== "undefined" && (currentClass === AggregateError || current instanceof AggregateError)) {
      return this.parseAggregateError(id, current);
    }
    if (current instanceof Error) {
      return this.parseError(id, current);
    }
    if (currentFeatures & 1024 /* Symbol */ && (Symbol.iterator in current || Symbol.asyncIterator in current)) {
      return this.parsePlainObject(id, current, !!currentClass);
    }
    throw new UnsupportedTypeError(current);
  }
  async parse(current) {
    switch (current) {
      case true:
        return TRUE_NODE;
      case false:
        return FALSE_NODE;
      case void 0:
        return UNDEFINED_NODE;
      case null:
        return NULL_NODE;
      default:
        break;
    }
    switch (typeof current) {
      case "string":
        return createStringNode(current);
      case "number":
        return createNumberNode(current);
      case "bigint":
        assert(this.features & 8 /* BigInt */, new UnsupportedTypeError(current));
        return createBigIntNode(current);
      case "object": {
        const id = this.getReference(current);
        return typeof id === "number" ? this.parseObject(id, current) : id;
      }
      case "symbol":
        return this.parseWKSymbol(current);
      case "function":
        return this.parseFunction(current);
      default:
        throw new UnsupportedTypeError(current);
    }
  }
};

// src/core/tree/async.ts
var AsyncParserContext = class extends BaseAsyncParserContext {
  constructor() {
    super(...arguments);
    this.mode = "vanilla";
  }
};

// src/core/utils/typed-array.ts
function getTypedArrayConstructor(name) {
  switch (name) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new Error(`Unknown TypedArray "${name}"`);
  }
}

// src/core/utils/deferred.ts
function createDeferred() {
  let resolve;
  let reject;
  return {
    promise: new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    }),
    resolve(value) {
      resolve(value);
    },
    reject(value) {
      reject(value);
    }
  };
}
function createDeferredStream() {
  let controller;
  return {
    stream: new ReadableStream({
      start(current) {
        controller = current;
      }
    }),
    close() {
      controller.close();
    },
    enqueue(data) {
      controller.enqueue(data);
    },
    error(e) {
      controller.error(e);
    }
  };
}

// src/core/context/deserializer.ts
function applyObjectFlag(obj, flag) {
  switch (flag) {
    case 3 /* Frozen */:
      return Object.freeze(obj);
    case 1 /* NonExtensible */:
      return Object.preventExtensions(obj);
    case 2 /* Sealed */:
      return Object.seal(obj);
    default:
      return obj;
  }
}
var BaseDeserializerContext = class {
  constructor(options) {
    this.plugins = options.plugins;
    this.refs = options.refs || /* @__PURE__ */ new Map();
  }
  deserializeReference(node) {
    return this.assignIndexedValue(node.i, getReference(deserializeString(node.s)));
  }
  deserializeArray(node) {
    const len = node.l;
    const result = this.assignIndexedValue(
      node.i,
      new Array(len)
    );
    let item;
    for (let i = 0; i < len; i++) {
      item = node.a[i];
      if (item) {
        result[i] = this.deserialize(item);
      }
    }
    applyObjectFlag(result, node.o);
    return result;
  }
  deserializeProperties(node, result) {
    const len = node.s;
    if (len) {
      const keys = node.k;
      const vals = node.v;
      for (let i = 0, key; i < len; i++) {
        key = keys[i];
        if (typeof key === "string") {
          result[deserializeString(key)] = this.deserialize(vals[i]);
        } else {
          result[this.deserialize(key)] = this.deserialize(vals[i]);
        }
      }
    }
    return result;
  }
  deserializeObject(node) {
    const result = this.assignIndexedValue(
      node.i,
      node.t === 10 /* Object */ ? {} : /* @__PURE__ */ Object.create(null)
    );
    this.deserializeProperties(node.p, result);
    applyObjectFlag(result, node.o);
    return result;
  }
  deserializeDate(node) {
    return this.assignIndexedValue(node.i, new Date(node.s));
  }
  deserializeRegExp(node) {
    return this.assignIndexedValue(node.i, new RegExp(node.c, node.m));
  }
  deserializeSet(node) {
    const result = this.assignIndexedValue(node.i, /* @__PURE__ */ new Set());
    const items = node.a;
    for (let i = 0, len = node.l; i < len; i++) {
      result.add(this.deserialize(items[i]));
    }
    return result;
  }
  deserializeMap(node) {
    const result = this.assignIndexedValue(
      node.i,
      /* @__PURE__ */ new Map()
    );
    const keys = node.e.k;
    const vals = node.e.v;
    for (let i = 0, len = node.e.s; i < len; i++) {
      result.set(
        this.deserialize(keys[i]),
        this.deserialize(vals[i])
      );
    }
    return result;
  }
  deserializeArrayBuffer(node) {
    const bytes = new Uint8Array(node.s);
    const result = this.assignIndexedValue(node.i, bytes.buffer);
    return result;
  }
  deserializeTypedArray(node) {
    const TypedArray = getTypedArrayConstructor(node.c);
    const source = this.deserialize(node.f);
    const result = this.assignIndexedValue(node.i, new TypedArray(
      source,
      node.b,
      node.l
    ));
    return result;
  }
  deserializeDataView(node) {
    const source = this.deserialize(node.f);
    const result = this.assignIndexedValue(node.i, new DataView(
      source,
      node.b,
      node.l
    ));
    return result;
  }
  deserializeDictionary(node, result) {
    if (node.p) {
      const fields = this.deserializeProperties(node.p, {});
      Object.assign(result, fields);
    }
    return result;
  }
  deserializeAggregateError(node) {
    const result = this.assignIndexedValue(
      node.i,
      new AggregateError([], deserializeString(node.m))
    );
    return this.deserializeDictionary(node, result);
  }
  deserializeError(node) {
    const ErrorConstructor = ERROR_CONSTRUCTOR[node.s];
    const result = this.assignIndexedValue(
      node.i,
      new ErrorConstructor(deserializeString(node.m))
    );
    return this.deserializeDictionary(node, result);
  }
  async deserializePromise(node) {
    const deferred = createDeferred();
    const result = this.assignIndexedValue(node.i, deferred);
    const deserialized = this.deserialize(node.f);
    if (node.s) {
      deferred.resolve(deserialized);
    } else {
      deferred.reject(deserialized);
    }
    return result.promise;
  }
  deserializeURL(node) {
    return this.assignIndexedValue(node.i, new URL(deserializeString(node.s)));
  }
  deserializeURLSearchParams(node) {
    return this.assignIndexedValue(node.i, new URLSearchParams(deserializeString(node.s)));
  }
  deserializeBlob(node) {
    const source = this.deserialize(node.f);
    const result = this.assignIndexedValue(node.i, new Blob(
      [source],
      { type: deserializeString(node.c) }
    ));
    return result;
  }
  deserializeFile(node) {
    const source = this.deserialize(node.f);
    const result = this.assignIndexedValue(node.i, new File(
      [source],
      deserializeString(node.m),
      { type: deserializeString(node.c), lastModified: node.b }
    ));
    return result;
  }
  deserializeHeaders(node) {
    const result = this.assignIndexedValue(node.i, new Headers());
    const keys = node.e.k;
    const vals = node.e.v;
    for (let i = 0, len = node.e.s; i < len; i++) {
      result.set(
        deserializeString(keys[i]),
        this.deserialize(vals[i])
      );
    }
    return result;
  }
  deserializeFormData(node) {
    const result = this.assignIndexedValue(node.i, new FormData());
    const keys = node.e.k;
    const vals = node.e.v;
    for (let i = 0, len = node.e.s; i < len; i++) {
      result.set(
        deserializeString(keys[i]),
        this.deserialize(vals[i])
      );
    }
    return result;
  }
  deserializeBoxed(node) {
    return this.assignIndexedValue(
      node.i,
      Object(this.deserialize(node.f))
    );
  }
  deserializeRequest(node) {
    return this.assignIndexedValue(
      node.i,
      new Request(deserializeString(node.s), this.deserialize(node.f))
    );
  }
  deserializeResponse(node) {
    return this.assignIndexedValue(
      node.i,
      new Response(
        this.deserialize(node.a[0]),
        this.deserialize(node.a[1])
      )
    );
  }
  deserializeEvent(node) {
    return this.assignIndexedValue(
      node.i,
      new Event(
        deserializeString(node.s),
        this.deserialize(node.f)
      )
    );
  }
  deserializeCustomEvent(node) {
    return this.assignIndexedValue(
      node.i,
      new CustomEvent(
        deserializeString(node.s),
        this.deserialize(node.f)
      )
    );
  }
  deserializeDOMException(node) {
    return this.assignIndexedValue(
      node.i,
      new DOMException(
        deserializeString(node.s),
        deserializeString(node.c)
      )
    );
  }
  deserializePlugin(node) {
    const currentPlugins = this.plugins;
    if (currentPlugins) {
      for (let i = 0, len = currentPlugins.length; i < len; i++) {
        const plugin = currentPlugins[i];
        if (plugin.tag === node.c) {
          return this.assignIndexedValue(
            node.i,
            plugin.deserialize(node.s, this, {
              id: node.i
            })
          );
        }
      }
    }
    throw new Error('Missing plugin for tag "' + node.c + '".');
  }
  deserializePromiseConstructor(node) {
    return this.assignIndexedValue(
      node.i,
      createDeferred()
    ).promise;
  }
  deserializePromiseResolve(node) {
    const deferred = this.refs.get(node.i);
    assert(deferred, new Error("Missing Promise instance."));
    deferred.resolve(
      this.deserialize(node.a[1])
    );
    return void 0;
  }
  deserializePromiseReject(node) {
    const deferred = this.refs.get(node.i);
    assert(deferred, new Error("Missing Promise instance."));
    deferred.reject(
      this.deserialize(node.a[1])
    );
    return void 0;
  }
  deserializeReadableStreamConstructor(node) {
    return this.assignIndexedValue(
      node.i,
      createDeferredStream()
    ).stream;
  }
  deserializeReadableStreamEnqueue(node) {
    const deferred = this.refs.get(node.i);
    assert(deferred, new Error("Missing ReadableStream instance."));
    deferred.enqueue(
      this.deserialize(node.a[1])
    );
    return void 0;
  }
  deserializeReadableStreamError(node) {
    const deferred = this.refs.get(node.i);
    assert(deferred, new Error("Missing Promise instance."));
    deferred.error(
      this.deserialize(node.a[1])
    );
    return void 0;
  }
  deserializeReadableStreamClose(node) {
    const deferred = this.refs.get(node.i);
    assert(deferred, new Error("Missing Promise instance."));
    deferred.close();
    return void 0;
  }
  deserializeIteratorFactoryInstance(node) {
    const source = this.deserialize(node.a[1]);
    return sequenceToIterator(source);
  }
  deserializeAsyncIteratorFactoryInstance(node) {
    const source = this.deserialize(node.a[1]);
    if (node.s) {
      return readableStreamToAsyncIterator(
        source
      );
    }
    return sequenceToAsyncIterator(source);
  }
  deserializeReadableStream(node) {
    return this.assignIndexedValue(
      node.i,
      sequenceToReadableStream(
        this.deserialize(node.a[1])
      )
    );
  }
  deserialize(node) {
    switch (node.t) {
      case 2 /* Constant */:
        return CONSTANT_VAL[node.s];
      case 0 /* Number */:
        return node.s;
      case 1 /* String */:
        return deserializeString(node.s);
      case 3 /* BigInt */:
        return BigInt(node.s);
      case 4 /* IndexedValue */:
        return this.refs.get(node.i);
      case 20 /* Reference */:
        return this.deserializeReference(node);
      case 9 /* Array */:
        return this.deserializeArray(node);
      case 10 /* Object */:
      case 11 /* NullConstructor */:
        return this.deserializeObject(node);
      case 5 /* Date */:
        return this.deserializeDate(node);
      case 6 /* RegExp */:
        return this.deserializeRegExp(node);
      case 7 /* Set */:
        return this.deserializeSet(node);
      case 8 /* Map */:
        return this.deserializeMap(node);
      case 21 /* ArrayBuffer */:
        return this.deserializeArrayBuffer(node);
      case 16 /* BigIntTypedArray */:
      case 15 /* TypedArray */:
        return this.deserializeTypedArray(node);
      case 22 /* DataView */:
        return this.deserializeDataView(node);
      case 14 /* AggregateError */:
        return this.deserializeAggregateError(node);
      case 13 /* Error */:
        return this.deserializeError(node);
      case 12 /* Promise */:
        return this.deserializePromise(node);
      case 17 /* WKSymbol */:
        return SYMBOL_REF[node.s];
      case 18 /* URL */:
        return this.deserializeURL(node);
      case 19 /* URLSearchParams */:
        return this.deserializeURLSearchParams(node);
      case 23 /* Blob */:
        return this.deserializeBlob(node);
      case 24 /* File */:
        return this.deserializeFile(node);
      case 25 /* Headers */:
        return this.deserializeHeaders(node);
      case 26 /* FormData */:
        return this.deserializeFormData(node);
      case 27 /* Boxed */:
        return this.deserializeBoxed(node);
      case 35 /* Request */:
        return this.deserializeRequest(node);
      case 36 /* Response */:
        return this.deserializeResponse(node);
      case 37 /* Event */:
        return this.deserializeEvent(node);
      case 38 /* CustomEvent */:
        return this.deserializeCustomEvent(node);
      case 39 /* DOMException */:
        return this.deserializeDOMException(node);
      case 40 /* Plugin */:
        return this.deserializePlugin(node);
      case 28 /* PromiseConstructor */:
        return this.deserializePromiseConstructor(node);
      case 29 /* PromiseResolve */:
        return this.deserializePromiseResolve(node);
      case 30 /* PromiseReject */:
        return this.deserializePromiseReject(node);
      case 31 /* ReadableStreamConstructor */:
        return this.deserializeReadableStreamConstructor(node);
      case 32 /* ReadableStreamEnqueue */:
        return this.deserializeReadableStreamEnqueue(node);
      case 34 /* ReadableStreamError */:
        return this.deserializeReadableStreamError(node);
      case 33 /* ReadableStreamClose */:
        return this.deserializeReadableStreamClose(node);
      case 43 /* IteratorFactoryInstance */:
        return this.deserializeIteratorFactoryInstance(node);
      case 45 /* AsyncIteratorFactoryInstance */:
        return this.deserializeAsyncIteratorFactoryInstance(node);
      case 46 /* ReadableStream */:
        return this.deserializeReadableStream(node);
      case 41 /* SpecialReference */:
      case 42 /* IteratorFactory */:
      case 44 /* AsyncIteratorFactory */:
      default:
        throw new Error("invariant");
    }
  }
};

// src/core/tree/deserializer.ts
var VanillaDeserializerContext = class extends BaseDeserializerContext {
  constructor(options) {
    super({
      plugins: options.plugins,
      refs: void 0
    });
    this.mode = "vanilla";
    this.marked = new Set(options.markedRefs);
  }
  assignIndexedValue(index, value) {
    if (this.marked.has(index)) {
      this.refs.set(index, value);
    }
    return value;
  }
};

// src/core/utils/is-valid-identifier.ts
var IDENTIFIER_CHECK = /^[$A-Z_][0-9A-Z_$]*$/i;
function isValidIdentifier(name) {
  const char = name[0];
  return (char === "$" || char === "_" || char >= "A" && char <= "Z" || char >= "a" && char <= "z") && IDENTIFIER_CHECK.test(name);
}

// src/core/context/serializer.ts
function getAssignmentExpression(assignment) {
  switch (assignment.t) {
    case "index":
      return assignment.s + "=" + assignment.v;
    case "set":
      return assignment.s + ".set(" + assignment.k + "," + assignment.v + ")";
    case "add":
      return assignment.s + ".add(" + assignment.v + ")";
    case "delete":
      return assignment.s + ".delete(" + assignment.k + ")";
    default:
      return "";
  }
}
function mergeAssignments(assignments) {
  const newAssignments = [];
  let current = assignments[0];
  for (let i = 1, len = assignments.length, item, prev = current; i < len; i++) {
    item = assignments[i];
    if (item.t === "index" && item.v === prev.v) {
      current = {
        t: "index",
        s: item.s,
        k: void 0,
        v: getAssignmentExpression(current)
      };
    } else if (item.t === "set" && item.s === prev.s) {
      current = {
        t: "set",
        s: getAssignmentExpression(current),
        k: item.k,
        v: item.v
      };
    } else if (item.t === "add" && item.s === prev.s) {
      current = {
        t: "add",
        s: getAssignmentExpression(current),
        k: void 0,
        v: item.v
      };
    } else if (item.t === "delete" && item.s === prev.s) {
      current = {
        t: "delete",
        s: getAssignmentExpression(current),
        k: item.k,
        v: void 0
      };
    } else {
      newAssignments.push(current);
      current = item;
    }
    prev = item;
  }
  newAssignments.push(current);
  return newAssignments;
}
function resolveAssignments(assignments) {
  if (assignments.length) {
    let result = "";
    const merged = mergeAssignments(assignments);
    for (let i = 0, len = merged.length; i < len; i++) {
      result += getAssignmentExpression(merged[i]) + ",";
    }
    return result;
  }
  return void 0;
}
var NULL_CONSTRUCTOR = "Object.create(null)";
var SET_CONSTRUCTOR = "new Set";
var MAP_CONSTRUCTOR = "new Map";
var PROMISE_RESOLVE = "Promise.resolve";
var PROMISE_REJECT = "Promise.reject";
var OBJECT_FLAG_CONSTRUCTOR = {
  [3 /* Frozen */]: "Object.freeze",
  [2 /* Sealed */]: "Object.seal",
  [1 /* NonExtensible */]: "Object.preventExtensions",
  [0 /* None */]: void 0
};
var BaseSerializerContext = class {
  constructor(options) {
    /**
     * To check if an object is synchronously referencing itself
     * @private
     */
    this.stack = [];
    /**
     * Array of object mutations
     * @private
     */
    this.flags = [];
    /**
     * Array of assignments to be done (used for recursion)
     * @private
     */
    this.assignments = [];
    this.plugins = options.plugins;
    this.features = options.features;
    this.marked = new Set(options.markedRefs);
  }
  createFunction(parameters, body) {
    if (this.features & 4 /* ArrowFunction */) {
      const joined = parameters.length === 1 ? parameters[0] : "(" + parameters.join(",") + ")";
      return joined + "=>" + body;
    }
    return "function(" + parameters.join(",") + "){return " + body + "}";
  }
  createEffectfulFunction(parameters, body) {
    if (this.features & 4 /* ArrowFunction */) {
      const joined = parameters.length === 1 ? parameters[0] : "(" + parameters.join(",") + ")";
      return joined + "=>{" + body + "}";
    }
    return "function(" + parameters.join(",") + "){" + body + "}";
  }
  /**
   * A tiny function that tells if a reference
   * is to be accessed. This is a requirement for
   * deciding whether or not we should generate
   * an identifier for the object
   */
  markRef(id) {
    this.marked.add(id);
  }
  isMarked(id) {
    return this.marked.has(id);
  }
  pushObjectFlag(flag, id) {
    if (flag !== 0 /* None */) {
      this.markRef(id);
      this.flags.push({
        type: flag,
        value: this.getRefParam(id)
      });
    }
  }
  resolveFlags() {
    let result = "";
    for (let i = 0, current = this.flags, len = current.length; i < len; i++) {
      const flag = current[i];
      result += OBJECT_FLAG_CONSTRUCTOR[flag.type] + "(" + flag.value + "),";
    }
    return result;
  }
  resolvePatches() {
    const assignments = resolveAssignments(this.assignments);
    const flags = this.resolveFlags();
    if (assignments) {
      if (flags) {
        return assignments + flags;
      }
      return assignments;
    }
    return flags;
  }
  /**
   * Generates the inlined assignment for the reference
   * This is different from the assignments array as this one
   * signifies creation rather than mutation
   */
  createAssignment(source, value) {
    this.assignments.push({
      t: "index",
      s: source,
      k: void 0,
      v: value
    });
  }
  createAddAssignment(ref, value) {
    this.assignments.push({
      t: "add",
      s: this.getRefParam(ref),
      k: void 0,
      v: value
    });
  }
  createSetAssignment(ref, key, value) {
    this.assignments.push({
      t: "set",
      s: this.getRefParam(ref),
      k: key,
      v: value
    });
  }
  createDeleteAssignment(ref, key) {
    this.assignments.push({
      t: "delete",
      s: this.getRefParam(ref),
      k: key,
      v: void 0
    });
  }
  createArrayAssign(ref, index, value) {
    this.createAssignment(this.getRefParam(ref) + "[" + index + "]", value);
  }
  createObjectAssign(ref, key, value) {
    this.createAssignment(this.getRefParam(ref) + "." + key, value);
  }
  /**
   * Checks if the value is in the stack. Stack here is a reference
   * structure to know if a object is to be accessed in a TDZ.
   */
  isIndexedValueInStack(node) {
    return node.t === 4 /* IndexedValue */ && this.stack.includes(node.i);
  }
  serializeReference(node) {
    return this.assignIndexedValue(node.i, REFERENCES_KEY + '.get("' + node.s + '")');
  }
  serializeArrayItem(id, item, index) {
    if (item) {
      if (this.isIndexedValueInStack(item)) {
        this.markRef(id);
        this.createArrayAssign(id, index, this.getRefParam(item.i));
        return "";
      }
      return this.serialize(item);
    }
    return "";
  }
  serializeArray(node) {
    const id = node.i;
    if (node.l) {
      this.stack.push(id);
      const list = node.a;
      let values = this.serializeArrayItem(id, list[0], 0);
      let isHoley = values === "";
      for (let i = 1, len = node.l, item; i < len; i++) {
        item = this.serializeArrayItem(id, list[i], i);
        values += "," + item;
        isHoley = item === "";
      }
      this.stack.pop();
      this.pushObjectFlag(node.o, node.i);
      return this.assignIndexedValue(id, "[" + values + (isHoley ? ",]" : "]"));
    }
    return this.assignIndexedValue(id, "[]");
  }
  serializeProperty(source, key, val) {
    if (typeof key === "string") {
      const check = Number(key);
      const isIdentifier = check >= 0 || isValidIdentifier(key);
      if (this.isIndexedValueInStack(val)) {
        const refParam = this.getRefParam(val.i);
        this.markRef(source.i);
        if (isIdentifier && check !== check) {
          this.createObjectAssign(source.i, key, refParam);
        } else {
          this.createArrayAssign(source.i, isIdentifier ? key : '"' + key + '"', refParam);
        }
        return "";
      }
      return (isIdentifier ? key : '"' + key + '"') + ":" + this.serialize(val);
    }
    return "[" + this.serialize(key) + "]:" + this.serialize(val);
  }
  serializeProperties(source, record) {
    const len = record.s;
    if (len) {
      this.stack.push(source.i);
      const keys = record.k;
      const values = record.v;
      let result = this.serializeProperty(source, keys[0], values[0]);
      for (let i = 1, item = result; i < len; i++) {
        item = this.serializeProperty(source, keys[i], values[i]);
        result += (item && result && ",") + item;
      }
      this.stack.pop();
      return "{" + result + "}";
    }
    return "{}";
  }
  serializeObject(node) {
    this.pushObjectFlag(node.o, node.i);
    return this.assignIndexedValue(node.i, this.serializeProperties(node, node.p));
  }
  serializeWithObjectAssign(source, value, serialized) {
    const fields = this.serializeProperties(source, value);
    if (fields !== "{}") {
      return "Object.assign(" + serialized + "," + fields + ")";
    }
    return serialized;
  }
  serializeAssignment(source, mainAssignments, key, value) {
    if (typeof key === "string") {
      const serialized = this.serialize(value);
      const check = Number(key);
      const isIdentifier = check >= 0 || isValidIdentifier(key);
      if (this.isIndexedValueInStack(value)) {
        if (isIdentifier && check !== check) {
          this.createObjectAssign(source.i, key, serialized);
        } else {
          this.createArrayAssign(source.i, isIdentifier ? key : '"' + key + '"', serialized);
        }
      } else {
        const parentAssignment = this.assignments;
        this.assignments = mainAssignments;
        if (isIdentifier) {
          this.createObjectAssign(source.i, key, serialized);
        } else {
          this.createArrayAssign(source.i, isIdentifier ? key : '"' + key + '"', serialized);
        }
        this.assignments = parentAssignment;
      }
    } else {
      const parent = this.stack;
      this.stack = [];
      const serialized = this.serialize(value);
      this.stack = parent;
      const parentAssignment = this.assignments;
      this.assignments = mainAssignments;
      this.createArrayAssign(
        source.i,
        this.serialize(key),
        serialized
      );
      this.assignments = parentAssignment;
    }
  }
  serializeAssignments(source, node) {
    const len = node.s;
    if (len) {
      this.stack.push(source.i);
      const mainAssignments = [];
      const keys = node.k;
      const values = node.v;
      for (let i = 0; i < len; i++) {
        this.serializeAssignment(source, mainAssignments, keys[i], values[i]);
      }
      this.stack.pop();
      return resolveAssignments(mainAssignments);
    }
    return void 0;
  }
  serializeDictionary(node, init) {
    if (node.p) {
      if (this.features & 128 /* ObjectAssign */) {
        init = this.serializeWithObjectAssign(node, node.p, init);
      } else {
        this.markRef(node.i);
        const assignments = this.serializeAssignments(node, node.p);
        if (assignments) {
          return "(" + this.assignIndexedValue(node.i, init) + "," + assignments + this.getRefParam(node.i) + ")";
        }
      }
    }
    return this.assignIndexedValue(node.i, init);
  }
  serializeNullConstructor(node) {
    this.pushObjectFlag(node.o, node.i);
    return this.serializeDictionary(node, NULL_CONSTRUCTOR);
  }
  serializeDate(node) {
    return this.assignIndexedValue(node.i, 'new Date("' + node.s + '")');
  }
  serializeRegExp(node) {
    return this.assignIndexedValue(node.i, "/" + node.c + "/" + node.m);
  }
  serializeSetItem(id, item) {
    if (this.isIndexedValueInStack(item)) {
      this.markRef(id);
      this.createAddAssignment(id, this.getRefParam(item.i));
      return "";
    }
    return this.serialize(item);
  }
  serializeSet(node) {
    let serialized = SET_CONSTRUCTOR;
    const size = node.l;
    const id = node.i;
    if (size) {
      const items = node.a;
      this.stack.push(id);
      let result = this.serializeSetItem(id, items[0]);
      for (let i = 1, item = result; i < size; i++) {
        item = this.serializeSetItem(id, items[i]);
        result += (item && result && ",") + item;
      }
      this.stack.pop();
      if (result) {
        serialized += "([" + result + "])";
      }
    }
    return this.assignIndexedValue(id, serialized);
  }
  serializeMapEntry(id, key, val, sentinel) {
    if (this.isIndexedValueInStack(key)) {
      const keyRef = this.getRefParam(key.i);
      this.markRef(id);
      if (this.isIndexedValueInStack(val)) {
        const valueRef = this.getRefParam(val.i);
        this.createSetAssignment(id, keyRef, valueRef);
        return "";
      }
      if (val.t !== 4 /* IndexedValue */ && val.i != null && this.isMarked(val.i)) {
        const serialized = "(" + this.serialize(val) + ",[" + sentinel + "," + sentinel + "])";
        this.createSetAssignment(id, keyRef, this.getRefParam(val.i));
        this.createDeleteAssignment(id, sentinel);
        return serialized;
      }
      const parent = this.stack;
      this.stack = [];
      this.createSetAssignment(id, keyRef, this.serialize(val));
      this.stack = parent;
      return "";
    }
    if (this.isIndexedValueInStack(val)) {
      const valueRef = this.getRefParam(val.i);
      this.markRef(id);
      if (key.t !== 4 /* IndexedValue */ && key.i != null && this.isMarked(key.i)) {
        const serialized = "(" + this.serialize(key) + ",[" + sentinel + "," + sentinel + "])";
        this.createSetAssignment(id, this.getRefParam(key.i), valueRef);
        this.createDeleteAssignment(id, sentinel);
        return serialized;
      }
      const parent = this.stack;
      this.stack = [];
      this.createSetAssignment(id, this.serialize(key), valueRef);
      this.stack = parent;
      return "";
    }
    return "[" + this.serialize(key) + "," + this.serialize(val) + "]";
  }
  serializeMap(node) {
    let serialized = MAP_CONSTRUCTOR;
    const size = node.e.s;
    const id = node.i;
    const sentinel = node.f;
    const sentinelID = this.getRefParam(sentinel.i);
    if (size) {
      const keys = node.e.k;
      const vals = node.e.v;
      this.stack.push(id);
      let result = this.serializeMapEntry(id, keys[0], vals[0], sentinelID);
      for (let i = 1, item = result; i < size; i++) {
        item = this.serializeMapEntry(id, keys[i], vals[i], sentinelID);
        result += (item && result && ",") + item;
      }
      this.stack.pop();
      if (result) {
        serialized += "([" + result + "])";
      }
    }
    if (sentinel.t === 41 /* SpecialReference */) {
      this.markRef(sentinel.i);
      serialized = "(" + this.serialize(sentinel) + "," + serialized + ")";
    }
    return this.assignIndexedValue(id, serialized);
  }
  serializeArrayBuffer(node) {
    let result = "new Uint8Array(";
    const buffer = node.s;
    const len = buffer.length;
    if (len) {
      result += "[" + buffer[0];
      for (let i = 1; i < len; i++) {
        result += "," + buffer[i];
      }
      result += "]";
    }
    return this.assignIndexedValue(node.i, result + ").buffer");
  }
  serializeTypedArray(node) {
    return this.assignIndexedValue(
      node.i,
      "new " + node.c + "(" + this.serialize(node.f) + "," + node.b + "," + node.l + ")"
    );
  }
  serializeDataView(node) {
    return this.assignIndexedValue(
      node.i,
      "new DataView(" + this.serialize(node.f) + "," + node.b + "," + node.l + ")"
    );
  }
  serializeAggregateError(node) {
    const id = node.i;
    this.stack.push(id);
    const serialized = 'new AggregateError([],"' + node.m + '")';
    this.stack.pop();
    return this.serializeDictionary(node, serialized);
  }
  serializeError(node) {
    return this.serializeDictionary(node, "new " + ERROR_CONSTRUCTOR_STRING[node.s] + '("' + node.m + '")');
  }
  serializePromise(node) {
    let serialized;
    const fulfilled = node.f;
    const id = node.i;
    const constructor = node.s ? PROMISE_RESOLVE : PROMISE_REJECT;
    if (this.isIndexedValueInStack(fulfilled)) {
      const ref = this.getRefParam(fulfilled.i);
      serialized = constructor + (node.s ? "().then(" + this.createFunction([], ref) + ")" : "().catch(" + this.createEffectfulFunction([], "throw " + ref) + ")");
    } else {
      this.stack.push(id);
      const result = this.serialize(fulfilled);
      this.stack.pop();
      serialized = constructor + "(" + result + ")";
    }
    return this.assignIndexedValue(id, serialized);
  }
  serializeWKSymbol(node) {
    return this.assignIndexedValue(node.i, SYMBOL_STRING[node.s]);
  }
  serializeURL(node) {
    return this.assignIndexedValue(node.i, 'new URL("' + node.s + '")');
  }
  serializeURLSearchParams(node) {
    return this.assignIndexedValue(
      node.i,
      node.s ? 'new URLSearchParams("' + node.s + '")' : "new URLSearchParams"
    );
  }
  serializeBlob(node) {
    return this.assignIndexedValue(
      node.i,
      "new Blob([" + this.serialize(node.f) + '],{type:"' + node.c + '"})'
    );
  }
  serializeFile(node) {
    return this.assignIndexedValue(
      node.i,
      "new File([" + this.serialize(node.f) + '],"' + node.m + '",{type:"' + node.c + '",lastModified:' + node.b + "})"
    );
  }
  serializeHeaders(node) {
    return this.assignIndexedValue(
      node.i,
      "new Headers(" + this.serializeProperties(node, node.e) + ")"
    );
  }
  serializeFormDataEntry(id, key, value) {
    return this.getRefParam(id) + '.append("' + key + '",' + this.serialize(value) + ")";
  }
  serializeFormDataEntries(node, size) {
    const keys = node.e.k;
    const vals = node.e.v;
    const id = node.i;
    let result = this.serializeFormDataEntry(id, keys[0], vals[0]);
    for (let i = 1; i < size; i++) {
      result += "," + this.serializeFormDataEntry(id, keys[i], vals[i]);
    }
    return result;
  }
  serializeFormData(node) {
    const size = node.e.s;
    const id = node.i;
    if (size) {
      this.markRef(id);
    }
    const result = this.assignIndexedValue(id, "new FormData()");
    if (size) {
      const entries = this.serializeFormDataEntries(node, size);
      return "(" + result + "," + (entries ? entries + "," : "") + this.getRefParam(id) + ")";
    }
    return result;
  }
  serializeBoxed(node) {
    return this.assignIndexedValue(node.i, "Object(" + this.serialize(node.f) + ")");
  }
  serializeRequest(node) {
    return this.assignIndexedValue(node.i, 'new Request("' + node.s + '",' + this.serialize(node.f) + ")");
  }
  serializeResponse(node) {
    return this.assignIndexedValue(
      node.i,
      "new Response(" + this.serialize(node.a[0]) + "," + this.serialize(node.a[1]) + ")"
    );
  }
  serializeEvent(node) {
    return this.assignIndexedValue(
      node.i,
      'new Event("' + node.s + '",' + this.serialize(node.f) + ")"
    );
  }
  serializeCustomEvent(node) {
    return this.assignIndexedValue(
      node.i,
      'new CustomEvent("' + node.s + '",' + this.serialize(node.f) + ")"
    );
  }
  serializeDOMException(node) {
    return this.assignIndexedValue(
      node.i,
      'new DOMException("' + node.s + '","' + node.c + '")'
    );
  }
  serializePlugin(node) {
    const currentPlugins = this.plugins;
    if (currentPlugins) {
      for (let i = 0, len = currentPlugins.length; i < len; i++) {
        const plugin = currentPlugins[i];
        if (plugin.tag === node.c) {
          return this.assignIndexedValue(
            node.i,
            plugin.serialize(node.s, this, {
              id: node.i
            })
          );
        }
      }
    }
    throw new Error('Missing plugin for tag "' + node.c + '".');
  }
  getConstructor(node) {
    const constructor = this.serialize(node);
    return constructor === this.getRefParam(node.i) ? constructor : "(" + constructor + ")";
  }
  serializePromiseConstructor(node) {
    return this.assignIndexedValue(
      node.i,
      this.getConstructor(node.f) + "()"
    );
  }
  serializePromiseResolve(node) {
    return this.getConstructor(node.a[0]) + "(" + this.getRefParam(node.i) + "," + this.serialize(node.a[1]) + ")";
  }
  serializePromiseReject(node) {
    return this.getConstructor(node.a[0]) + "(" + this.getRefParam(node.i) + "," + this.serialize(node.a[1]) + ")";
  }
  serializeReadableStreamConstructor(node) {
    return this.assignIndexedValue(
      node.i,
      this.getConstructor(node.f) + "()"
    );
  }
  serializeReadableStreamEnqueue(node) {
    return this.getConstructor(node.a[0]) + "(" + this.getRefParam(node.i) + "," + this.serialize(node.a[1]) + ")";
  }
  serializeReadableStreamError(node) {
    return this.getConstructor(node.a[0]) + "(" + this.getRefParam(node.i) + "," + this.serialize(node.a[1]) + ")";
  }
  serializeReadableStreamClose(node) {
    return this.getConstructor(node.f) + "(" + this.getRefParam(node.i) + ")";
  }
  serializeSpecialReferenceValue(ref) {
    switch (ref) {
      case 0 /* MapSentinel */:
        return "[]";
      case 1 /* ReadableStream */:
        return this.createFunction(
          ["s"],
          "new ReadableStream({start:" + this.createFunction(
            ["c"],
            "Promise.resolve().then(" + this.createEffectfulFunction(
              ["i", "v"],
              "for(i=0;i<s.d;i++)c.enqueue(s.v[i]);(s.t===-1)?c.close():c.error(s.v[i])"
            ) + ")"
          ) + "})"
        );
      case 2 /* PromiseConstructor */:
        return this.createFunction(
          ["s", "f", "p"],
          "((p=new Promise(" + this.createEffectfulFunction(["a", "b"], "s=a,f=b") + ")).s=s,p.f=f,p)"
        );
      case 3 /* PromiseResolve */:
        return this.createEffectfulFunction(
          ["p", "d"],
          'p.s(d),p.status="success",p.value=d;delete p.s;delete p.f'
        );
      case 4 /* PromiseReject */:
        return this.createEffectfulFunction(
          ["p", "d"],
          'p.f(d),p.status="failure",p.value=d;delete p.s;delete p.f'
        );
      case 5 /* ReadableStreamConstructor */:
        return this.createFunction(
          ["s", "c"],
          "((s=new ReadableStream({start:" + this.createEffectfulFunction(["x"], "c=x") + "})).c=c,s)"
        );
      case 6 /* ReadableStreamEnqueue */:
        return this.createEffectfulFunction(
          ["s", "d"],
          "s.c.enqueue(d)"
        );
      case 7 /* ReadableStreamError */:
        return this.createEffectfulFunction(
          ["s", "d"],
          "s.c.error(d);delete s.c"
        );
      case 8 /* ReadableStreamClose */:
        return this.createEffectfulFunction(
          ["s"],
          "s.c.close();delete s.c"
        );
      default:
        return "";
    }
  }
  serializeSpecialReference(node) {
    return this.assignIndexedValue(
      node.i,
      this.serializeSpecialReferenceValue(node.s)
    );
  }
  serializeIteratorFactory(node) {
    return this.assignIndexedValue(
      node.i,
      this.createFunction(
        ["s"],
        this.createFunction(
          ["i", "c", "d", "t"],
          "(i=0,t={[" + this.serialize(node.f) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction([], "if(i>s.d)return{done:!0,value:void 0};c=i++,d=s.v[c];if(c===s.t)throw d;return{done:c===s.d,value:d}") + "})"
        )
      )
    );
  }
  serializeIteratorFactoryInstance(node) {
    return this.getConstructor(node.a[0]) + "(" + this.serialize(node.a[1]) + ")";
  }
  getStreamingAsyncIteratorFactory(node) {
    return this.createFunction(
      ["s"],
      this.createFunction(
        ["b", "t"],
        "(b=s.tee(),s=b[0],b=b[1].getReader(),t={[" + this.serialize(node.f) + "]:" + this.createFunction([], "t") + ",next:" + this.createFunction(
          [],
          "b.read().then(" + this.createEffectfulFunction(
            ["d"],
            "if(d.done)return{done:!0,value:void 0};d=d.value;if(d[0]===1)throw d[1];return{done:d[0]===2,value:d[1]}"
          ) + ")"
        ) + "})"
      )
    );
  }
  getBlockingAsyncIteratorFactory(node) {
    return this.createFunction(
      ["s"],
      this.createFunction(
        ["i", "t"],
        "(i=0,t={[" + this.serialize(node.f) + "]:" + this.createFunction([], "t") + ",next:" + this.createFunction(
          [],
          "Promise.resolve().then(" + this.createEffectfulFunction(
            ["c", "d"],
            "if(i>s.d)return{done:!0,value:void 0};c=i++,d=s.v[c];if(c===s.t)throw d;return{done:c===s.d,value:d}"
          ) + ")"
        ) + "})"
      )
    );
  }
  serializeAsyncIteratorFactory(node) {
    return this.assignIndexedValue(
      node.i,
      node.s ? this.getStreamingAsyncIteratorFactory(node) : this.getBlockingAsyncIteratorFactory(node)
    );
  }
  serializeAsyncIteratorFactoryInstance(node) {
    return this.getConstructor(node.a[0]) + "(" + this.serialize(node.a[1]) + ")";
  }
  serializeReadableStream(node) {
    this.stack.push(node.i);
    const result = this.getConstructor(node.a[0]) + "(" + this.serialize(node.a[1]) + ")";
    this.stack.pop();
    return this.assignIndexedValue(
      node.i,
      result
    );
  }
  serialize(node) {
    switch (node.t) {
      case 2 /* Constant */:
        return CONSTANT_STRING[node.s];
      case 0 /* Number */:
        return "" + node.s;
      case 1 /* String */:
        return '"' + node.s + '"';
      case 3 /* BigInt */:
        return node.s + "n";
      case 4 /* IndexedValue */:
        return this.getRefParam(node.i);
      case 20 /* Reference */:
        return this.serializeReference(node);
      case 9 /* Array */:
        return this.serializeArray(node);
      case 10 /* Object */:
        return this.serializeObject(node);
      case 11 /* NullConstructor */:
        return this.serializeNullConstructor(node);
      case 5 /* Date */:
        return this.serializeDate(node);
      case 6 /* RegExp */:
        return this.serializeRegExp(node);
      case 7 /* Set */:
        return this.serializeSet(node);
      case 8 /* Map */:
        return this.serializeMap(node);
      case 21 /* ArrayBuffer */:
        return this.serializeArrayBuffer(node);
      case 16 /* BigIntTypedArray */:
      case 15 /* TypedArray */:
        return this.serializeTypedArray(node);
      case 22 /* DataView */:
        return this.serializeDataView(node);
      case 14 /* AggregateError */:
        return this.serializeAggregateError(node);
      case 13 /* Error */:
        return this.serializeError(node);
      case 12 /* Promise */:
        return this.serializePromise(node);
      case 17 /* WKSymbol */:
        return this.serializeWKSymbol(node);
      case 18 /* URL */:
        return this.serializeURL(node);
      case 19 /* URLSearchParams */:
        return this.serializeURLSearchParams(node);
      case 23 /* Blob */:
        return this.serializeBlob(node);
      case 24 /* File */:
        return this.serializeFile(node);
      case 25 /* Headers */:
        return this.serializeHeaders(node);
      case 26 /* FormData */:
        return this.serializeFormData(node);
      case 27 /* Boxed */:
        return this.serializeBoxed(node);
      case 28 /* PromiseConstructor */:
        return this.serializePromiseConstructor(node);
      case 29 /* PromiseResolve */:
        return this.serializePromiseResolve(node);
      case 30 /* PromiseReject */:
        return this.serializePromiseReject(node);
      case 31 /* ReadableStreamConstructor */:
        return this.serializeReadableStreamConstructor(node);
      case 32 /* ReadableStreamEnqueue */:
        return this.serializeReadableStreamEnqueue(node);
      case 34 /* ReadableStreamError */:
        return this.serializeReadableStreamError(node);
      case 33 /* ReadableStreamClose */:
        return this.serializeReadableStreamClose(node);
      case 35 /* Request */:
        return this.serializeRequest(node);
      case 36 /* Response */:
        return this.serializeResponse(node);
      case 37 /* Event */:
        return this.serializeEvent(node);
      case 38 /* CustomEvent */:
        return this.serializeCustomEvent(node);
      case 39 /* DOMException */:
        return this.serializeDOMException(node);
      case 40 /* Plugin */:
        return this.serializePlugin(node);
      case 41 /* SpecialReference */:
        return this.serializeSpecialReference(node);
      case 42 /* IteratorFactory */:
        return this.serializeIteratorFactory(node);
      case 43 /* IteratorFactoryInstance */:
        return this.serializeIteratorFactoryInstance(node);
      case 44 /* AsyncIteratorFactory */:
        return this.serializeAsyncIteratorFactory(node);
      case 45 /* AsyncIteratorFactoryInstance */:
        return this.serializeAsyncIteratorFactoryInstance(node);
      case 46 /* ReadableStream */:
        return this.serializeReadableStream(node);
      default:
        throw new Error("invariant");
    }
  }
};

// src/core/utils/get-identifier.ts
var REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
var REF_START_CHARS_LEN = REF_START_CHARS.length;
var REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
var REF_CHARS_LEN = REF_CHARS.length;
function getIdentifier(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}

// src/core/tree/serializer.ts
var VanillaSerializerContext = class extends BaseSerializerContext {
  constructor() {
    super(...arguments);
    this.mode = "vanilla";
    /**
     * Map tree refs to actual refs
     * @private
     */
    this.valid = /* @__PURE__ */ new Map();
    /**
     * Variables
     * @private
     */
    this.vars = [];
  }
  /**
   * Increments the number of references the referenced value has
   */
  markRef(current) {
    this.marked.add(current);
  }
  /**
   * Creates the reference param (identifier) from the given reference ID
   * Calling this function means the value has been referenced somewhere
   */
  getRefParam(index) {
    let actualIndex = this.valid.get(index);
    if (actualIndex == null) {
      actualIndex = this.valid.size;
      this.valid.set(index, actualIndex);
    }
    let identifier = this.vars[actualIndex];
    if (identifier == null) {
      identifier = getIdentifier(actualIndex);
      this.vars[actualIndex] = identifier;
    }
    return identifier;
  }
  assignIndexedValue(index, value) {
    if (this.isMarked(index)) {
      return this.getRefParam(index) + "=" + value;
    }
    return value;
  }
  serializePromiseConstructor(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializePromiseResolve(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializePromiseReject(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializeReadableStreamConstructor(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializeReadableStreamEnqueue(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializeReadableStreamError(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializeReadableStreamClose(node) {
    throw new Error('Unsupported node type "' + node.t + '".');
  }
  serializeTop(tree) {
    const result = this.serialize(tree);
    if (tree.i != null && this.vars.length) {
      const patches = this.resolvePatches();
      let body = result;
      if (patches) {
        const index = this.getRefParam(tree.i);
        body = result + "," + patches + index;
        if (!result.startsWith(index + "=")) {
          body = index + "=" + body;
        }
      }
      return "(" + this.createFunction(this.vars, "(" + body + ")") + ")()";
    }
    if (tree.t === 10 /* Object */) {
      return "(" + result + ")";
    }
    return result;
  }
};

// src/core/context/parser/sync.ts
var BaseSyncParserContext = class extends BaseParserContext {
  parseItems(current) {
    const nodes = [];
    for (let i = 0, len = current.length; i < len; i++) {
      if (i in current) {
        nodes[i] = this.parse(current[i]);
      }
    }
    return nodes;
  }
  parseArray(id, current) {
    return createArrayNode(
      id,
      current,
      this.parseItems(current)
    );
  }
  parseProperties(properties) {
    const entries = Object.entries(properties);
    const keyNodes = [];
    const valueNodes = [];
    for (let i = 0, len = entries.length; i < len; i++) {
      keyNodes.push(serializeString(entries[i][0]));
      valueNodes.push(this.parse(entries[i][1]));
    }
    if (this.features & 1024 /* Symbol */) {
      let symbol = Symbol.iterator;
      if (symbol in properties) {
        keyNodes.push(
          this.parseWKSymbol(symbol)
        );
        valueNodes.push(
          createIteratorFactoryInstanceNode(
            this.parseIteratorFactory(),
            this.parse(
              iteratorToSequence(properties)
            )
          )
        );
      }
      symbol = Symbol.toStringTag;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(createStringNode(properties[symbol]));
      }
      symbol = Symbol.isConcatSpreadable;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(properties[symbol] ? TRUE_NODE : FALSE_NODE);
      }
    }
    return {
      k: keyNodes,
      v: valueNodes,
      s: keyNodes.length
    };
  }
  parsePlainObject(id, current, empty) {
    return this.createObjectNode(
      id,
      current,
      empty,
      this.parseProperties(current)
    );
  }
  parseBoxed(id, current) {
    return createBoxedNode(id, this.parse(current.valueOf()));
  }
  parseTypedArray(id, current) {
    return createTypedArrayNode(id, current, this.parse(current.buffer));
  }
  parseBigIntTypedArray(id, current) {
    return createBigIntTypedArrayNode(id, current, this.parse(current.buffer));
  }
  parseDataView(id, current) {
    return createDataViewNode(id, current, this.parse(current.buffer));
  }
  parseError(id, current) {
    const options = getErrorOptions(current, this.features);
    return createErrorNode(
      id,
      current,
      options ? this.parseProperties(options) : void 0
    );
  }
  parseAggregateError(id, current) {
    const options = getErrorOptions(current, this.features);
    return createAggregateErrorNode(
      id,
      current,
      options ? this.parseProperties(options) : void 0
    );
  }
  parseMap(id, current) {
    const keyNodes = [];
    const valueNodes = [];
    for (const [key, value] of current.entries()) {
      keyNodes.push(this.parse(key));
      valueNodes.push(this.parse(value));
    }
    return this.createMapNode(
      id,
      keyNodes,
      valueNodes,
      current.size
    );
  }
  parseSet(id, current) {
    const items = [];
    for (const item of current.keys()) {
      items.push(this.parse(item));
    }
    return createSetNode(id, current.size, items);
  }
  parsePlainProperties(entries) {
    const size = entries.length;
    const keyNodes = [];
    const valueNodes = [];
    for (let i = 0; i < size; i++) {
      keyNodes.push(serializeString(entries[i][0]));
      valueNodes.push(this.parse(entries[i][1]));
    }
    return {
      k: keyNodes,
      v: valueNodes,
      s: size
    };
  }
  parseHeaders(id, current) {
    const items = [];
    current.forEach((value, key) => {
      items.push([key, value]);
    });
    return {
      t: 25 /* Headers */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: this.parsePlainProperties(items),
      a: void 0,
      f: void 0,
      b: void 0,
      o: void 0
    };
  }
  parseFormData(id, current) {
    const items = [];
    current.forEach((value, key) => {
      items.push([key, value]);
    });
    return {
      t: 26 /* FormData */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: this.parsePlainProperties(items),
      a: void 0,
      f: void 0,
      b: void 0,
      o: void 0
    };
  }
  parseEvent(id, current) {
    return createEventNode(id, current.type, this.parse(createEventOptions(current)));
  }
  parseCustomEvent(id, current) {
    return createCustomEventNode(id, current.type, this.parse(createCustomEventOptions(current)));
  }
  parsePlugin(id, current) {
    const currentPlugins = this.plugins;
    if (currentPlugins) {
      for (let i = 0, len = currentPlugins.length; i < len; i++) {
        const plugin = currentPlugins[i];
        if (plugin.parse.sync && plugin.test(current)) {
          return createPluginNode(
            id,
            plugin.tag,
            plugin.parse.sync(current, this, {
              id
            })
          );
        }
      }
    }
    return void 0;
  }
  parseObject(id, current) {
    if (Array.isArray(current)) {
      return this.parseArray(id, current);
    }
    const currentClass = current.constructor;
    switch (currentClass) {
      case Object:
        return this.parsePlainObject(
          id,
          current,
          false
        );
      case void 0:
        return this.parsePlainObject(
          id,
          current,
          true
        );
      case Date:
        return createDateNode(id, current);
      case RegExp:
        return createRegExpNode(id, current);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(id, current);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(id, current);
      default:
        break;
    }
    const currentFeatures = this.features;
    if (currentFeatures & 2048 /* TypedArray */) {
      switch (currentClass) {
        case ArrayBuffer:
          return createArrayBufferNode(id, current);
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
        case Uint8ClampedArray:
        case Float32Array:
        case Float64Array:
          return this.parseTypedArray(id, current);
        case DataView:
          return this.parseDataView(id, current);
        default:
          break;
      }
    }
    if ((currentFeatures & BIGINT_FLAG) === BIGINT_FLAG) {
      switch (currentClass) {
        case BigInt64Array:
        case BigUint64Array:
          return this.parseBigIntTypedArray(id, current);
        default:
          break;
      }
    }
    if (currentFeatures & 32 /* Map */ && currentClass === Map) {
      return this.parseMap(
        id,
        current
      );
    }
    if (currentFeatures & 512 /* Set */ && currentClass === Set) {
      return this.parseSet(
        id,
        current
      );
    }
    if (currentFeatures & 8192 /* WebAPI */) {
      switch (currentClass) {
        case (typeof URL !== "undefined" ? URL : UNIVERSAL_SENTINEL):
          return createURLNode(id, current);
        case (typeof URLSearchParams !== "undefined" ? URLSearchParams : UNIVERSAL_SENTINEL):
          return createURLSearchParamsNode(id, current);
        case (typeof Headers !== "undefined" ? Headers : UNIVERSAL_SENTINEL):
          return this.parseHeaders(id, current);
        case (typeof FormData !== "undefined" ? FormData : UNIVERSAL_SENTINEL):
          return this.parseFormData(id, current);
        case (typeof Event !== "undefined" ? Event : UNIVERSAL_SENTINEL):
          return this.parseEvent(id, current);
        case (typeof CustomEvent !== "undefined" ? CustomEvent : UNIVERSAL_SENTINEL):
          return this.parseCustomEvent(id, current);
        case (typeof DOMException !== "undefined" ? DOMException : UNIVERSAL_SENTINEL):
          return createDOMExceptionNode(id, current);
        default:
          break;
      }
    }
    const parsed = this.parsePlugin(id, current);
    if (parsed) {
      return parsed;
    }
    if (currentFeatures & 1 /* AggregateError */ && typeof AggregateError !== "undefined" && (currentClass === AggregateError || current instanceof AggregateError)) {
      return this.parseAggregateError(id, current);
    }
    if (current instanceof Error) {
      return this.parseError(id, current);
    }
    if (currentFeatures & 1024 /* Symbol */ && Symbol.iterator in current) {
      return this.parsePlainObject(id, current, !!currentClass);
    }
    throw new UnsupportedTypeError(current);
  }
  parse(current) {
    switch (current) {
      case true:
        return TRUE_NODE;
      case false:
        return FALSE_NODE;
      case void 0:
        return UNDEFINED_NODE;
      case null:
        return NULL_NODE;
      default:
        break;
    }
    switch (typeof current) {
      case "string":
        return createStringNode(current);
      case "number":
        return createNumberNode(current);
      case "bigint":
        assert(this.features & 8 /* BigInt */, new UnsupportedTypeError(current));
        return createBigIntNode(current);
      case "object": {
        const id = this.getReference(current);
        return typeof id === "number" ? this.parseObject(id, current) : id;
      }
      case "symbol": {
        assert(this.features & 1024 /* Symbol */, new UnsupportedTypeError(current));
        const id = this.getReference(current);
        return typeof id === "number" ? createWKSymbolNode(id, current) : id;
      }
      case "function":
        assert(hasReferenceID(current), new Error("Cannot serialize function without reference ID."));
        return this.getStrictReference(current);
      default:
        throw new UnsupportedTypeError(current);
    }
  }
};

// src/core/tree/sync.ts
var SyncParserContext = class extends BaseSyncParserContext {
  constructor() {
    super(...arguments);
    this.mode = "vanilla";
  }
};

// src/core/tree/index.ts
function serialize(source, options = {}) {
  const ctx = new SyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures
  });
  const tree = ctx.parse(source);
  const serial = new VanillaSerializerContext({
    plugins: options.plugins,
    features: ctx.features,
    markedRefs: ctx.marked
  });
  return serial.serializeTop(tree);
}
async function serializeAsync(source, options = {}) {
  const ctx = new AsyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures
  });
  const tree = await ctx.parse(source);
  const serial = new VanillaSerializerContext({
    plugins: options.plugins,
    features: ctx.features,
    markedRefs: ctx.marked
  });
  return serial.serializeTop(tree);
}
function deserialize(source) {
  return (0, eval)(source);
}
function toJSON(source, options = {}) {
  const ctx = new SyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures
  });
  return {
    t: ctx.parse(source),
    f: ctx.features,
    m: Array.from(ctx.marked)
  };
}
async function toJSONAsync(source, options = {}) {
  const ctx = new AsyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures
  });
  return {
    t: await ctx.parse(source),
    f: ctx.features,
    m: Array.from(ctx.marked)
  };
}
function compileJSON(source, options = {}) {
  const ctx = new VanillaSerializerContext({
    plugins: options.plugins,
    features: source.f,
    markedRefs: source.m
  });
  return ctx.serializeTop(source.t);
}
function fromJSON(source, options = {}) {
  const ctx = new VanillaDeserializerContext({
    plugins: options.plugins,
    markedRefs: source.m
  });
  return ctx.deserialize(source.t);
}

// src/core/cross/async.ts
var CrossAsyncParserContext = class extends BaseAsyncParserContext {
  constructor() {
    super(...arguments);
    this.mode = "cross";
  }
};

// src/core/cross/deserializer.ts
var CrossDeserializerContext = class extends BaseDeserializerContext {
  constructor() {
    super(...arguments);
    this.mode = "cross";
  }
  assignIndexedValue(index, value) {
    if (!this.refs.has(index)) {
      this.refs.set(index, value);
    }
    return value;
  }
};

// src/core/cross/serializer.ts
var CrossSerializerContext = class extends BaseSerializerContext {
  constructor(options) {
    super(options);
    this.mode = "cross";
    this.scopeId = options.scopeId;
  }
  getRefParam(id) {
    if (typeof id === "string") {
      return GLOBAL_CONTEXT_REFERENCES + "." + id;
    }
    return GLOBAL_CONTEXT_REFERENCES + "[" + id + "]";
  }
  assignIndexedValue(index, value) {
    return this.getRefParam(index) + "=" + value;
  }
  serializeTop(tree) {
    const result = this.serialize(tree);
    const id = tree.i;
    if (id == null) {
      return result;
    }
    const patches = this.resolvePatches();
    const ref = this.getRefParam(id);
    const params = this.scopeId == null ? "" : GLOBAL_CONTEXT_REFERENCES;
    const mainBody = patches ? result + "," + patches : result;
    if (params === "") {
      return patches ? "(" + mainBody + ref + ")" : mainBody;
    }
    const args = this.scopeId == null ? "()" : "(" + GLOBAL_CONTEXT_REFERENCES + '["' + serializeString(this.scopeId) + '"])';
    const body = mainBody + (patches ? ref : "");
    return "(" + this.createFunction([params], body) + ")" + args;
  }
};

// src/core/context/parser/stream.ts
var BaseStreamParserContext = class extends BaseSyncParserContext {
  constructor(options) {
    super(options);
    // Life
    this.alive = true;
    // Amount of pending promises/streams
    this.pending = 0;
    this.onParseCallback = options.onParse;
    this.onErrorCallback = options.onError;
    this.onDoneCallback = options.onDone;
  }
  onParse(node, initial) {
    try {
      this.onParseCallback(node, initial);
    } catch (error) {
      this.onError(error);
    }
  }
  onError(error) {
    if (this.onErrorCallback) {
      this.onErrorCallback(error);
    } else {
      throw error;
    }
  }
  onDone() {
    if (this.onDoneCallback) {
      this.onDoneCallback();
    }
  }
  push(value) {
    this.onParse(
      this.parse(value),
      false
    );
  }
  pushPendingState() {
    this.pending++;
  }
  popPendingState() {
    if (--this.pending <= 0) {
      this.onDone();
    }
  }
  parseProperties(properties) {
    const entries = Object.entries(properties);
    const keyNodes = [];
    const valueNodes = [];
    for (let i = 0, len = entries.length; i < len; i++) {
      keyNodes.push(serializeString(entries[i][0]));
      valueNodes.push(this.parse(entries[i][1]));
    }
    if (this.features & 1024 /* Symbol */) {
      let symbol = Symbol.iterator;
      if (symbol in properties) {
        keyNodes.push(
          this.parseWKSymbol(symbol)
        );
        valueNodes.push(
          createIteratorFactoryInstanceNode(
            this.parseIteratorFactory(),
            this.parse(
              iteratorToSequence(properties)
            )
          )
        );
      }
      symbol = Symbol.asyncIterator;
      if (symbol in properties) {
        keyNodes.push(
          this.parseWKSymbol(symbol)
        );
        valueNodes.push(
          createAsyncIteratorFactoryInstanceNode(
            this.parseAsyncIteratorFactory(1),
            this.parse(
              asyncIteratorToReadableStream(
                properties,
                this
              )
            )
          )
        );
      }
      symbol = Symbol.toStringTag;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(createStringNode(properties[symbol]));
      }
      symbol = Symbol.isConcatSpreadable;
      if (symbol in properties) {
        keyNodes.push(this.parseWKSymbol(symbol));
        valueNodes.push(properties[symbol] ? TRUE_NODE : FALSE_NODE);
      }
    }
    return {
      k: keyNodes,
      v: valueNodes,
      s: keyNodes.length
    };
  }
  pushReadableStreamReader(id, reader) {
    reader.read().then(
      (data) => {
        if (this.alive) {
          if (data.done) {
            this.onParse({
              t: 33 /* ReadableStreamClose */,
              i: id,
              s: void 0,
              l: void 0,
              c: void 0,
              m: void 0,
              p: void 0,
              e: void 0,
              a: void 0,
              f: this.parseSpecialReference(8 /* ReadableStreamClose */),
              b: void 0,
              o: void 0
            }, false);
            this.popPendingState();
          } else {
            const parsed = this.parseWithError(data.value);
            if (parsed) {
              this.onParse({
                t: 32 /* ReadableStreamEnqueue */,
                i: id,
                s: void 0,
                l: void 0,
                c: void 0,
                m: void 0,
                p: void 0,
                e: void 0,
                a: [
                  this.parseSpecialReference(6 /* ReadableStreamEnqueue */),
                  parsed
                ],
                f: void 0,
                b: void 0,
                o: void 0
              }, false);
              this.pushReadableStreamReader(id, reader);
            }
          }
        }
      },
      (value) => {
        if (this.alive) {
          const parsed = this.parseWithError(value);
          if (parsed) {
            this.onParse({
              t: 34 /* ReadableStreamError */,
              i: id,
              s: void 0,
              l: void 0,
              c: void 0,
              m: void 0,
              p: void 0,
              e: void 0,
              a: [
                this.parseSpecialReference(7 /* ReadableStreamError */),
                parsed
              ],
              f: void 0,
              b: void 0,
              o: void 0
            }, false);
          }
          this.popPendingState();
        }
      }
    );
  }
  parseReadableStream(id, current) {
    const reader = current.getReader();
    this.pushPendingState();
    this.pushReadableStreamReader(id, reader);
    return {
      t: 31 /* ReadableStreamConstructor */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: this.parseSpecialReference(5 /* ReadableStreamConstructor */),
      b: void 0,
      o: void 0
    };
  }
  parseRequest(id, current) {
    return {
      t: 35 /* Request */,
      i: id,
      s: serializeString(current.url),
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      f: this.parse(
        createRequestOptions(current, current.clone().body)
      ),
      a: void 0,
      b: void 0,
      o: void 0
    };
  }
  parseResponse(id, current) {
    return {
      t: 36 /* Response */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      f: void 0,
      a: [
        current.body ? this.parse(current.clone().body) : NULL_NODE,
        this.parse(createResponseOptions(current))
      ],
      b: void 0,
      o: void 0
    };
  }
  parsePromise(id, current) {
    current.then(
      (data) => {
        const parsed = this.parseWithError(data);
        if (parsed) {
          this.onParse({
            t: 29 /* PromiseResolve */,
            i: id,
            s: void 0,
            l: void 0,
            c: void 0,
            m: void 0,
            p: void 0,
            e: void 0,
            a: [
              this.parseSpecialReference(3 /* PromiseResolve */),
              parsed
            ],
            f: void 0,
            b: void 0,
            o: void 0
          }, false);
        }
        this.popPendingState();
      },
      (data) => {
        if (this.alive) {
          const parsed = this.parseWithError(data);
          if (parsed) {
            this.onParse({
              t: 30 /* PromiseReject */,
              i: id,
              s: void 0,
              l: void 0,
              c: void 0,
              m: void 0,
              p: void 0,
              e: void 0,
              a: [
                this.parseSpecialReference(4 /* PromiseReject */),
                parsed
              ],
              f: void 0,
              b: void 0,
              o: void 0
            }, false);
          }
        }
        this.popPendingState();
      }
    );
    this.pushPendingState();
    return {
      t: 28 /* PromiseConstructor */,
      i: id,
      s: void 0,
      l: void 0,
      c: void 0,
      m: void 0,
      p: void 0,
      e: void 0,
      a: void 0,
      f: this.parseSpecialReference(2 /* PromiseConstructor */),
      b: void 0,
      o: void 0
    };
  }
  parsePlugin(id, current) {
    const currentPlugins = this.plugins;
    if (currentPlugins) {
      for (let i = 0, len = currentPlugins.length; i < len; i++) {
        const plugin = currentPlugins[i];
        if (plugin.parse.stream && plugin.test(current)) {
          return createPluginNode(
            id,
            plugin.tag,
            plugin.parse.stream(current, this, {
              id
            })
          );
        }
      }
    }
    return void 0;
  }
  parseObject(id, current) {
    if (Array.isArray(current)) {
      return this.parseArray(id, current);
    }
    const currentClass = current.constructor;
    switch (currentClass) {
      case Object:
        return this.parsePlainObject(
          id,
          current,
          false
        );
      case void 0:
        return this.parsePlainObject(
          id,
          current,
          true
        );
      case Date:
        return createDateNode(id, current);
      case RegExp:
        return createRegExpNode(id, current);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(id, current);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(id, current);
      default:
        break;
    }
    const currentFeatures = this.features;
    if (currentFeatures & 256 /* Promise */ && (currentClass === Promise || current instanceof Promise)) {
      return this.parsePromise(id, current);
    }
    if (currentFeatures & 2048 /* TypedArray */) {
      switch (currentClass) {
        case ArrayBuffer:
          return createArrayBufferNode(id, current);
        case Int8Array:
        case Int16Array:
        case Int32Array:
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
        case Uint8ClampedArray:
        case Float32Array:
        case Float64Array:
          return this.parseTypedArray(id, current);
        case DataView:
          return this.parseDataView(id, current);
        default:
          break;
      }
    }
    if ((currentFeatures & BIGINT_FLAG) === BIGINT_FLAG) {
      switch (currentClass) {
        case BigInt64Array:
        case BigUint64Array:
          return this.parseBigIntTypedArray(id, current);
        default:
          break;
      }
    }
    if (currentFeatures & 32 /* Map */ && currentClass === Map) {
      return this.parseMap(
        id,
        current
      );
    }
    if (currentFeatures & 512 /* Set */ && currentClass === Set) {
      return this.parseSet(
        id,
        current
      );
    }
    if (currentFeatures & 8192 /* WebAPI */) {
      switch (currentClass) {
        case (typeof URL !== "undefined" ? URL : UNIVERSAL_SENTINEL):
          return createURLNode(id, current);
        case (typeof URLSearchParams !== "undefined" ? URLSearchParams : UNIVERSAL_SENTINEL):
          return createURLSearchParamsNode(id, current);
        case (typeof Headers !== "undefined" ? Headers : UNIVERSAL_SENTINEL):
          return this.parseHeaders(id, current);
        case (typeof FormData !== "undefined" ? FormData : UNIVERSAL_SENTINEL):
          return this.parseFormData(id, current);
        case (typeof ReadableStream !== "undefined" ? ReadableStream : UNIVERSAL_SENTINEL):
          return this.parseReadableStream(id, current);
        case (typeof Request !== "undefined" ? Request : UNIVERSAL_SENTINEL):
          return this.parseRequest(id, current);
        case (typeof Response !== "undefined" ? Response : UNIVERSAL_SENTINEL):
          return this.parseResponse(id, current);
        case (typeof Event !== "undefined" ? Event : UNIVERSAL_SENTINEL):
          return this.parseEvent(id, current);
        case (typeof CustomEvent !== "undefined" ? CustomEvent : UNIVERSAL_SENTINEL):
          return this.parseCustomEvent(id, current);
        case (typeof DOMException !== "undefined" ? DOMException : UNIVERSAL_SENTINEL):
          return createDOMExceptionNode(id, current);
        default:
          break;
      }
    }
    const parsed = this.parsePlugin(id, current);
    if (parsed) {
      return parsed;
    }
    if (currentFeatures & 1 /* AggregateError */ && typeof AggregateError !== "undefined" && (currentClass === AggregateError || current instanceof AggregateError)) {
      return this.parseAggregateError(id, current);
    }
    if (current instanceof Error) {
      return this.parseError(id, current);
    }
    if (currentFeatures & 1024 /* Symbol */ && (Symbol.iterator in current || Symbol.asyncIterator in current)) {
      return this.parsePlainObject(id, current, !!currentClass);
    }
    throw new UnsupportedTypeError(current);
  }
  parseWithError(current) {
    try {
      return this.parse(current);
    } catch (err) {
      this.onError(err);
      return void 0;
    }
  }
  /**
   * @private
   */
  start(current) {
    const parsed = this.parseWithError(current);
    if (parsed) {
      this.onParse(parsed, true);
      if (this.pending <= 0) {
        this.destroy();
      }
    }
  }
  /**
   * @private
   */
  destroy() {
    if (this.alive) {
      this.onDone();
      this.alive = false;
    }
  }
  isAlive() {
    return this.alive;
  }
};

// src/core/cross/stream.ts
var CrossStreamParserContext = class extends BaseStreamParserContext {
  constructor() {
    super(...arguments);
    this.mode = "cross";
  }
};

// src/core/cross/sync.ts
var CrossSyncParserContext = class extends BaseSyncParserContext {
  constructor() {
    super(...arguments);
    this.mode = "cross";
  }
};

// src/core/cross/index.ts
function crossSerialize(source, options = {}) {
  const ctx = new CrossSyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures,
    refs: options.refs
  });
  const tree = ctx.parse(source);
  const serial = new CrossSerializerContext({
    plugins: options.plugins,
    features: ctx.features,
    scopeId: options.scopeId,
    markedRefs: ctx.marked
  });
  return serial.serializeTop(tree);
}
async function crossSerializeAsync(source, options = {}) {
  const ctx = new CrossAsyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures,
    refs: options.refs
  });
  const tree = await ctx.parse(source);
  const serial = new CrossSerializerContext({
    plugins: options.plugins,
    features: ctx.features,
    scopeId: options.scopeId,
    markedRefs: ctx.marked
  });
  return serial.serializeTop(tree);
}
function toCrossJSON(source, options = {}) {
  const ctx = new CrossSyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures,
    refs: options.refs
  });
  return ctx.parse(source);
}
async function toCrossJSONAsync(source, options = {}) {
  const ctx = new CrossAsyncParserContext({
    plugins: options.plugins,
    disabledFeatures: options.disabledFeatures,
    refs: options.refs
  });
  return ctx.parse(source);
}
function crossSerializeStream(source, options) {
  const ctx = new CrossStreamParserContext({
    plugins: options.plugins,
    refs: options.refs,
    disabledFeatures: options.disabledFeatures,
    onParse(node, initial) {
      const serial = new CrossSerializerContext({
        plugins: options.plugins,
        features: ctx.features,
        scopeId: options.scopeId,
        markedRefs: ctx.marked
      });
      let serialized;
      try {
        serialized = serial.serializeTop(node);
      } catch (err) {
        if (options.onError) {
          options.onError(err);
        }
        return;
      }
      options.onSerialize(
        serialized,
        initial
      );
    },
    onError: options.onError,
    onDone: options.onDone
  });
  ctx.start(source);
  return () => {
    ctx.destroy();
  };
}
function toCrossJSONStream(source, options) {
  const ctx = new CrossStreamParserContext({
    plugins: options.plugins,
    refs: options.refs,
    disabledFeatures: options.disabledFeatures,
    onParse: options.onParse,
    onError: options.onError,
    onDone: options.onDone
  });
  ctx.start(source);
  return () => {
    ctx.destroy();
  };
}
function fromCrossJSON(source, options) {
  const ctx = new CrossDeserializerContext({
    plugins: options.plugins,
    refs: options.refs
  });
  return ctx.deserialize(source);
}

// src/core/Serializer.ts
var Serializer = class {
  constructor(options) {
    this.options = options;
    this.alive = true;
    this.flushed = false;
    this.done = false;
    this.pending = 0;
    this.cleanups = [];
    this.refs = /* @__PURE__ */ new Map();
    this.keys = /* @__PURE__ */ new Set();
    this.ids = 0;
  }
  write(key, value) {
    if (this.alive && !this.flushed) {
      this.pending++;
      this.keys.add(key);
      this.cleanups.push(crossSerializeStream(value, {
        plugins: this.options.plugins,
        scopeId: this.options.scopeId,
        refs: this.refs,
        disabledFeatures: this.options.disabledFeatures,
        onError: this.options.onError,
        onSerialize: (data, initial) => {
          if (this.alive) {
            this.options.onData(
              initial ? this.options.globalIdentifier + '["' + serializeString(key) + '"]=' + data : data
            );
          }
        },
        onDone: () => {
          if (this.alive) {
            this.pending--;
            if (this.pending <= 0 && this.flushed && !this.done && this.options.onDone) {
              this.options.onDone();
              this.done = true;
            }
          }
        }
      }));
    }
  }
  getNextID() {
    while (this.keys.has("" + this.ids)) {
      this.ids++;
    }
    return "" + this.ids;
  }
  push(value) {
    const newID = this.getNextID();
    this.write(newID, value);
    return newID;
  }
  flush() {
    if (this.alive) {
      this.flushed = true;
      if (this.pending <= 0 && !this.done && this.options.onDone) {
        this.options.onDone();
        this.done = true;
      }
    }
  }
  close() {
    if (this.alive) {
      for (let i = 0, len = this.cleanups.length; i < len; i++) {
        this.cleanups[i]();
      }
      if (!this.done && this.options.onDone) {
        this.options.onDone();
        this.done = true;
      }
      this.alive = false;
    }
  }
};

// src/core/plugin.ts
function createPlugin(plugin) {
  return plugin;
}

// src/index.ts
var src_default = serialize;
//# sourceMappingURL=index.cjs.map
