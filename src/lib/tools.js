/* 用于与业务无关的工具方法 纯粹是工具方法  */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

// 判断两个对象属性名和值完全相等
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  // 如果两者的key存在不等的情况（arr.some()如果有任何一个不等就返回true）
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}
