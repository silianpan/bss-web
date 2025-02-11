<template>
  <div style="padding:16px;">
    <Alert v-if="!$_.isEmpty(formDatas.id)" type="success" show-icon>
      区域id：{{formDatas.id}}
      <Icon type="ios-information-circle" slot="icon">
      </Icon>
    </Alert>
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
      <FormItem label="上级区域" prop="pArea">
        <GcsDropDown v-model="pName" :disabled="formDatas.areaDisabled || false" :data="areaTree" menuLabelField="name" @on-item-click="areaMenuClick"></GcsDropDown>
      </FormItem>
      <Row>
        <i-col span="12">
          <FormItem label="集中支付系统编号" :label-width="110" prop="eleRegion">
            <Input v-model="formDatas.eleRegion" placeholder="" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="IP白名单（逗号分隔）" :label-width="110" prop="ipAddress">
            <Input type="textarea" :rows="6" v-model="formDatas.ipAddress" placeholder="请填写ip白名单，以逗号分隔" />
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import RegexUtil from '@/utils/RegexUtil'
import GcsDropDown from '@/components/GcsDropDown'
import AreaService from '@/api/sys/area'

export default {
  name: 'm-form-area',
  mixins: [FormMixin],
  components: {
    GcsDropDown
  },
  props: {
    parentCode: String
  },
  data() {
    return {
      codePrefix: this.parentCode,
      formDatas: {},
      rules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
        code: [
          {
            validator: this.validateCode,
            trigger: 'blur'
          }
        ],
        seq: [{ required: true, validator: this.validateSeq, trigger: 'blur' }]
      },
      areaTree: [],
      pName: ''
    }
  },
  methods: {
    loadAreaTree() {
      if (!this.formDatas.areaDisabled) {
        AreaService.queryAreaTree().then((res) => {
          if (res.ok()) {
            this.areaTree = Object.assign([], res.data)
          }
        })
      }
    },
    findParent() {
      if (this.$_.isNil(this.formDatas.pid)) {
        this.pName = '顶级区域'
      } else {
        AreaService.findById(this.formDatas.pid).then((res) => {
          if (res.ok()) {
            if (this.$_.isNil(res.data)) {
              this.pName = '顶级区域'
            } else {
              this.pName = res.data.name
            }
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
        AreaService.checkCode(param)
          .then((res) => {
            if (res.ok()) {
              res.data ? callback() : callback(new Error('编码重复'))
            } else {
              callback()
            }
          })
          .catch((e) => callback())
      } else {
        callback(new Error('编码格式不合法'))
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
      this.formDatas.pid = node.id
      this.codePrefix = node.code
    }
  },
  mounted() {
    this.loadAreaTree()
    this.findParent()
  }
}
</script>

<style>
</style>
