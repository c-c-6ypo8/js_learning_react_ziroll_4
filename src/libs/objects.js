export const getObjectKeyByValue = (obj, value) => {
  return Object.keys(obj).find((k) => obj[k] === value)
}
