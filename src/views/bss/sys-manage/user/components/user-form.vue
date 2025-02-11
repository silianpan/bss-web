<!--  -->
<template>
  <div style="padding:16px;">
    <Form
      ref="form"
      label-colon
      :model="formDatas"
      :label-width="100"
      :rules="formRules"
    >
      <Row>
        <i-col :xs="24" :sm="12">
          <FormItem label="账号名" prop="accountName">
            <Input v-model="formDatas.accountName" placeholder="账号名" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="昵称" prop="nickName">
            <Input v-model="formDatas.nickName" placeholder="昵称" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="电话号码" prop="phone">
            <Input v-model="formDatas.phone" placeholder="电话号码" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="邮箱" prop="email">
            <Input v-model="formDatas.email" placeholder="邮箱" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="所属区域" prop="area">
            <GcsDropDown
              v-model="formDatas.areaName"
              :data="areaTree"
              menuLabelField="name"
              @on-item-click="areaMenuClick"
            ></GcsDropDown>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="是否启用" prop="enabled">
            <i-Switch
              v-model="formDatas.enabled"
              class="ml-16"
              true-color="#13ce66"
              false-color="#ff4949"
              size="large"
            >
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-Switch>
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import RegexUtil from '@/utils/RegexUtil'
import UserService from '@/api/security/user'
import AreaService from '@/api/sys/area'
import GcsDropDown from '@/components/GcsDropDown'

export default {
  name: 'm-form-user',
  mixins: [FormMixin],
  props: {},
  components: {
    GcsDropDown
  },
  data() {
    return {
      areaTree: [],
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      formRules: {
        area: [
          {
            required: true,
            validator: this.validateArea
          }
        ],
        accountName: [
          {
            required: true,
            trigger: 'blur',
            validator: this.accountNameValidator
          }
        ],
        email: [
          {
            type: 'string',
            message: '不是有效的邮件地址',
            pattern: RegexUtil.regexs.Email
          }
        ],
        phone: [
          {
            type: 'string',
            message: '不是有效的手机号码',
            pattern: RegexUtil.regexs.Phone
          }
        ]
      }
    }
  },
  methods: {
    loadAreaTree() {
      AreaService.queryAreaTree().then(res => {
        if (res.ok()) {
          this.areaTree = Object.assign([], res.data)
        }
      })
    },
    areaMenuClick(node) {
      this.formDatas.areaId = node.id
      this.$refs.form.validateField('area')
    },
    validateArea(rule, value, callback) {
      if (this.$_.isNil(this.formDatas.areaId)) {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    },
    accountNameValidator: function(rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('登录账号不能为空'))
        return
      }
      // 检查登录账号是否已经存在
      let params = []
      if (!this.$_.isEmpty(this.formDatas.id)) {
        params.push({
          field: 'id',
          queryType: 'neq',
          value: this.formDatas.id
        })
      }
      params.push({
        field: 'accountName',
        queryType: 'eq',
        value: value
      })
      UserService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('账户已经存在'))
          }
        } else {
          callback(new Error(resp.msg))
        }
      })
    }
  },
  mounted() {
    this.loadAreaTree()
  }
}
</script>
