<!-- 角色组表单 -->
<template>
  <Form
    ref="form"
    label-colon
    :model="formDatas"
    :label-width="100"
    :rules="formRules"
  >
    <Row>
      <i-col :xs="24" :sm="12">
        <FormItem label="分组名称" prop="name">
          <Input v-model="formDatas.name" placeholder="角色分组名称" />
        </FormItem>
      </i-col>
      <i-col :xs="24" :sm="12">
        <FormItem label="分组编码" prop="code">
          <Input v-model="formDatas.code" placeholder="分组编码" />
        </FormItem>
      </i-col>
      <i-col :xs="24" :sm="12">
        <FormItem label="序号" prop="level">
          <Input v-model="formDatas.level" placeholder="序号" />
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
      <i-col :xs="24" :sm="24">
        <FormItem label="描述" prop="desc">
          <Input
            v-model="formDatas.desc"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="描述..."
          />
        </FormItem>
      </i-col>
    </Row>
  </Form>
</template>

<script>
import FormMixin from '@/mixins/form'
import RoleGroupService from '@/api/security/role-group'
import AreaService from '@/api/sys/area'
import GcsDropDown from '@/components/GcsDropDown'

export default {
  name: 'm-form-role-group',
  mixins: [FormMixin],
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
        code: [
          {
            required: true,
            trigger: 'blur',
            validator: this.roleCodeValidator
          }
        ],
        name: [
          {
            type: 'string',
            required: true,
            message: '角色分组名称不能为空'
          }
        ],
        area: [
          {
            required: true,
            validator: this.validateArea
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
    roleCodeValidator: function(rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('角色分组编码不能为空'))
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
      RoleGroupService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('角色分组编码已经存在'))
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
