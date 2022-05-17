var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$5 = /* @__PURE__ */ new Map();
class s$3 {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n$5.get(this.cssText);
    return t$2 && e2 === void 0 && (n$5.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$3 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", e$3), i$2 = (e2, n2) => {
  t$2 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$4 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$4 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Eh(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  o() {
    var t2;
    this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$2(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$ES(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$2.toAttribute)(i2, s2.type);
      this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t2);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$2.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$4)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (t3) {
      throw i2 = false, this._$EU(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$EC = void 0), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = globalThis.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e$1, n$3 = `<${o$1}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$3 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.M(h()), this.M(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$1 ? i$1.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.2.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
let AppHeader = class extends s {
  constructor() {
    super(...arguments);
    this.showAppSwitcher = false;
  }
  showHideAppSwitcher() {
    this.showAppSwitcher = !this.showAppSwitcher;
  }
  render() {
    return $`
      <link rel="stylesheet" href="http://localhost:8080/cdnassets/rup-styles.css" />
      <!-- To future investigation: spread attrs operator -> https://github.com/lit/lit/pull/1960 -->
      <header class="rup-global-header">
        <div>
          <slot name="logo"><!-- You may provide here a logo img wrapped by an anchor --></slot>
          <slot name="search-control"><!-- You may provide here your custom search bar --></slot>
          <slot name="app-menu"><!-- You may provide here your custom app menu --></slot>
          <!-- Header controls -->
          <div
            class="rup-global-header__controls"
            role="navigation"
            aria-label="The application's global header controls">
            <slot name="local-controls"><!-- You may provide here your local controls --></slot>
            <!-- Global controls -->
            <div class="rup-global-header__global-controls">
              <!-- TODO: review i18n -->
              <!-- Help icon -->
              <a
                href="https://www.copyright.com/rightfind-resource-center/?filter-product=rightfind-suite-gateway"
                target="_blank"
                title="Help"
                rel="noopener noreferrer"
                class="rup-global-header__global-controls-link">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-help">
                  <path
                    class="primary"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 12a8 8 0 1116 0 8 8 0 01-16 0zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 8a1 1 0 111 1 1 1 0 00-1 1v1a1 1 0 102 0v-.17A3.001 3.001 0 109 10a1 1 0 102 0zm2 5.75a1 1 0 10-2 0V16a1 1 0 102 0v-.25z"></path>
                </svg>
              </a>
              <!-- App switcher -->
              <div class="rup-global-header__app-switcher">
                <button
                  class="rup-global-header__app-switcher-trigger"
                  aria-expanded="false"
                  id="rup-switcher-app"
                  title="App switcher"
                  type="button"
                  @click=${this.showHideAppSwitcher}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-apps" role="img">
                    <path
                      class="primary"
                      d="M7 5a2 2 0 11-4 0 2 2 0 014 0zM21 5a2 2 0 11-4 0 2 2 0 014 0zM12 7a2 2 0 100-4 2 2 0 000 4zM7 12a2 2 0 11-4 0 2 2 0 014 0zM19 14a2 2 0 100-4 2 2 0 000 4zM14 12a2 2 0 11-4 0 2 2 0 014 0zM5 21a2 2 0 100-4 2 2 0 000 4zM21 19a2 2 0 11-4 0 2 2 0 014 0zM12 21a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
                <nav
                  class="rup-global-header__app-switcher-options ${this.showAppSwitcher ? "" : "visuallyhidden"}"
                  aria-labelledby="rup-switcher-app"
                  aria-describedby="rup-gc-switcher-desc"
                  aria-label="CCC Applications">
                  <p class="rup-visually-hidden" id="rup-gc-switcher-desc">
                    This shows the CCC Applications that you have access to. They will open in a new Tab.
                  </p>
                  <div>
                    <span class="rup-global-header__app-switcher-options-label">Ember APP</span>
                    <ul>
                      <li>
                        <a
                          href="http://localhost:8080/ember"
                          title="Open RightFind Navigate in a new tab"
                          target="_blank"
                          rel="noopener noreferrer">
                          <svg
                            class="rightfind-navigate"
                            width="88"
                            height="40"
                            viewBox="0 0 88 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img">
                            <path
                              d="M0 .99v13.861h2.494V9.188h.886l4.023 5.663h3.098l-4.365-5.9c1.65-.456 3.218-1.644 3.218-3.882C9.354 2.12 6.578.99 4.345.99H0zm3.883 6.1H2.494v-4h1.79c1.45 0 2.435.811 2.435 2.039 0 1.386-1.207 1.96-2.836 1.96zm8.489-2.437v10.198h2.434V4.653h-2.434zm0-3.9V2.99h2.434V.752h-2.434zM22.38 19.327c1.93 0 3.701-.654 4.626-2.317.403-.713.624-1.604.624-2.693V4.653h-2.233l-.12 1.169c-.785-.97-2.093-1.406-3.2-1.406-2.976 0-5.008 2.416-5.008 5.188 0 2.95 2.132 5.248 4.948 5.248 1.107 0 2.415-.416 3.159-1.426v1.148c0 1.862-1.267 2.654-2.857 2.654-1.146 0-2.635-.456-3.721-1.268l-.906 1.98c1.368.931 3.098 1.387 4.688 1.387zm.1-6.575c-1.79 0-2.937-1.445-2.937-3.089 0-1.544.966-3.148 2.998-3.148.945 0 1.93.396 2.635 1.287v3.386c-.584 1.09-1.71 1.564-2.696 1.564zM30.524 0v14.851h2.434V8.08c.604-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.402 1.584.402 2.436v5.128h2.434V9.546c0-1.486-.161-2.832-.926-3.822-.643-.812-1.609-1.307-2.856-1.307a3.933 3.933 0 00-3.199 1.624V0h-2.434zM46.14 15.07c.765 0 1.65-.199 2.253-.535l-.724-1.822a2.39 2.39 0 01-1.146.277c-.745 0-1.006-.396-1.107-1.188-.04-.317-.04-.614-.04-.91v-4.22h2.736v-2.02h-2.736V2.317h-2.193l-.261 2.336h-1.288v2.02h1.288v4.575c0 .673.06 1.346.261 1.88.423 1.169 1.408 1.941 2.957 1.941zM50.547.99v13.861h2.495V9.11h5.029v-2.1h-5.03V3.09h5.03V.99h-7.524zm9.857 3.663v10.198h2.435V4.653h-2.434zm0-3.9V2.99h2.435V.752h-2.434zm5.462 3.9v10.198H68.3V8.08c.603-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.401 1.584.401 2.436v5.128h2.434V9.546c0-1.486-.16-2.812-.925-3.822-.623-.832-1.61-1.307-2.856-1.307-1.248 0-2.475.574-3.3 1.742l-.12-1.505h-2.213zM82.407 15.09c1.147 0 2.495-.437 3.24-1.545l.12 1.306H88V0h-2.454v5.703c-.805-.871-2.032-1.287-3.098-1.287-2.977 0-5.01 2.515-5.01 5.307 0 2.97 2.113 5.366 4.97 5.366zm.463-2.1c-1.83 0-2.957-1.545-2.957-3.208 0-1.564.966-3.267 2.998-3.267.945 0 1.93.396 2.635 1.287v3.604c-.584 1.109-1.71 1.584-2.676 1.584zM11.286 35.644V21.782H9.877v11.149L1.47 21.782H.362v13.862H1.77v-11.13l8.389 11.13h1.127zm9.897 0h1.227v-5.901c0-2.495-.905-4-3.822-4-1.287 0-2.816.435-3.721.851l.462 1.208c.765-.416 2.052-.832 3.199-.832 1.71 0 2.515.891 2.515 2.495V30c-.886-.218-1.57-.297-2.233-.297-2.092 0-4.346.93-4.346 3.307 0 1.822 1.59 2.871 3.4 2.871 1.127 0 2.273-.356 3.219-1.366l.1 1.129zm-.14-4.555v2.238c-.926.871-2.012 1.445-3.139 1.445-1.146 0-2.072-.752-2.072-1.92 0-1.505 1.57-2.04 2.917-2.04.704 0 1.449.08 2.294.277zm6.762 4.555h1.69l3.662-9.664h-1.469l-2.957 8.178-2.776-8.178h-1.489l3.34 9.664zm8.79 0V25.98h-1.368v9.664h1.368zm0-11.822V21.96h-1.368v1.862h1.368zm12.311 2.158h-1.368v.95c-.845-.772-2.031-1.187-3.138-1.187-2.877 0-5.05 2.356-5.05 4.99 0 2.633 2.153 4.91 5.03 4.91 1.207 0 2.414-.514 3.158-1.485v1.347c0 2.376-1.75 3.267-3.6 3.267-1.409 0-2.857-.594-3.722-1.267l-.563 1.129C40.88 39.446 42.449 40 43.958 40c2.615 0 4.948-1.505 4.948-4.91v-9.11zm-1.368 6.614c-.563 1.129-1.91 1.822-3.118 1.822-2.152 0-3.661-1.802-3.661-3.762 0-1.941 1.529-3.684 3.661-3.684 1.127 0 2.394.594 3.118 1.525v4.1zm10.892 3.05h1.228v-5.901c0-2.495-.905-4-3.822-4-1.288 0-2.816.435-3.722.851l.463 1.208c.764-.416 2.052-.832 3.199-.832 1.71 0 2.514.891 2.514 2.495V30c-.885-.218-1.57-.297-2.233-.297-2.092 0-4.345.93-4.345 3.307 0 1.822 1.59 2.871 3.4 2.871 1.126 0 2.273-.356 3.218-1.366l.1 1.129zm-.14-4.555v2.238c-.925.871-2.012 1.445-3.138 1.445-1.147 0-2.072-.752-2.072-1.92 0-1.505 1.569-2.04 2.917-2.04.704 0 1.448.08 2.293.277zm9.318-3.881V25.98H64.75v-2.416h-1.368v2.416h-1.388v1.228h1.388v5.485c0 2 .946 3.129 2.857 3.129a3.35 3.35 0 001.569-.416l-.342-1.07c-.443.159-.845.258-1.207.258-.905 0-1.509-.317-1.509-2.06v-5.326h2.857zm10.559 3.94c.02-.178.06-.574.06-.89 0-2.397-1.83-4.515-4.365-4.515-2.675 0-4.808 2.158-4.808 5.01 0 2.831 1.75 5.128 4.97 5.128 1.488 0 3.198-.752 3.982-2.198l-.965-.614c-.704 1.307-1.81 1.664-3.118 1.664-2.133 0-3.38-1.723-3.5-3.584h7.744zM76.88 30h-6.417c.281-1.802 1.508-3.109 3.4-3.109 1.669 0 2.936 1.485 3.017 3.109z"
                              fill="#00326E"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://localhost:8080/react"
                          title="Open RightFind Navigate in a new tab"
                          target="_blank"
                          rel="noopener noreferrer">
                          <svg
                            class="rightfind-navigate"
                            width="88"
                            height="40"
                            viewBox="0 0 88 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img">
                            <path
                              d="M0 .99v13.861h2.494V9.188h.886l4.023 5.663h3.098l-4.365-5.9c1.65-.456 3.218-1.644 3.218-3.882C9.354 2.12 6.578.99 4.345.99H0zm3.883 6.1H2.494v-4h1.79c1.45 0 2.435.811 2.435 2.039 0 1.386-1.207 1.96-2.836 1.96zm8.489-2.437v10.198h2.434V4.653h-2.434zm0-3.9V2.99h2.434V.752h-2.434zM22.38 19.327c1.93 0 3.701-.654 4.626-2.317.403-.713.624-1.604.624-2.693V4.653h-2.233l-.12 1.169c-.785-.97-2.093-1.406-3.2-1.406-2.976 0-5.008 2.416-5.008 5.188 0 2.95 2.132 5.248 4.948 5.248 1.107 0 2.415-.416 3.159-1.426v1.148c0 1.862-1.267 2.654-2.857 2.654-1.146 0-2.635-.456-3.721-1.268l-.906 1.98c1.368.931 3.098 1.387 4.688 1.387zm.1-6.575c-1.79 0-2.937-1.445-2.937-3.089 0-1.544.966-3.148 2.998-3.148.945 0 1.93.396 2.635 1.287v3.386c-.584 1.09-1.71 1.564-2.696 1.564zM30.524 0v14.851h2.434V8.08c.604-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.402 1.584.402 2.436v5.128h2.434V9.546c0-1.486-.161-2.832-.926-3.822-.643-.812-1.609-1.307-2.856-1.307a3.933 3.933 0 00-3.199 1.624V0h-2.434zM46.14 15.07c.765 0 1.65-.199 2.253-.535l-.724-1.822a2.39 2.39 0 01-1.146.277c-.745 0-1.006-.396-1.107-1.188-.04-.317-.04-.614-.04-.91v-4.22h2.736v-2.02h-2.736V2.317h-2.193l-.261 2.336h-1.288v2.02h1.288v4.575c0 .673.06 1.346.261 1.88.423 1.169 1.408 1.941 2.957 1.941zM50.547.99v13.861h2.495V9.11h5.029v-2.1h-5.03V3.09h5.03V.99h-7.524zm9.857 3.663v10.198h2.435V4.653h-2.434zm0-3.9V2.99h2.435V.752h-2.434zm5.462 3.9v10.198H68.3V8.08c.603-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.401 1.584.401 2.436v5.128h2.434V9.546c0-1.486-.16-2.812-.925-3.822-.623-.832-1.61-1.307-2.856-1.307-1.248 0-2.475.574-3.3 1.742l-.12-1.505h-2.213zM82.407 15.09c1.147 0 2.495-.437 3.24-1.545l.12 1.306H88V0h-2.454v5.703c-.805-.871-2.032-1.287-3.098-1.287-2.977 0-5.01 2.515-5.01 5.307 0 2.97 2.113 5.366 4.97 5.366zm.463-2.1c-1.83 0-2.957-1.545-2.957-3.208 0-1.564.966-3.267 2.998-3.267.945 0 1.93.396 2.635 1.287v3.604c-.584 1.109-1.71 1.584-2.676 1.584zM11.286 35.644V21.782H9.877v11.149L1.47 21.782H.362v13.862H1.77v-11.13l8.389 11.13h1.127zm9.897 0h1.227v-5.901c0-2.495-.905-4-3.822-4-1.287 0-2.816.435-3.721.851l.462 1.208c.765-.416 2.052-.832 3.199-.832 1.71 0 2.515.891 2.515 2.495V30c-.886-.218-1.57-.297-2.233-.297-2.092 0-4.346.93-4.346 3.307 0 1.822 1.59 2.871 3.4 2.871 1.127 0 2.273-.356 3.219-1.366l.1 1.129zm-.14-4.555v2.238c-.926.871-2.012 1.445-3.139 1.445-1.146 0-2.072-.752-2.072-1.92 0-1.505 1.57-2.04 2.917-2.04.704 0 1.449.08 2.294.277zm6.762 4.555h1.69l3.662-9.664h-1.469l-2.957 8.178-2.776-8.178h-1.489l3.34 9.664zm8.79 0V25.98h-1.368v9.664h1.368zm0-11.822V21.96h-1.368v1.862h1.368zm12.311 2.158h-1.368v.95c-.845-.772-2.031-1.187-3.138-1.187-2.877 0-5.05 2.356-5.05 4.99 0 2.633 2.153 4.91 5.03 4.91 1.207 0 2.414-.514 3.158-1.485v1.347c0 2.376-1.75 3.267-3.6 3.267-1.409 0-2.857-.594-3.722-1.267l-.563 1.129C40.88 39.446 42.449 40 43.958 40c2.615 0 4.948-1.505 4.948-4.91v-9.11zm-1.368 6.614c-.563 1.129-1.91 1.822-3.118 1.822-2.152 0-3.661-1.802-3.661-3.762 0-1.941 1.529-3.684 3.661-3.684 1.127 0 2.394.594 3.118 1.525v4.1zm10.892 3.05h1.228v-5.901c0-2.495-.905-4-3.822-4-1.288 0-2.816.435-3.722.851l.463 1.208c.764-.416 2.052-.832 3.199-.832 1.71 0 2.514.891 2.514 2.495V30c-.885-.218-1.57-.297-2.233-.297-2.092 0-4.345.93-4.345 3.307 0 1.822 1.59 2.871 3.4 2.871 1.126 0 2.273-.356 3.218-1.366l.1 1.129zm-.14-4.555v2.238c-.925.871-2.012 1.445-3.138 1.445-1.147 0-2.072-.752-2.072-1.92 0-1.505 1.569-2.04 2.917-2.04.704 0 1.448.08 2.293.277zm9.318-3.881V25.98H64.75v-2.416h-1.368v2.416h-1.388v1.228h1.388v5.485c0 2 .946 3.129 2.857 3.129a3.35 3.35 0 001.569-.416l-.342-1.07c-.443.159-.845.258-1.207.258-.905 0-1.509-.317-1.509-2.06v-5.326h2.857zm10.559 3.94c.02-.178.06-.574.06-.89 0-2.397-1.83-4.515-4.365-4.515-2.675 0-4.808 2.158-4.808 5.01 0 2.831 1.75 5.128 4.97 5.128 1.488 0 3.198-.752 3.982-2.198l-.965-.614c-.704 1.307-1.81 1.664-3.118 1.664-2.133 0-3.38-1.723-3.5-3.584h7.744zM76.88 30h-6.417c.281-1.802 1.508-3.109 3.4-3.109 1.669 0 2.936 1.485 3.017 3.109z"
                              fill="#00326E"></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <slot name="user-menu"><!-- You may provide here your user menu --></slot>
          </div>
        </div>
      </header>
    `;
  }
};
__decorateClass([
  t()
], AppHeader.prototype, "showAppSwitcher", 2);
AppHeader = __decorateClass([
  n$1("app-header")
], AppHeader);
export { AppHeader };
