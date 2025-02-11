<template>
  <div class="wrapperMain">
    <div class="containerWrapper">
      <div style="margin: 8px 24px">
        <Tabs value="index-compare">
          <TabPane label="结构分析" name="index-compare">
            <IndexCompare :query="query" />
          </TabPane>
          <TabPane label="占比趋势分析" name="year-compare">
            <YearCompare :query="query" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import IndexCompare from './index-compare'
import YearCompare from './year-compare'
export default {
  components: {
    IndexCompare,
    YearCompare
  },
  data() {
    return {
      query: {}
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.query = this.$route.query
    }
  },
  watch: {
    $route: 'init'
  }
}
</script>
