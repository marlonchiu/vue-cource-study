/**
 * @description
 * 函数式组件
 * 只提供数据，不监听状态  没有实例
 * 在被引用时会被处理
 */
export default {
  functional: true,
  props: {
    name: String,
    renderFunc: Function
  },
  render: (h, ctx) => { // 第一个h代表渲染函数  第二个ctx表示当前实例
    return ctx.props.renderFunc(h, ctx.props.name)
  }
}
