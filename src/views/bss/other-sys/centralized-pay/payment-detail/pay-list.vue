<template>
  <div style="background: rgb(247, 247, 247)">
    <div v-if="$_.isEmpty(list)" class="no-data">
      暂无关联支付明细
    </div>
    <template v-else>
      <div style="padding: 16px 16px 0px 16px" v-for="item in list" :key="item.id">
        <Row type="flex" justify="space-between">
          <i-col>
            <span>支付凭证号：{{ item.billNo || '未支付' }}</span>
          </i-col>
          <i-col>
            <Tag color="volcano">{{ item.blName }}</Tag>
            <Tag color="green">{{ item.boName }}</Tag>
            <Tag color="orange">{{ item.bpName }}</Tag>
            <Tag color="blue">{{ item.bsName }}</Tag>
            <Tag color="purple">{{ item.bsiName }}</Tag>
          </i-col>
        </Row>
        <Card class="mt-8 font14">
          <Row>
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
            <i-col span="24">
              <div>
                <span>摘要:</span>
                <span class="ml-16" style="color:#5cadff">{{item.paySummaryName}}</span>
              </div>
            </i-col>
          </Row>
          <Divider dashed orientation="right">
            付款信息
          </Divider>
          <Row>
            <i-col span="24">
              <div>
                <span>交易时间:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payDate || '-'}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>付款人账户开户行:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payAccountBank}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>付款人账户:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payAccountName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>支付方式:</span>
                <span class="ml-16" style="color:#5cadff">{{item.pkName}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>付款金额:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payMoney}}元</span>
              </div>
            </i-col>
          </Row>
          <Divider dashed orientation="right">收款信息</Divider>
          <Row>
            <i-col span="12">
              <div>
                <span>收款账户开户行:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payeeAccountBank}}</span>
              </div>
            </i-col>
            <i-col span="12">
              <div>
                <span>收款账户:</span>
                <span class="ml-16" style="color:#5cadff">{{item.payeeAccountName}}</span>
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
import Api from '@/api/sysPay/pay/pay.js'

export default {
  mixins: [MenuListMixin],
  methods: {
    initData() {
      let param = {
        conditions: [
          { field: 'fromctrlid', value: this.queryParams.fromctrlid },
          { field: 'year', value: this.queryParams.year },
          { field: 'month', value: this.queryParams.month },
          { field: 'region', value: this.queryParams.region },
          { field: 'dept', value: this.queryParams.dept },
          { field: 'bs_name', value: this.queryParams.bsName },
          { field: 'bsi_name', value: this.queryParams.bsiName }
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
