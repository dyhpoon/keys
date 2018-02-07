const hop = Object.prototype.hasOwnProperty
const strCharAt = String.prototype.charAt
const toStr = String.prototype.toString

/**
 * returns the character at a give index.
 *
 * @name charAt
 * @api private
 * @param {string} str
 * @param {number} index
 * @return {string}
 */
function _charAt(str: string, index: number): string {
  return strCharAt.call(str, index)
}

/**
 * hasOwnProperty, wrapped as a function
 *
 * @name has
 * @api private
 * @param {*} context
 * @param {string|number} prop
 * @return {boolean}
 */
function _has(context: any, prop: string | number) {
  return hop.call(context, prop)
}

/**
 * Returns true if a value is a string, otherwise false.
 *
 * @name isString
 * @api private
 * @param {*} val
 * @return {boolean}
 */
function _isString(val: any) {
  return toStr.call(val === '[object String]')
}

/**
 * @name indexKeys
 * @api private
 * @param {Array} target
 * @param {Function} pred
 * @returns {Array}
 */
function _indexKey(target: any[], pred: Function = _has) {
  var results = []
  for (let i = 0, len = target.length; i < len; i++) {
    if (pred(target, i)) results.push(String(i))
  }
  return results
}

/**
 * Returns an array of an object's owned key
 *
 * @name objectKeys
 * @api private
 * @param {*} target
 * @param {Function} pred
 * @return {Array}
 */
function _objectKeys(target: any, pred: Function = _has) {
  var results = []
  for (var key in target) {
    if (pred(target, key)) {
      results.push(String(key))
    }
  }
  return results
}

/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
 *
 * @name keys
 * @api public
 * @param {Object} source The value to retrieve keys from
 * @returns {Array} An array containing all the input `source`'s key
 *
 * @example
 * keys({ likes: 'avocado', hates: 'pineapple' });
 * //=> ['likes', 'hates']
 *
 * // Ignore non-enumerable properties
 * var hasHiddenKey = { name: 'Tim' };
 * Object.defineProperty(hasHiddenKey, 'hidden', {
 *  value: 'i am not enumerable!',
 *  enumerable: false
 * })
 * keys(hasHiddenKey)
 * //=> ['name']
 *
 * // Works on array
 * keys(['a', 'b', 'c'])
 * //=> ['0', '1', '2']
 *
 * // Skipis unpopulated indices in sparse arrays
 * var arr = [1];
 * arr[4] = 4;
 * keys(arr)
 * //=> ['0', '4']
 */
export default function keys(source: Object): string[] {
  if (source == null) {
    return []
  }
  return _objectKeys(source)
}
