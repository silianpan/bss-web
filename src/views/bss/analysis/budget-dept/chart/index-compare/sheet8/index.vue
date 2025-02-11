<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          @title-click="handleTitleClick"
          @label-click="handleClick"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet8Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet8-detail'
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS8Api from '@/api/sys/analysis/budget-dept-s8'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '部门支出情况（万元）',
        foldFields: [
          'subtotal',
          'outBase',
          'outProject',
          'superTurnin',
          'causeUnit',
          'subUnitSubsidy'
        ],
        foldFieldsRename: {
          subtotal: '合计',
          outBase: '基本支出',
          outProject: '项目支出',
          superTurnin: '上缴上级支出',
          causeUnit: '事业单位经营支出',
          subUnitSubsidy: '对下级单位补助支出'
        },
        groupField: 'name',
        itemField: 'time',
        fieldMap: {
          time: 'outType',
          name: 'subject',
          value: 'outValue'
        }
      }
    }
  },
  computed: {
    queryParams3() {
      let conditions = Object.assign([], this.conditions || [])
      return { conditions }
    }
  },
  methods: {
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS8Api.queryByCon(queryParams)
    },
    handleTitleClick() {
      let qp = {
        conditions: this.conditions
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet8Detail queryParams={qp}></Sheet8Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let qp = {
        conditions: [
          ...this.conditions,
          { field: 'subject', value: data.subject }
        ]
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet8Detail queryParams={qp}></Sheet8Detail>
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>
