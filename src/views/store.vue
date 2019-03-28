<template>
  <div>
    <a-input v-model="inputValue"></a-input>
    <!-- 两者等价的 -->
    <!-- <a-input :value="inputValue" @input="handleInput"></a-input> -->
    <p>{{inputValue}}</p>
    <a-show :content="inputValue"></a-show>
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
export default {
  name: 'store',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    handleInput(data){
      this.inputValue = data
    }
  },
  components: {
    AInput,
    AShow
  }
}
</script>

