<template>
<div style="padding:16px;">
  <Form ref="form" :model="formDatas" :label-width="100" :rules="rules">
    <Row>
      <i-col span="12">
        <FormItem label="名称" prop="name">
          <Input v-model="formDatas.name" placeholder="" />
        </FormItem>
      </i-col>
      <i-col span="12">
        <FormItem label="编号" prop="code">
          <i-input v-model="formDatas.code" placeholder="选填不超过四位（未填系统会自动生成）">
            <span slot="prepend">{{$_.isEmpty(codePrefix) ? '顶级部门' : codePrefix + '-'}}</span>
          </i-input>
        </FormItem>
      </i-col>
    </Row>
    <FormItem label="所属区域" prop="area">
      <GcsDropDown v-model="formDatas.areaName" :disabled="$_.isNil(formDatas.areaDisabled)" :data="areaTree" menuLabelField="name" @on-item-click="areaMenuClick"></GcsDropDown>
    </FormItem>
    <FormItem label="上级部门" prop="pdept" v-if="!$_.isNil(formDatas.deptDisabled)">
      <GcsDropDown v-model="pName" :disabled="$_.isNil(formDatas.deptDisabled)" :data="deptTree" menuLabelField="name" @on-item-click="deptMenuClick"></GcsDropDown>
    </FormItem>
    <Row>
      <i-col span="12">
        <FormItem label="排序" prop="seq">
          <Input v-model="formDatas.seq" placeholder="" />
        </FormItem>
      </i-col>
      <i-col span="12">
        <FormItem label="是否启用" prop="enabled">
          <i-switch v-model="formDatas.enabled">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
      </i-col>
    </Row>
  </Form>
</div>
</template>

<script>
import FormMixin from '@/mixins/form'
import GcsDropDown from '@/components/GcsDropDown'
import AreaService from '@/api/sys/area'
import GovDeptService from '@/api/sys/gov-dept/index'
import RegexUtil from '@/utils/RegexUtil'

export default {
  name: 'm-form-gov-dept',
  mixins: [FormMixin],
  components: {
    GcsDropDown
  },
  props: {
    parentCode: String
  },
  data() {
    return {
      formDatas: {},
      codePrefix: this.parentCode,
      rules: {
        name: [{
          required: true,
          message: '请填写部门名称',
          trigger: 'blur'
        }],
        code: [{
          validator: this.validateCode,
          trigger: 'blur'
        }],
        area: [{
          required: true,
          validator: this.validateArea
        }],
        seq: [{
          required: true,
          validator: this.validateSeq,
          trigger: 'blur'
        }]
      },
      areaTree: [],
      deptTree: [],
      pName: ''
    }
  },
  methods: {
    loadAreaTree() {
      if (!this.$_.isNil(this.formDatas.areaDisabled)) {
        AreaService.queryAreaTree().then(res => {
          if (res.ok()) {
            this.areaTree = Object.assign([], res.data)
          }
        })
      }
    },
    loadDeptTree() {
      if (!this.$_.isNil(this.formDatas.deptDisabled)) {
        GovDeptService.getDeptTreeByArea(this.formDatas.id, this.formDatas.areaId).then(res => {
          if (res.ok()) {
            this.deptTree = Object.assign([], res.data.tree)
            this.pName = res.data.pName
          }
        })
      }
    },
    validateCode(rule, value, callback) {
      if (this.$_.isNil(value)) {
        callback()
      }
      if (value.length <= 4) {
        let param = {
          id: this.formDatas.id,
          pid: this.formDatas.pid,
          code: this.formDatas.code
        }
        GovDeptService.checkCode(param).then(res => {
          if (res.ok()) {
            res.data ? callback() : callback(new Error('编码重复'))
          } else {
            callback()
          }
        }).catch(e => callback())
      } else {
        callback(new Error('编码格式不合法'))
      }
    },
    validateArea(rule, value, callback) {
      if (this.$_.isNil(this.formDatas.areaId)) {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    },
    validateSeq(rule, value, callback) {
      if (value === '' || !RegexUtil.testPositiveInteger(value)) {
        callback(new Error('请填写正整数（可为零）'))
      } else {
        callback()
      }
    },
    areaMenuClick(node) {
      this.formDatas.areaId = node.id
      this.$refs.form.validateField('area')
    },
    deptMenuClick(node) {
      this.formDatas.pid = node.id
      this.codePrefix = node.code
    }
  },
  mounted() {
    this.loadAreaTree()
    this.loadDeptTree()
  }
}
</script>

<style>
</style>
