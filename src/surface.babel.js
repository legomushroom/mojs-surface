import { Html } from 'mojs-html';
import { extendClass, createClass } from 'mojs-util-class-proto';

/* -------------------- */
/* The `Surface` class  */
/* -------------------- */

// It extends `Html` module, create an HTMLElement and adds it to the DOM,
// after that it passes the newely create element to `el` option of the
// Html module and declares `width`/`height` defaults.
// Thus it cretes a `Surface` that is controlled by `Html` module.

const SurfaceClass = extendClass(Html);
const Super = Html.__mojsClass;

/**
 * `init` - function init the class.
 *
 * @public
 * @extends @Html
 */
SurfaceClass.init = function (o = {}) {
  // create an Html element
  this._createElement();
  // add element and custom properties definition to the options
  o.el = this.el;
  o.customProperties = Object.assign({}, o.customProperties, {
    width: { type: 'unit' },
    height: { type: 'unit' },
  });

  // super call on HTML
  Super.init.call(this, o);
  // add element to DOM - we have `_props` available now
  this._props.parent.appendChild(this.el);
};

/**
 * `_createElement` - function to create `Html` element.
 */
SurfaceClass._createElement = function () {
  this.el = document.createElement('div');
};

/**
 * `_declareDefaults` - Method to declare `_defaults`.
 *
 * @private
 * @overrides @ ClassProto
 */
SurfaceClass._declareDefaults = function () {
  // super call
  Super._declareDefaults.call(this);
  // save html related defaults
  this._htmlDefaults = Object.assign({}, this._defaults);
  // declare surface defaults
  this._defaults = Object.assign({}, this._htmlDefaults, {
    // add surface properties
    parent: document.body,
    // `width` of the surface, fallbacks to `size`
    width: 100,
    // `height` of the surface, fallbacks to `size`
    height: 100,
  });
};

export const Surface = createClass(SurfaceClass);

export default Surface;
