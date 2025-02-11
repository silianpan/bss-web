<template>
  <div style="background: rgb(247, 247, 247)">
    <Row type="flex" justify="center">
      <i-col>
        <h2>{{ data.billFileTitle }}</h2>
      </i-col>
    </Row>
    <Row type="flex" justify="center">
      <i-col>
        <h3>{{ data.billFileName }}</h3>
      </i-col>
    </Row>
    <Row type="flex" justify="center" :gutter="16">
      <i-col>
        <span>【创建人】：{{ data.createUserName }}</span>
      </i-col>
      <i-col>
        <span>【最后操作人】：{{ data.latestOpUserName || '-' }}</span>
      </i-col>
    </Row>
    <div style="padding: 16px">
      <Row type="flex" justify="space-between">
        <i-col>
          <Tag :color="data.isEnd === 1 ? 'cyan' : 'default'">{{ data.isEnd === 1 ? '审核通过' : '不通过' }}</Tag>
        </i-col>
        <i-col>
          <Tag :color="data.budgettypeCode === '141003' ? 'red' : 'blue'">{{ data.budgettypeName }}</Tag>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <Row>
          <i-col span="12">
            <div>
              <span>生效日期:</span>
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
          <i-col span="12">
            <div>
              <span>资金性质:</span>
              <span class="ml-16" style="color:#5cadff">{{data.mkName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>指标类型:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bpName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>指标来源:</span>
              <span class="ml-16" style="color:#5cadff">{{data.blName}}</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>预算项目:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bisName}}</span>
            </div>
          </i-col>
          <i-col span="24">
            <div>
              <span>功能科目:</span>
              <span class="ml-16" style="color:#5cadff">{{data.bsNameAll.split(']')[1]}}</span>
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
    <div style="padding: 0 16px 16px 16px">
      <Row type="flex" justify="end">
        <i-col>
          <Tag color="volcano">{{ data.pkName }}</Tag>
        </i-col>
        <i-col>
          <Tag color="green">{{ data.gbName }}</Tag>
        </i-col>
        <i-col>
          <Tag color="orange">{{ data.hold27Name }}</Tag>
        </i-col>
      </Row>
      <Card class="mt-8 font14">
        <Row>
          <i-col span="12">
            <div>
              <span>录入总金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.totalMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>审核总金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.totalCheckmoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>录入金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.budgetMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>审核金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.checkMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>调减指标录入金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.budgetSumMoney}}元</span>
            </div>
          </i-col>
          <i-col span="12">
            <div>
              <span>调减指标审核金额:</span>
              <span class="ml-16" style="color:#5cadff">{{data.budgetSumCheckMoney}}元</span>
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
    data: Object
  }
}
</script>

<style>
</style>
