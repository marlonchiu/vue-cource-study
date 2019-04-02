import Mock from 'mockjs'

const Random = Mock.Random
// export const getUserInfo = (options) => {
//   // console.log(options)
//   return {
//     name: 'Lison'
//   }
// }
// 使用模板
export const getUserInfo = (options) => {
  const template = {
    'str|2-5': 'lison',
    'name|3': 'lison',
    'age|+2': 23,
    'num|0-10': 2,
    'float|2-5.0-2': 4,
    'bool|1': true, // 获得truede概率是1/2
    'bool2|1-9': true, // 获得truede概率是1/10  计算概率min/(min+max)
    'obj1|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: 'dd'
    },
    'obj2|1-4': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
      d: 'dd'
    },
    'arr1|1': ['aa', 'bb', 'cc', 'dd'], // 从属性值 array 中随机选取 1 个元素，作为最终值
    'arr2|+1': ['aa', 'bb', 'cc', 'dd'], // 从属性值 array 中顺序选取 1 个元素，作为最终值
    'arr3|2-4': [1, 2, 5], // 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max
    'arr4|2': ['a', 'b', 'c'], // 通过重复属性值 array 生成一个新数组，重复次数为 count
    'fun': () => {
      return 'this is created by function'
    },
    'reg': /[1-9][A-z]/,
    'email': Random.email(), // => sd.sdf@oksd.com
    'email2': Mock.mock('@email'), // => sd.sdf@oksd.com
    'range': Random.range(2, 11, 2),
    'datetime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
    'date': Random.date('yyyy-MM-dd'),
    'time': Random.time('HH:mm:ss T'),
    'nowtime': Random.now('minute', 'yyyy-MM-dd HH:mm:ss'), // 第一个条件表示截止的单位
    'img': Random.image('400x300', '#ff0000', '#ffffff', 'png', '默认图片'), // 属性依次： 尺寸、背景颜色、文字背景颜色、图片格式、显示文字
    'img_base64': Random.dataImage(),
    'color': Random.rgb(), // Random.color() Random.rgba()
    'text': Random.cparagraph(), // c开头表示中文
    'cword': Random.cword('哈哈哈好好笑的故事你听到了吗', 3, 8), // c开头表示中文
    'cname': Random.cname(),
    'ip': Random.ip(),
    'webemail': Random.email('163.com'), // 参数代表域名
    'regin': Random.region(),
    'city': Random.city(true), // 是否显示该城市的上一级
    'zip': Random.zip(), // 邮编
    /**
     * Random.capitalize( word ) 首字母大写
     * Random.upper( str ) 全部大写
     * Random.lower( str ) 全部小写
     * Random.pick( arr ) 数组中任意抽取元素
     * Random.shuffle( arr ) 把数组顺序打乱
     *  */
    'pick': Random.pick([23, 45, 78]),
    /**
     * Random.guid()
     * Random.id()   // 18位身份证号码
     * Random.increment( step? ) // 全局的索引号
     */
    'guid': Random.guid(),
    'fruit': Random.fruit(),
    'fruit2': '@fruit' // 占位符
  }
  return Mock.mock(template)
  // let i = 3
  // let arr = []
  // while (i--) {
  //   arr.push(template)
  // }
  // return Mock.mock(arr)
}
