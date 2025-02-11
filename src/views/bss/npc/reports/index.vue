<!-- 统计分析 -->
<template>
  <List size="large" style="height:100%;overflow-y:auto">
    <ListItem style="display:block!important;padding:16px 20px">
      <Row :gutter="20">
        <i-col
          :xs="12"
          :md="8"
          :lg="8"
          v-for="(infor, i) in inforCardData"
          :key="`infor-${i}`"
          style="height: 120px;padding-bottom: 10px;"
        >
          <info-card
            shadow
            :color="infor.color"
            :icon="infor.icon"
            :icon-size="36"
          >
            <count-to
              slot="content"
              :end="infor.count"
              count-class="count-style"
            />
            <p slot="title">{{ infor.title }}</p>
          </info-card>
        </i-col>
      </Row>
    </ListItem>
    <ListItem>
      <budget-type></budget-type>
    </ListItem>
    <ListItem>
      <npc-advice></npc-advice>
    </ListItem>
    <ListItem>
      <npc-advice-feedback></npc-advice-feedback>
    </ListItem>
  </List>
</template>

<script>
import InfoCard from '_c/info-card'
import CountTo from '_c/count-to'
import BudgetType from './budget-type'
import NpcAdvice from './npc-advice'
import NpcAdviceFeedback from './npc-advice-feedback'
import GovBudgetService from '@/api/sys/budget/gov-budget'
export default {
  components: {
    InfoCard,
    CountTo,
    BudgetType,
    NpcAdvice,
    NpcAdviceFeedback
  },
  data() {
    return {
      inforCardData: [
        {
          title: '本年度预决算报告总数',
          count: 0,
          color: '#f9906f'
        },
        {
          title: '代表意见总数',
          count: 0,
          color: '#7bcfa6'
        },
        {
          title: '责任单位反馈意见总数',
          count: 0,
          color: '#4c8dae'
        }
      ]
    }
  },
  methods: {
    analysisBudgetCount() {
      GovBudgetService.analysisBudgetCount({
        areaId: this.$route.query.areaId
      }).then(res => {
        if (res.ok()) {
          this.inforCardData[0].count = res.data.budgetCount
          this.inforCardData[1].count = res.data.npcAdvicesCount
          this.inforCardData[2].count = res.data.npcAdvicesFeedbackCount
        }
      })
    }
  },
  mounted() {
    this.analysisBudgetCount()
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
  color: #fff;
}
</style>
