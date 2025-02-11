<template>
  <div>
    <div class="outBlock">
      <div class="outBlockItem" @click="pushTo('CentralizedPay')">
        <div class="outBlockIcon iconfont icon-rfq"></div>
        <div class="outBlockItemText">财政国库集中⽀付系统入口</div>
      </div>
      <div class="outBlockItem">
        <div class="outBlockIcon iconfont icon-templatedefault"></div>
        <div class="outBlockItemText">预算执行管理系统入口</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {
    pushTo(component) {
      this.$emit('change-component', {
        component
      })
    }
  },
  mounted: function () {},
  computed: {}
}
</script>
