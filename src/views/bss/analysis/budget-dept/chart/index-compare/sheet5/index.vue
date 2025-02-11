<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options"
          @title-click="handleTitleClick"
          @label-click="handleClick"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS5Api from '@/api/sys/analysis/budget-dept-s5'
import Sheet5Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet5-detail'
import CommonUtil from '@/utils/CommonUtil'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '政府性基金预算支出情况（万元）',
        foldFields: ['outTotal', 'outBase', 'outProject'],
        foldFieldsRename: {
          outTotal: '合计',
          outBase: '基本支出',
          outProject: '项目支出'
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
    handleTitleClick() {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }

      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet5Detail queryParams={qp}></Sheet5Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      // let { yearBudget } = data
      let qc = CommonUtil.convertToQc(this.conditions)
      // qc.yearBudget = yearBudget
      let qp = {
        conditions: CommonUtil.convertToC(qc)
      }

      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet5Detail queryParams={qp}></Sheet5Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS5Api.queryByCon(queryParams)
    }
  }
}
</script>
