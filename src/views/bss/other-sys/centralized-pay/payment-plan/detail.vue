<template>
  <div style="background: rgb(247, 247, 247)">
    <div style="padding: 16px 16px 0 16px">
      <Row type="flex" justify="space-between">
        <i-col>
          <span style="font-weight: bold">{{data.plName}}（{{data.setYear}}年{{data.setMonth}}月）</span>
        </i-col>
        <i-col>
          <Tag :color="data.isEnd === 1 ? 'cyan' : 'default'">{{ data.isEnd === 1 ? '审核通过' : '不通过' }}</Tag>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <Row>
          <i-col span="24">
            <div>
              <span>支付账户:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bapName || '-'}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>下达日期:</span>
              <span class="ml-16" style="color:#5cadff">{{data.approveDate || '-'}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>创建日期:</span>
              <span class="ml-16" style="color:#5cadff">{{data.createDate}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>清算银行:</span>
              <span class="ml-16" style="color:#5cadff">{{data.cbName}}</span>
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
              <span>备注:</span>
              <span class="ml-16" style="color:#5cadff">{{data.remark}}</span>
            </div>
          </i-col>
        </Row>
      </Card>
    </div>
    <div style="padding: 16px">
      <Row type="flex" justify="end">
        <i-col>
          <Tag color="volcano">{{ data.blName }}</Tag>
          <Tag color="green">{{ data.bpName }}</Tag>
          <Tag color="orange">{{ data.bsName }}</Tag>
          <Tag color="blue">{{ data.gbName }}</Tag>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <Row>
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
              <span>支付方式:</span>
              <span class="ml-16" style="color:#5cadff">{{data.pkName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>上报金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.planMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>建议金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.planMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>核批金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.planMoney}}元</span>
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

<style>
</style>
