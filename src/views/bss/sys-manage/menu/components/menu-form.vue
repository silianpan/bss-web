<!--  -->
<template>
<div>
  <div style="padding:16px;" v-if="!$_.isEmpty(parentMenu)">
    <Alert type="success" show-icon>
      父级菜单信息
      <Icon type="ios-information-circle" slot="icon">
      </Icon>
    </Alert>
    <Card style="margin-bottom:24px;">
      <div>
        <Row :gutter="16">
          <i-col :xs="24" :sm="12">
            <div class="mt-8 ">
              <span>父级菜单名称:</span>
              {{parentMenu.title}}
            </div>
          </i-col>
          <i-col :xs="24" :sm="12">
            <div class="mt-8 ">
              <span>菜单编码:</span>
              {{parentMenu.code}}
            </div>
          </i-col>
        </Row>
      </div>
    </Card>
  </div>
  <div style="padding:16px;">
    <Card dis-hover>
      <Form ref="form" label-colon :model="formDatas" :label-width="125" :rules="formRules">
        <Row>
          <i-col :xs="24">
            <FormItem label="所属区域" prop="area">
              <GcsDropDown
                v-model="formDatas.areaName"
                :data="areaTree"
                menuLabelField="name"
                @on-item-click="areaMenuClick"
              ></GcsDropDown>
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="名称" prop="title">
              <Input v-model="formDatas.title" placeholder="菜单名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="编码" prop="code">
              <Input v-model="formDatas.code" placeholder="菜单编码" />
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
          <i-col :xs="24" :sm="12">
            <FormItem label="序号" prop="seq">
              <Input v-model="formDatas.seq" placeholder="序号" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="前端路由名称" prop="vueRouteName">
              <Input v-model="formDatas.vueRouteName" placeholder="前端路由名称" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="图标" prop="iconCls">
              <Input v-model="formDatas.iconCls" placeholder="图标" />
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="query配置" prop="query">
              <Card>
                <JsonEditor :options="{
                    confirmText: '确认',
                    cancelText: '取消',
                }" :objData="formDatas.query || {}" v-model="formDatas.query">
                </JsonEditor>
              </Card>
              <!-- <Input v-model="formDatas.query" placeholder="query配置" /> -->
            </FormItem>
          </i-col>
          <i-col :xs="24">
            <FormItem label="params配置" prop="params">
              <Card>
                <JsonEditor :options="{
                    confirmText: '确认',
                    cancelText: '取消',
                }" :objData="formDatas.params || {}" v-model="formDatas.params">
                </JsonEditor>
              </Card>
              <!-- <Input v-model="formDatas.params" placeholder="params配置" /> -->
            </FormItem>
          </i-col>

          <i-col :xs="24" :sm="24">
            <FormItem label="其他配置" prop="meta">
               <Card>
                <JsonEditor :options="{
                    confirmText: '确认',
                    cancelText: '取消',
                }" :objData="formDatas.meta || {}" v-model="formDatas.meta">
                </JsonEditor>
              </Card>
              <!-- <Input v-model="formDatas.meta" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="其他配置..." /> -->
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
  </div>
</div>
</template>

<script>
import FormMixin from '@/mixins/form'
import MenuService from '@/api/security/menu'
import AreaService from '@/api/sys/area'
import GcsDropDown from '@/components/GcsDropDown'
export default {
  name: 'm-form-menu',
  mixins: [FormMixin],
  props: {
    parentMenu: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    let _formDatas = Object.assign({}, this.defaultFormValue, this.data)
    this.formDatas = this.parseFields(_formDatas)
    this.loadAreaTree()
  },
  components: {
    GcsDropDown
  },
  data() {
    return {
      areaTree: [],
      jsonData: {},
      defaultFormValue: {
        enabled: true
      },
      formDatas: {},
      formRules: {
        code: [{
          required: true,
          trigger: 'blur',
          validator: this.menuCodeValidator
        }],
        title: [{
          type: 'string',
          required: true,
          message: '菜单标题不能为空'
        }]
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
    getDatas() {
      return this.stringifyFields(Object.assign({}, this.formDatas))
    },
    parseFields(_formDatas) {
      let jsonParseFileds = [
        'query',
        'params',
        'meta'
      ]
      jsonParseFileds.forEach((key) => {
        if (!this.$_.isEmpty(_formDatas[key]) && this.$_.isString(_formDatas[key])) {
          try {
            _formDatas[key] = JSON.parse(_formDatas[key])
          } catch (error) {
            _formDatas[key] = {}
          }
        }
      })
      return _formDatas
    },
    stringifyFields(_formDatas) {
      let jsonParseFileds = [
        'query',
        'params',
        'meta'
      ]
      jsonParseFileds.forEach((key) => {
        if (this.$_.isEmpty(_formDatas[key]) || !this.$_.isString(_formDatas[key])) {
          try {
            _formDatas[key] = JSON.stringify(_formDatas[key])
          } catch (error) {
            _formDatas[key] = null
          }
        }
      })
      return _formDatas
    },
    menuCodeValidator: function (rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('菜单编码不能为空'))
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
      MenuService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('菜单编码已经存在'))
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
