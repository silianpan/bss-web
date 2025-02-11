<template>
  <div style="background: rgb(247, 247, 247)">
    <div style="padding: 16px 16px 0px 16px">
      <Row type="flex" justify="space-between">
        <i-col>
          <span>支付凭证号：{{ data.billNo || '未支付' }}</span>
        </i-col>
        <i-col>
          <Tag color="volcano">{{ data.blName }}</Tag>
          <Tag color="green">{{ data.boName }}</Tag>
          <Tag color="orange">{{ data.bpName }}</Tag>
          <Tag color="blue">{{ data.bsName }}</Tag>
          <Tag color="purple">{{ data.bsiName }}</Tag>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <Row>
          <i-col span="12">
            <div>
              <span>支付账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bapName || '-'}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>清算账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bacName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>单位:</span>
              <span class="ml-16" style="color:#5cadff">{{data.enName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>业务处室:</span>
              <span class="ml-16" style="color:#5cadff">{{data.mbName}}</span>
            </div>
          </i-col>
          <i-col span="24">
            <div>
              <span>摘要:</span>
              <span class="ml-16" style="color:#5cadff">{{data.paySummaryName}}</span>
            </div>
          </i-col>
        </Row>
      </Card>
    </div>
    <div style="padding: 16px 16px 0px 16px">
      付款信息
      <Card class="mt-8 font14">
        <Row>
          <i-col span="24">
            <div>
              <span>交易时间:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payDate || '-'}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>付款账户开户行:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payAccountBank}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>付款账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payAccountName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>划款账户开户行:</span>
              <span class="ml-16" style="color:#5cadff">{{data.agentAccountBank}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>划款账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.agentAccountName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>清算账户开户行:</span>
              <span class="ml-16" style="color:#5cadff">{{data.clearAccountBank}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>清算账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.clearAccountName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>支付方式:</span>
              <span class="ml-16" style="color:#5cadff">{{data.pkName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>付款金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payMoney}}元</span>
            </div>
          </i-col>
        </Row>
      </Card>
    </div>
    <div style="padding: 16px">
      收款信息
      <Card class="mt-8 font14">
        <Row>
          <i-col span="12">
            <div>
              <span>收款账户开户行:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payeeAccountBank}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>收款账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.payeeAccountName}}</span>
            </div>
          </i-col>
        </Row>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>
