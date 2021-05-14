const toCamelCase = (str: string) => {
  str = str.charAt(0).toLowerCase() + str.slice(1)
  return str.replace(/[-_](.)/g, (_match, group1) => {
    return group1.toUpperCase()
  })
}

const toCamelCaseObject = <T>(object: { [key: string]: any }) => {
  let newObj: { [key: string]: any } = {}
  Object.keys(object).forEach((key) => {
    newObj[toCamelCase(key)] = object[key]
  })
  return newObj as T
}

const toCamelCaseObjectArray = <T>(arr: { [key: string]: any }[]) => {
  return arr.map((obj) => toCamelCaseObject<T>(obj))
}

export const Utils = {
  toCamelCaseObject,
  toCamelCaseObjectArray,
}
