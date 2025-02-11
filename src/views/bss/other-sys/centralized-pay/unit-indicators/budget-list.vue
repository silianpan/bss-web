<template>
  <div style="background: rgb(247, 247, 247)">
    <div v-if="$_.isEmpty(list)" class="no-data">
      暂无关联单位指标
    </div>
    <template v-else>
      <div style="padding: 16px 16px 0px 16px" v-for="item in list" :key="item.bVouId">
        <Row type="flex" justify="space-between">
          <i-col>
            <Tag :color="item.budgettypeCode === '141003' ? 'red' : 'blue'">{{ item.budgettypeName }}</Tag>
          </i-col>
        </Row>
        <Card class="mt-8 font14">
          <Row>
            <i-col span="12">
              <div>
                <span>指标标题:</span>
                <span class="ml-16" style="color:#5cadff">{{item.billFileTitle}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>文号:</span>
                <span class="ml-16" style="color:#5cadff">{{item.billFileName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>单位:</span>
                <span class="ml-16" style="color:#5cadff">{{item.enName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>业务处室:</span>
                <span class="ml-16" style="color:#5cadff">{{item.mbName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>资金性质:</span>
                <span class="ml-16" style="color:#5cadff">{{item.mkName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>指标类型:</span>
                <span class="ml-16" style="color:#5cadff">{{item.bpName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>指标来源:</span>
                <span class="ml-16" style="color:#5cadff">{{item.blName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>预算项目:</span>
                <span class="ml-16" style="color:#5cadff">{{item.bisName}}</span>
              </div>
            </i-col>
            <i-col span="24">
              <div>
                <span>功能科目:</span>
                <span class="ml-16" style="color:#5cadff">{{item.bsNameAll.split(']')[1]}}</span>
              </div>
            </i-col>
            <i-col span="24">
              <div>
                <span>备注:</span>
                <span class="ml-16" style="color:#5cadff">{{item.remark}}</span>
              </div>
            </i-col>
          </Row>
          <Divider dashed orientation="right">
            <Tag color="volcano">{{ item.pkName }}</Tag>
            <Tag color="green">{{ item.gbName }}</Tag>
            <Tag color="orange">{{ item.hold27Name }}</Tag>
          </Divider>
          <Row>
            <i-col span="12">
              <div>
                <span>录入金额:</span>
                <span class="ml-16" style="color:#5cadff">{{item.budgetMoney}}元</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>审核金额:</span>
                <span class="ml-16" style="color:#5cadff">{{item.checkMoney}}元</span>
              </div>
            </i-col>
          </Row>
        </Card>
      </div>
      <div class="pageContainer" style="padding-bottom: 16px">
        <Page :total="page.totalRecords" :current="page.pageNum" show-total show-elevator :page-size="page.pageSize" @on-change="listChangePage" />
      </div>
    </template>
  </div>
</template>

<script>
import MenuListMixin from '../mixin/menu-list'
import Api from '@/api/sysPay/pay/budget.js'

export default {
  mixins: [MenuListMixin],
  methods: {
    initData() {
      let param = {
        conditions: [
          { field: 'year', value: this.queryParams.year },
          { field: 'month', value: this.queryParams.month },
          { field: 'region', value: this.queryParams.region },
          { field: 'dept', value: this.queryParams.dept }
        ],
        current: this.page.pageNum,
        size: this.page.pageSize
      }
      Api.pageInfo(param).then((res) => {
        if (res.ok()) {
          this.list = res.data.records || []
          this.page.totalRecords = res.data.total
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
