<template>
  <div class="card-block">
    <Row>
      <i-col span="12">col-8</i-col>
      <i-col span="12">col-8</i-col>
    </Row>
    <br>
    <Row :gutter="10">
      <!-- 红色属于编辑器报错  可以使用i-col  -->
      <Col span="8">col-8</Col>
      <Col span="8">col-8</Col>
      <Col span="8">col-8</Col>
    </Row>
    <br>
    <Row :gutter="10">
      <i-col span="4" :offset="2"></i-col>
      <i-col span="4" :offset="4"></i-col>
      <i-col span="4"></i-col>
    </Row>
    <br>
    <!-- 格栅组件实现响应式布局 -->
    <Row :gutter="10" class="pink">
      <i-col :xxl="6" :xl="12"></i-col>
      <i-col :xxl="6" :xl="12"></i-col>
      <i-col :xxl="6" :xl="12"></i-col>
      <i-col :xxl="6" :xl="12"></i-col>
    </Row>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
.card-block{
  .ivu-col{
    background: #4CB7ED;
    height: 50px;
    background-clip: content-box;
  }
}
.pink{
  .ivu-col{
    margin-top: 10px;
    background: pink;
    background-clip: content-box;
  }
}
</style>
