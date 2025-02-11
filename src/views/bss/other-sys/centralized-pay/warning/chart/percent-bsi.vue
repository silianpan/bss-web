<template>
  <Card shadow>
    <p slot="title" class="analysis-card-title">各经济科目支付占比</p>
    <div class="percent-div">
      <Spin v-if="loading" fix large></Spin>
      <div v-if="$_.isEmpty(list)" class="no-data">暂无数据</div>
      <Row v-else :gutter="8" class="mt-8" justify="start" v-for="(item, index) in list" :key="`${item.bsiName}-${index}`">
        <i-col :xs="24" :sm="24" :md="6" :lg="6">
          <span :class="{ 'click-avalible' : item.percent !== 0 }" style="font-size: 10px; color: #808695" @click="itemClick(item)">{{ item.bsiName }}</span>
        </i-col>
        <i-col :xs="24" :sm="24" :md="18" :lg="18">
          <Progress v-if="item.percent >= overFlag" :percent="100" status="active" stroke-color="#ed4014" :stroke-width="12">
            <span class="animate">≥{{ overFlag }}%</span>
          </Progress>
          <Progress v-else-if="item.percent >= warningFlag && item.percent < overFlag" :percent="Math.floor(item.percent)" status="active" stroke-color="#ff9900" :stroke-width="12" />
          <Progress v-else :percent="Math.floor(item.percent)" stroke-color="#2d8cf0" :stroke-width="12" />
        </i-col>
      </Row>
    </div>
  </Card>
</template>

<script>
import PercentMixin from '../mixin/percent.js'

export default {
  mixins: [PercentMixin],
  data() {
    return {
      type: 'bsi'
    }
  }
}
</script>

<style></style>
