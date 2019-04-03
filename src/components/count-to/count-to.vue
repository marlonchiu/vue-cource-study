<template>
  <div>
    <slot name="left"></slot>
    <span :id="eleId" :class="countClass" ref="number"></span>
    <slot name="right"></slot>
  </div>
</template>
<script>
// 旧的countup 用法  引入 import CountUp from 'countup' 版本1.8.2
// import CountUp from 'countup'

// 最新的countup.js 用法  引入 import CountUp from 'countup' 版本2.0.4
import { CountUp } from 'countup.js'

// 样式引入方法一
// import './count-to.less'

export default {
  name: 'countTo',
  computed: {
    eleId () {
      return `count_up_${this._uid}` // 每个组件会有一个唯一的uid值作区分
    },
    countClass () {
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  props: {
    /**
     * @description 动画延迟效果执行延迟时间
     */
    delay: {
      type: Number,
      default: 0 // 单位mm
    },
    /**
     * @description 最终值
     */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * @description 起始值
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 渐变的时长
     */
    duration: {
      type: Number,
      default: 2
    },
    /**
     * @description 是否使用变速效果
     */
    useEasing: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否使用分组效果
     */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * @description 分组的分割符 separator (',')
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 整数与小数分隔符 separator ('.')
     */
    decimal: {
      type: String,
      default: '.'
    },
    /**
     * @description 小数点位数
     */
    decimalPlaces: {
      type: Number,
      default: 0
    },
    /**
     * @description 小数点位数
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 字首(数字的前缀,根据需要可设为 $,¥,￥ 等)
     */
    prefix: {
      type: String,
      default: ''
    },
    /**
     * @description 后缀(数字的后缀 ,根据需要可设为 元,个,美元 等)
     */
    suffix: {
      type: String,
      default: ''
    },
    /**
     * @description 自定义组件的类名
     */
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      counter: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      let options = {
        startVal: this.startVal,
        duration: this.duration,
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal,
        decimalPlaces: this.decimalPlaces,
        prefix: this.prefix,
        suffix: this.suffix
      }
      // 旧的countup 用法  引入 import CountUp from 'countup'
      /**
       * @description配置说明
       *   target    参数一: 数字所在容器
       *   startVal  参数二: 数字开始增长前的默认值(起始值),一般从 0 开始增长
       *   endVal    参数三: 数字增长后的最终值,该值一般通过异步请求获取
       *   decimals  参数四: 数字小数点后保留的位数
       *   duration  参数五: 数字增长特效的时间,默认为2秒
       *   options?  参数六: 其他配置项
       *             注: 参数六也可不加,其配置项则为默认值
       */

      // this.conuter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
      //   useEasing: this.useEasing,
      //   useGrouping: this.useGrouping,
      //   separator: this.separator,
      //   decimal: this.decimal
      // })

      this.conuter = new CountUp(this.eleId, this.endVal, options)
      setTimeout(() => {
        this.conuter.start()
        // 动画执行完事件
        this.emitEndEvent()
      }, this.delay)
    })
  },
  methods: {
    getCount () {
      // console.log(this.$refs.number.innerText)
      return this.$refs.number.innerText
    },
    emitEndEvent () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit('on-animation-end', Number(this.getCount()))
        })
      }, this.duration * 1000 + 5) // 动画执行有延迟 否则数据不一致
    }
  },
  watch: {
    endVal (newVal, oldVal) {
      this.conuter.update(newVal)
      // 动画执行完事件
      this.emitEndEvent()
    }
  }
}
</script>
<style lang="less">
  // 样式引入方法二
  @import './count-to.less';
</style>
