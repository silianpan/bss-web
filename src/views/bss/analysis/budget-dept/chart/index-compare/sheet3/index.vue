<template>
  <div>
    <Row :gutter="20" style="margin-bottom: 20px;">
      <i-col :md="24" :lg="24">
        <!-- 支出明细：柱状图 -->
        <FaDetail
          :queryFunc="queryFunc"
          @title-click="handleTitleClick"
          @label-click="handleClick"
          :queryParams="queryParams3"
          :options="options"
          ref="FaDetailRef"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import Sheet3Detail from '@/views/bss/analysis/budget-dept/detail-info/sheet3-detail'
import CommonUtil from '@/utils/CommonUtil'
import IndexCompareMixin from '../sheet1/index-compare-mixin'
import AnalysisBudgetDeptS3Api from '@/api/sys/analysis/budget-dept-s3'
export default {
  mixins: [IndexCompareMixin],
  data() {
    return {
      options: {
        title: '一般公共预算基本支出情况（万元）',
        foldFields: ['subtotal', 'fundPerson', 'fundPublic', 'fundSubsidy'],
        foldFieldsRename: {
          subtotal: '合计',
          fundPerson: '人员经费',
          fundPublic: '公用经费',
          fundSubsidy: '对个人和家庭补助'
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
      return AnalysisBudgetDeptS3Api.queryByCon(queryParams)
    },
    handleTitleClick() {
      let drawer = this.$dynamicDrawer.newInstance(
        {
          title: `详情`,
          width: 80,
          render: h => {
            return <Sheet3Detail queryParams={this.queryParams3}></Sheet3Detail>
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
            return <Sheet3Detail queryParams={qp}></Sheet3Detail>
          }
        },
        this
      )
      drawer.show()
    }
  }
}
</script>
