const hop = Object.prototype.hasOwnProperty
const strCharAt = String.prototype.charAt
const toStr = String.prototype.toString

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
 * Returns an array of an object's owned key
 *
 * @name objectKeys
 * @api private
 * @param {*} target
 * @param {Function} pred
 * @return {Array}
 */
function _objectKeys(target: any, pred?: Function) {
  pred = pred || _has
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
