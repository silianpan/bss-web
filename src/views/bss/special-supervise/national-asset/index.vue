<!-- 政府国有资产管理监督 -->
<template>
  <div>
    <Tabs>
      <TabPane
        v-for="(item, index) in tabOptions"
        :key="index"
        :label="item.label"
        :name="item.label"
      >
        <div>
          <div class="outBlock">
            <div class="outBlockItem">
              <div class="outBlockIcon iconfont icon-rfq"></div>
              <div class="outBlockItemText">{{ `${item.label}数据接口接入配置` }}</div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      tabOptions: [
        {
          label: '自然资源'
        },
        {
          label: '国有企业'
        },
        {
          label: '国有金融企业'
        },
        {
          label: '行政事业单位国有资产'
        }
      ]
    }
  },
  methods: {},
  mounted: function() {},
  computed: {}
}
</script>
