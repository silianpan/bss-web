<!--  -->
<template>
<Form ref="form" label-colon :model="formDatas" :label-width="100" :rules="formRules">
  <Row>
    <i-col :xs="24" :sm="24">
      <FormItem label="文档名称" prop="fileName">
        <Input v-model="formDatas.fileName" placeholder="文档名称" />
      </FormItem>
    </i-col>
    <i-col :xs="24" :sm="24">
      <FormItem label="是否公开" prop="enabled">
        <i-Switch v-model="formDatas.enabled" class="ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
          <span slot="open">公开</span>
          <span slot="close">私有</span>
        </i-Switch>
      </FormItem>
    </i-col>
    <i-col :xs="24" :sm="24">
      <FormItem label="文件UUID">
        <div class="ivu-form-item-content" style="vertical-align: middle">
          {{formDatas.path}}
        </div>
      </FormItem>
    </i-col>
    <i-col :xs="24" :sm="24">
      <FormItem label="文件类型">
        <div class="ivu-form-item-content" style="vertical-align: middle">
          {{formDatas.extName}}
        </div>
      </FormItem>
    </i-col>

    <i-col :xs="24" :sm="24">
      <FormItem label="文件大小">
        <div class="ivu-form-item-content" style="vertical-align: middle;">
          {{$_.ceil($_.divide(formDatas.fileSize,1024*1024),2)}}M
        </div>
      </FormItem>
    </i-col>

  </Row>
</Form>
</template>

<script>
import FormMixin from '@/mixins/form'
import RoleService from '@/api/security/role'
export default {
  name: 'm-form-file',
  mixins: [FormMixin],
  props: {},
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
