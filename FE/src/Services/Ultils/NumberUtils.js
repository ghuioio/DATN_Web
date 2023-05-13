import isNumber from "is-number";

export function numberWithCommas(x) {
  if (!isNumber(x)) return null
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function phoneNumberWithSpace(x) {
  if (!x) return null
  const first = x.substr(0, 3)
  const second = x.substr(3, 3)
  const last = x.substr(6)
  return `${first}-${second}-${last}`
}