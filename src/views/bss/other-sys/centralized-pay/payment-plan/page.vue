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
            <Select v-model="conForm.year" style="width:160px" transfer clearable placeholder="年度" @on-change="yearChange">
              <Option v-for="(item, index) in yearOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <Select v-model="conForm.month" style="width:100px" transfer clearable placeholder="月份" @on-change="monthChange">
              <Option v-for="(item, index) in 12" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <AreaSelect :pid="areaInfo.id" v-model="conForm.region" style="width:160px" placeholder="区县" @on-change="regionChange"></AreaSelect>
          </div>
          <div class="formLabel">
            <Select v-model="conForm.dept" style="width:260px" transfer clearable filterable placeholder="部门（可搜索）" @on-change="deptChange">
              <Option v-for="(item, index) in deptOp" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </div>
          <div class="formLabel">
            <i-input v-model="conForm.searchVal" placeholder="输入计划内容（备注列）" style="width:200px" class="searchCriminal" search @on-search="search"></i-input>
          </div>
          <div class="formLabel">
            <i-input v-model="conForm.bsName" placeholder="输入功能科目" style="width:200px" class="searchCriminal" search @on-search="search"></i-input>
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
import Api from '@/api/sysPay/pay/plan.js'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import Detail from './detail.vue'
import PayList from '../payment-detail/pay-list.vue'

export default {
  mixins: [MenuPageMixin],
  data() {
    return {
      columns: [
        {
          title: '计划调整类型',
          key: 'plName'
        },
        {
          title: '单位',
          key: 'enName'
        },
        {
          title: '业务处室',
          key: 'mbName'
        },
        {
          title: '功能科目',
          key: 'bsName'
        },
        {
          title: '核批金额（元）',
          key: 'planMoney'
        },
        {
          title: '备注',
          key: 'remark'
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
                <Tooltip placement="top" transfer content="关联支付">
                  <Button
                    type="info"
                    icon="ios-link"
                    onClick={() => {
                      this.showPay(params.row)
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
    plChange(value) {
      this.page.pageNum = 1
      this.queryData()
    },
    queryData() {
      this.spinFlag = true
      let param = {
        conditions: [
          { field: 'remark', value: this.conForm.searchVal },
          { field: 'bsName', value: this.conForm.bsName },
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
          title: `用款计划详情`,
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
    showPay(row) {
      let queryParams = {
        fromctrlid: row.toctrlid
      }
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: `关联支付明细`,
          width: 1000,
          maskClosable: false,
          components: { PayList },
          render: (h) => {
            return <PayList queryParams={queryParams}></PayList>
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
