<template>
  <div class="container-wrapper">
    <div class="left-line left-wrapper">
      <div class="scrollbar i-scrollbar-hide mt-8 ml-16" style="max-width:240px;min-width:240px;height:100%;">
        <Spin v-if="loading" fix large></Spin>
        <template v-for="(arr,key,index ) in conditions">
          <Tree v-if="!$_.isEmpty(conditions[key].datas)" :data="conditions[key].datas" :key="index" @on-select-change="(row, node)=>{handleSelectChange(row, node,key)}"></Tree>
        </template>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="functionBar bottomLine">
        <div class="functionBarMain">
          <div class="leftGroup">
            <div class="formLabel">
              <Button v-has-per="['bss-npc-cover-advice-btns']" type="primary" @click="handleCoverAdvices">意见采编</Button>
            </div>
          </div>
          <div class="rightGroup">
            <div class="formLabel">
              <Input v-model="searchVal" @on-search="getList" @on-clear="getList" clearable style="width:260px" class="searchCriminal" search placeholder="搜索意见" />
              <!-- <AutoComplete @on-change="getList" v-model="searchVal" icon="ios-search" placeholder="搜索文档" style="width:260px" class="searchCriminal"></AutoComplete> -->
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrapper-c scrollbar i-scrollbar-hide">
        <div class="scrollbar i-scrollbar-hide mt-8 ml-16" style="padding:8px">
          <div class="mt-8">
            <div class="typeBlockList">
              <div class="typeBlockListTitle">
                <span class="typeBlockListText">代表意见</span>
              </div>
              <div class="typeBlockContent">
                <Table ref="table" :columns="tableOptions.columns" :data="tableOptions.data"></Table>
              </div>
              <div style="padding:24px;">
                <Page transfer @on-page-size-change="handlePageSizeChange" @on-change="handlePageIndexChange" :total="pageOption.total" show-total show-sizer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
// import ActionFormContainer from '@/components/Form/ActionFormContainer'
import NpcAdviceDetailInfo from './detail-info'
import GovBudgetService from '@/api/sys/budget/gov-budget'
import GovDeptService from '@/api/sys/gov-dept/index'
import AreaService from '@/api/sys/area/index'
import NpcAdvicesService from '@/api/sys/npc/advices'
export default {
  components: {},
  data() {
    return {
      searchVal: '',
      loading: false,
      areaInfo: {},
      query: {},
      conForm: {
        govDept: {},
        area: {},
        yearRange: {}
      },
      pageOption: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      conditions: {
        govDept: {
          queryDataAction: this.initGovDept,
          datas: []
        },
        area: {
          queryDataAction: this.initAreaChildren,
          datas: []
        },
        yearRange: {
          queryDataAction: this.initYearRange,
          datas: []
        }
      },
      tableOptions: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'title',
            minWidth: 300
          },
          {
            title: '代表姓名',
            key: 'npcMemberName'
          },
          {
            title: '意见事项',
            key: 'budgetName'
          },
          {
            title: '责任单位',
            key: 'deptName'
          },
          {
            title: '区域',
            key: 'areaName'
          },
          {
            title: '时间',
            width: 200,
            key: 'crtTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return (
                <div>
                  <Button onClick={() => this.handleDetail(params.row)}>
                    查看
                  </Button>
                </div>
              )
            }
          }
        ],
        data: []
      }
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    handleCoverAdvices() {
      let selected = this.$refs.table.getSelection() || []
      if (!this.$_.isEmpty(selected)) {
        let params = selected.map((s) => s.id)
        NpcAdvicesService.coverZip(
          params,
          this.$moment().format('YYYYMMDDHHmmss')
        )
      } else {
        this.$Message.warning('请选择需要采编的意见')
      }
    },
    handlePageIndexChange(pageIndex) {
      this.pageOption.pageIndex = pageIndex
      this.getList()
    },
    handlePageSizeChange(pageSize) {
      this.pageOption.pageSize = pageSize
      this.getList()
    },
    /** 初始化数据 */
    async init() {
      this.loading = true
      this.query = this.$route.query

      await this.initAreaInfo()
      for (const key in this.conditions) {
        if (this.conditions.hasOwnProperty(key)) {
          const element = this.conditions[key]
          if (this.$_.isFunction(element.queryDataAction)) {
            let data = await element.queryDataAction()
            if (!this.$_.isNil(data)) {
              this.conditions[key].datas = data
            }
          }
        }
      }
      this.loading = false
      this.getList()
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaInfo = res.data
      }
    },
    handleDetail(row) {
      // let formDatas = Object.assign({}, row)
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: '详情',
          maskClosable: false,
          width: '800px',
          components: { NpcAdviceDetailInfo },
          render: (h) => {
            return <npc-advice-detail-info data={row}></npc-advice-detail-info>
          }
        },
        this
      )
      drawer.show()
    },
    async initYearRange() {
      let param = {
        conditions: [
          {
            field: 'areaCode',
            value: this.areaInfo.code
          }
        ]
      }
      let res = await GovBudgetService.listYears(param)
      if (res.ok()) {
        let _yearRange = (res.data || []).map((item) => ({
          title: item,
          value: item
        }))
        if (!this.$_.isEmpty(_yearRange)) {
          return [
            {
              title: '年份',
              expand: true,
              children: _yearRange
            }
          ]
        }
      }
      return []
    },
    async initGovDept() {
      let res = await GovDeptService.getTopDeptByArea(this.query.areaId)
      if (res.ok()) {
        let _govDept = res.data
        if (!this.$_.isEmpty(_govDept)) {
          let _title = `${this.areaInfo.name}部门及相关单位`
          return [
            {
              title: _title,
              expand: true,
              children: _govDept
            }
          ]
        }
      }
      return []
    },
    async initAreaChildren() {
      let res = await AreaService.getAreaChildren(this.query.areaId)
      if (res.ok()) {
        let areaChildren = (res.data || []).map((item) =>
          Object.assign({}, item, {
            title: item.name
          })
        )
        if (!this.$_.isEmpty(areaChildren)) {
          return [
            {
              title: '区县',
              expand: true,
              children: [{ ...this.areaInfo, ...{ title: '市本级' } }].concat(
                areaChildren || []
              )
            }
          ]
        }
      }
      return []
    },

    handleSelectChange(row, node, key) {
      if (node.selected) {
        this.conForm[key] = node
      } else {
        this.conForm[key] = {}
      }
      this.getList()
    },

    async getList() {
      let { pageIndex, pageSize } = this.pageOption
      let params = {
        current: pageIndex,
        size: pageSize,
        conditions: [
          {
            field: 'keywords',
            value: this.searchVal
          },
          {
            field: 'areaId',
            value: this.query.areaId
          },
          {
            field: 'areaCode',
            value: this.conForm.area.code
          },
          {
            field: 'deptCode',
            value: this.conForm.govDept.code
          },
          {
            field: 'year',
            value: this.conForm.yearRange.value
          }
        ]
      }
      let rb = await NpcAdvicesService.pageInfo(params)
      if (rb.ok()) {
        this.tableOptions.data = rb.data.records
        this.pageOption.total = rb.data.total
      } else {
        this.tableOptions.data = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
