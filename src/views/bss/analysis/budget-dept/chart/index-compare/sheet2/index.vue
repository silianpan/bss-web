<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          @title-click="handleTitleClick"
          @label-click="handleClick"
          :queryFunc="queryFunc"
          :queryParams="queryParams3"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet2Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet2-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS2Api from '@/api/sys/analysis/budget-dept-s2'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算支出情况（万元）',
        foldFields: ['subtotal', 'outBase', 'outProject'],
        foldFieldsRename: {
          subtotal: '小计',
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
            return <Sheet2Detail queryParams={qp}></Sheet2Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async handleClick(data) {
      let qc = CommonUtil.convertToQc(this.conditions)
      let qp = {
        conditions: [
          ...CommonUtil.convertToC(qc),
          { field: 'subject', value: data.subject }
        ]
      }
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet2Detail queryParams={qp}></Sheet2Detail>
          }
        },
        this
      )
      drawer.show()
    },
    async queryFunc(queryParams) {
      return AnalysisBudgetDeptS2Api.queryByCon(queryParams)
    }
  }
}
</script>
