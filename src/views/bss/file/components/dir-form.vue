<!--  -->
<template>
<Form ref="form" label-colon :model="formDatas" :label-width="120" :rules="formRules">
  <Row>
    <i-col :xs="24" :sm="24">
      <FormItem label="文件夹名称" prop="dirName">
        <Input v-model="formDatas.dirName" placeholder="文件夹名称" />
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
        <FormItem label="所属区域" prop="area">
          <GcsDropDown
            v-model="formDatas.areaName"
            :data="areaTree"
            menuLabelField="name"
            @on-item-click="areaMenuClick"
          ></GcsDropDown>
        </FormItem>
      </i-col>
  </Row>
</Form>
</template>

<script>
import FormMixin from '@/mixins/form'
import DirService from '@/api/file/dir'
import AreaService from '@/api/sys/area'
import GcsDropDown from '@/components/GcsDropDown'

export default {
  name: 'm-form-file',
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
        dirName: [{
          required: true,
          type: 'string',
          trigger: 'blur',
          validator: this.dirNameValidator
        }],
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
    dirNameValidator: function (rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('文件夹名称不能为空'))
        return
      }
      // 检查文件夹名称是否已经重复
      let params = []
      if (!this.$_.isEmpty(this.formDatas.id)) {
        params.push({
          field: 'id',
          queryType: 'neq',
          value: this.formDatas.id
        })
      }
      params.push({
        field: 'dirName',
        queryType: 'eq',
        value: value
      })
      params.push({
        field: 'pid',
        queryType: 'eq',
        value: this.formDatas.pid || '-1'
      })
      DirService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('文件夹已经存在'))
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
