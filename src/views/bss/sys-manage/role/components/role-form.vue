<!--  -->
<template>
<div>

  <div style="padding:16px;">
    <div v-if="!$_.isEmpty(copySource)">
      <Alert type="success" show-icon>
        被复制角色信息
        <Icon type="ios-information-circle" slot="icon">
        </Icon>
      </Alert>
      <Card style="margin-bottom:24px;">
        <div>
          <Row :gutter="16">
            <i-col :xs="24" :sm="12">
              <div class="mt-8 ">
                <span>角色名称:</span>
                {{copySource.name}}
              </div>
            </i-col>
            <i-col :xs="24" :sm="12">
              <div class="mt-8 ">
                <span>角色编码:</span>
                {{copySource.code}}
              </div>
            </i-col>
            <i-col :xs="24" :sm="24">
              <div class="mt-8 ">
                <span>描述:</span>
                {{copySource.desc}}
              </div>
            </i-col>
          </Row>
        </div>
      </Card>
    </div>
    <Form ref="form" label-colon :model="formDatas" :label-width="100" :rules="formRules">
      <Row>
        <i-col :xs="24" :sm="12">
          <FormItem label="角色名称" prop="name">
            <Input v-model="formDatas.name" placeholder="角色名称" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="角色编码" prop="code">
            <Input v-model="formDatas.code" placeholder="角色编码" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="序号" prop="level">
            <Input v-model="formDatas.level" placeholder="序号" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="是否启用" prop="enabled">
            <i-Switch v-model="formDatas.enabled" class="ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
              <span slot="open">启用</span>
              <span slot="close">禁用</span>
            </i-Switch>
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="24">
          <FormItem label="描述" prop="desc">
            <Input v-model="formDatas.desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="描述..." />
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </div>
</div>
</template>

<script>
import FormMixin from '@/mixins/form'
import RoleService from '@/api/security/role'
export default {
  name: 'm-form-role',
  mixins: [FormMixin],
  props: {
    copySource: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      formRules: {
        code: [{
          required: true,
          trigger: 'blur',
          validator: this.roleCodeValidator
        }],
        name: [{
          type: 'string',
          required: true,
          message: '角色名称不能为空'
        }]
      }

    }
  },
  methods: {
    getDatas() {
      return {
        role: Object.assign({}, this.formDatas),
        copyRole: this.copySource || {}
      }
    },
    roleCodeValidator: function (rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('角色编码不能为空'))
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
        field: 'code',
        queryType: 'eq',
        value: value
      })
      RoleService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('角色编码已经存在'))
          }
        } else {
          callback(new Error(resp.msg))
        }
      })
    }

  },
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
