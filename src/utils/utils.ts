export function dataItemIndex<T>(dataLimit, currentPage, index): T {
  if (isFalsy(dataLimit) || isFalsy(currentPage) || isFalsy(index)) return '' as T;
  return (Number(dataLimit) * Number(currentPage) + Number(index)) as T
}

export function isFalsy(value, options?: { zero?: boolean, empty?: boolean }) {
  let res = value == undefined || value == null
  if (options?.zero) res = res || value == 0;
  if (options?.empty) return res = res || !value.length;
  return res;
}
