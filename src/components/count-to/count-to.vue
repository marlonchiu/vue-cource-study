<template>
  <div>
    <span :id="eleId"></span>
  </div>
</template>
<script>
// 旧的countup 用法  引入 import CountUp from 'countup' 版本1.8.2
// import CountUp from 'countup'

// 最新的countup.js 用法  引入 import CountUp from 'countup' 版本2.0.4
import { CountUp } from 'countup.js'
export default {
  name: 'countTo',
  computed: {
    eleId () {
      return `count_up_${this._uid}` // 每个组件会有一个唯一的uid值作区分
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
        decimalPlaces: this.decimalPlaces
      }
      // 旧的countup 用法  引入 import CountUp from 'countup'
      /**
       * @description配置说明
       *   参数一: 数字所在容器
       *   参数二: 数字开始增长前的默认值(起始值),一般从 0 开始增长
       *   参数三: 数字增长后的最终值,该值一般通过异步请求获取
       *   参数四: 数字小数点后保留的位数
       *   参数五: 数字增长特效的时间,默认为2秒
       *   参数六: 其他配置项
       *          注: 参数六也可不加,其配置项则为默认值
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
      }, this.delay)
    })
  }
}
</script>
