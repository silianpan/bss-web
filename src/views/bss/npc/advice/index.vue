<template>
  <div style="background:rgb(247, 247, 247);padding:16px;height: 100%;overflow-y: auto;">
    <div style="background:#fff;">
      <div style="max-width:500px;margin: 0px auto;padding:16px;">
        <i-Input
          @on-search="getList"
          v-model="searchVal"
          size="large"
          search
          enter-button="搜索"
          placeholder="搜索意见..."
        />
      </div>
      <Divider dashed style="margin:12px 0"></Divider>
      <Row
        class="text-center"
        :gutter="16"
        type="flex"
        justify="start"
        style="padding:0px 16px 16px 16px"
      >
        <template v-for="(item, index) in conditions.replied.datas">
          <i-col :key="index" :xs="8" :sm="8" :md="8" :lg="4" :xl="3">
            <a @click="()=>handleConSelect('replied', item)">
              <Card :class="[conForm.replied.id === item.id?'card-select':'']" :bordered="false">
                <custom-icon :type="item.icon" :color="item.iconColor" :size="32"></custom-icon>
                <p class="mt-8" style="font-size:14px;color:#515a6e">{{item.label}}</p>
              </Card>
            </a>
          </i-col>
        </template>
      </Row>
    </div>
    <div style="background:#fff;padding:16px" class="mt-8">
      <Form label-colon :model="conForm" :label-width="105">
        <FormItem label="地区">
          <template v-for="(area, index) in conditions.area.datas">
            <div
              @click="()=>handleConSelect('area', area)"
              :key="index"
              :class="['ml-16', 'ivu-tag', 'ivu-tag-size-large','tag-blue', conForm.area.id ===area.id ?'ivu-tag-checked':'']"
            >
              <span
                :class="['ivu-tag-text',conForm.area.id ===area.id ?'ivu-tag-color-white':'']"
              >{{area.name}}</span>
            </div>
          </template>
        </FormItem>
        <Divider dashed></Divider>
        <FormItem :label="`${areaInfo.name}部门`">
          <template v-for="(dept, index) in conditions.govDept.datas">
            <div
              @click="()=>handleConSelect('govDept', dept)"
              :key="index"
              :class="['ml-16', 'ivu-tag', 'ivu-tag-size-large','tag-blue', conForm.govDept.id ===dept.id ?'ivu-tag-checked':'']"
            >
              <span
                :class="['ivu-tag-text',conForm.govDept.id ===dept.id ?'ivu-tag-color-white':'']"
              >{{dept.name}}</span>
            </div>
          </template>
        </FormItem>
      </Form>
    </div>
    <div class="mt-8">
      <div style="background:#fff;position:relative;height:100%;">
        <Spin v-if="loading" large fix></Spin>
        <Row v-if="!$_.isEmpty(listAdvices)">
          <template v-for="(item, index) in listAdvices">
            <i-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :key="index">
              <advice-item @on-click="handleAdviceClick" :data="item"></advice-item>
            </i-col>
          </template>
        </Row>
        <div v-else class="text-center" style="padding:16px;">暂无信息</div>
      </div>
    </div>
  </div>
</template>

<script>
import AdviceItem from './components/advice-item'
import NpcAdvicesService from '@/api/sys/npc/advices'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import NpcAdviceDetailInfo from '@/views/bss/npc/cover-advice/detail-info'
import GovDeptService from '@/api/sys/gov-dept/index'
import AreaService from '@/api/sys/area/index'
export default {
  components: {
    AdviceItem
  },
  data() {
    return {
      searchVal: '',
      query: {},
      loading: false,
      areaInfo: {},
      listAdvices: [],
      pageOption: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      conForm: {
        govDept: {},
        area: {},
        replied: {}
      },
      conditions: {
        replied: {
          datas: [
            {
              id: '0',
              icon: 'iconfont icon-daihuifupinglun',
              iconColor: 'rgb(255, 156, 110)',
              label: '待反馈'
            },
            {
              id: '1',
              icon: 'iconfont icon-yifankui',
              iconColor: 'rgb(105, 192, 255)',
              label: '已反馈'
            }
          ]
        },
        govDept: {
          queryDataAction: this.initGovDept,
          datas: []
        },
        area: {
          queryDataAction: this.initAreaChildren,
          datas: []
        }
      }
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    async init() {
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

      await this.getList()
    },
    handleConSelect(key, node) {
      if (node.id === this.conForm[key].id) {
        this.conForm[key] = {}
      } else {
        this.conForm[key] = node
      }
      this.getList()
    },
    async initAreaInfo() {
      let res = await AreaService.findById(this.query.areaId)
      if (res.ok()) {
        this.areaInfo = res.data
      }
    },
    async initGovDept() {
      let res = await GovDeptService.getTopDeptByArea(this.query.areaId)
      if (res.ok()) {
        return res.data
      }
      return []
    },
    async initAreaChildren() {
      let res = await AreaService.getAreaChildren(this.query.areaId)
      if (res.ok()) {
        return [{ ...this.areaInfo, ...{ name: '市本级' } }].concat(
          res.data || []
        )
      }
      return []
    },
    handleAdviceClick(advice) {
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: '详情',
          maskClosable: false,
          width: '800px',
          components: { NpcAdviceDetailInfo },
          render: h => {
            return (
              <npc-advice-detail-info
                onon-refresh={this.getList}
                data={advice}
              ></npc-advice-detail-info>
            )
          }
        },
        this
      )
      drawer.show()
    },
    async getList() {
      this.loading = true
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
            field: 'replied',
            value: this.conForm.replied.id
          },
          {
            field: 'deptCode',
            value: this.conForm.govDept.code
          }
        ]
      }
      let rb = await NpcAdvicesService.pageInfo(params)
      if (rb.ok()) {
        this.listAdvices = rb.data.records
        this.pageOption.total = rb.data.total
      } else {
        this.listAdvices = []
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.tag-blue {
  background: #2196f3;
}
.card-select {
  border: 2px solid #2196f3;
}
</style>
