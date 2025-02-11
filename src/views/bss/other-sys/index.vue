<!-- 联网监督 -->
<template>
  <div>
    <component :is="currentTabComponent" @change-component="changeComponent">
    </component>
  </div>
</template>

<script>
import SysOption from './sys-option.vue'
import CentralizedPay from './centralized-pay/index.vue'

export default {
  props: {},
  components: {
    SysOption,
    CentralizedPay
  },
  data() {
    return {
      currentTabComponent: 'SysOption'
    }
  },
  methods: {
    changeComponent(data) {
      this.currentTabComponent = data.component
    }
  },
  mounted: function () {},
  computed: {}
}
</script>
