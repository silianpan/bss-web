<template>
  <div>
    <div class="functionBar bottomLine">
      <div class="functionBarMain">
        <div class="leftGroup">
          <div class="formLabel">
            <Button @click="back" icon="ios-arrow-back">返回</Button>
          </div>
        </div>
        <div class="rightGroup">
          <div class="formLabel">
            <Select v-model="conForm.year" style="width:100px" transfer clearable placeholder="年度" @on-change="yearChange">
              <Option v-for="(item, index) in yearOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <Select v-model="conForm.month" style="width:100px" transfer clearable placeholder="月份" @on-change="monthChange">
              <Option v-for="(item, index) in 12" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <AreaSelect :pid="areaInfo.id" v-model="conForm.region" style="width:130px" placeholder="区县" @on-change="regionChange"></AreaSelect>
          </div>
          <div class="formLabel">
            <Select v-model="conForm.dept" style="width:200px" transfer clearable filterable placeholder="部门（可搜索）" @on-change="deptChange">
              <Option v-for="(item, index) in deptOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <i-input v-model="conForm.searchVal" placeholder="输入收款账户" style="width:200px" class="searchCriminal" search @on-search="search"></i-input>
          </div>
          <div class="formLabel">
            <i-input v-model="conForm.bsName" placeholder="输入功能科目" style="width:200px" class="searchCriminal" search @on-search="search"></i-input>
          </div>
          <div class="formLabel">
            <i-input v-model="conForm.bsiName" placeholder="输入经济科目" style="width:200px" class="searchCriminal" search @on-search="search"></i-input>
          </div>
        </div>
      </div>
    </div>
    <div class="container i-scrollbar-hide" style="position: relative; height: calc(100vh - 330px); overflow-y: auto">
      <Spin fix v-if="spinFlag" size="large"></Spin>
      <div v-else class="tableContainer">
        <Table :columns="columns" :data="data"></Table>
      </div>
    </div>
    <div class="pageContainer" style="position">
      <Page :total="page.totalRecords" :current="page.pageNum" show-total show-sizer show-elevator :page-size="page.pageSize" @on-change="listChangePage" @on-page-size-change="listChangePageSize" />
    </div>
  </div>
</template>

<script>
import MenuPageMixin from '../mixin/menu-page'
import Api from '@/api/sysPay/pay/pay.js'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import Detail from './detail.vue'
import PlanList from '../payment-plan/plan-list.vue'

export default {
  mixins: [MenuPageMixin],
  data() {
    return {
      columns: [
        {
          title: '支付凭证号',
          key: 'billNo',
          width: 170,
          render: (h, params) => {
            let row = params.row
            return <span>{row.billNo || '未支付'}</span>
          }
        },
        {
          title: '单位',
          key: 'enName'
        },
        {
          title: '功能科目',
          key: 'bsName'
        },
        {
          title: '经济科目',
          key: 'bsiName'
        },
        {
          title: '支付时间',
          key: 'payDate',
          render: (h, { row }) => {
            return h('span', row.payDate || '-')
          }
        },
        {
          title: '支付金额（元）',
          key: 'payMoney',
          render: (h, params) => {
            let row = params.row
            return (
              <Tooltip
                placement="right"
                transfer
                content={`支付时间：${row.payDate || '-'}`}
              >
                {row.payMoney}
              </Tooltip>
            )
          }
        },
        {
          title: '收款账户',
          key: 'payeeAccountName'
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return (
              <ButtonGroup>
                <Tooltip placement="top" transfer content="详情">
                  <Button
                    type="primary"
                    icon="md-list"
                    onClick={() => {
                      this.showRowDetail(params.row)
                    }}
                  ></Button>
                </Tooltip>
                <Tooltip placement="top" transfer content="关联计划">
                  <Button
                    type="info"
                    icon="ios-link"
                    onClick={() => {
                      this.showPlan(params.row)
                    }}
                  ></Button>
                </Tooltip>
              </ButtonGroup>
            )
          }
        }
      ]
    }
  },
  methods: {
    getApi() {
      return Api
    },
    queryData() {
      this.spinFlag = true
      let param = {
        conditions: [
          { field: 'payee_account_name', value: this.conForm.searchVal },
          { field: 'bsName', value: this.conForm.bsName },
          { field: 'bsiName', value: this.conForm.bsiName },
          { field: 'year', value: this.conForm.year },
          { field: 'month', value: this.conForm.month },
          { field: 'region', value: this.conForm.region },
          { field: 'dept', value: this.conForm.dept }
        ],
        current: this.page.pageNum,
        size: this.page.pageSize
      }
      Api.pageInfo(param).then((res) => {
        if (res.ok()) {
          this.data = res.data.records || []
          this.page.totalRecords = res.data.total
        }
        this.spinFlag = false
      })
    },
    showRowDetail(row) {
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `支付明细详情`,
          width: 1000,
          maskClosable: false,
          components: { Detail },
          render: (h) => {
            return <detail data={row}></detail>
          }
        },
        this
      )
      drawer.show()
    },
    showPlan(row) {
      let queryParams = {
        toctrlid: row.fromctrlid
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `用款计划明细`,
          width: 1000,
          maskClosable: false,
          components: { PlanList },
          render: (h) => {
            return <PlanList queryParams={queryParams}></PlanList>
          }
        },
        this
      )
      drawer.show()
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style>
</style>
