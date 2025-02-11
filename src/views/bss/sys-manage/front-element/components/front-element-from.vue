<!--  -->
<template>
<div>

  <div style="padding:16px;">
    <Form ref="form" label-colon :model="formDatas" :label-width="100" :rules="formRules">
      <Row>
        <i-col :xs="24" >
          <FormItem label="名称" prop="name">
            <Input v-model="formDatas.name" placeholder="节点名称" />
          </FormItem>
        </i-col>
        <i-col :xs="24" >
          <FormItem label="code" prop="code">
            <Input v-model="formDatas.code" placeholder="节点code" />
          </FormItem>
        </i-col>
        <i-col :xs="24" :sm="12">
          <FormItem label="序号" prop="seq">
            <Input v-model="formDatas.seq" placeholder="序号" />
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
import FrontElementService from '@/api/security/front-element'
export default {
  name: 'm-form-front-element',
  mixins: [FormMixin],
  props: {
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
          validator: this.elementCodeValidator
        }],
        name: [{
          type: 'string',
          required: true,
          message: '组件文件不能为空'
        }]

      }

    }
  },
  methods: {

    elementCodeValidator: function (rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('节点code不能为空'))
        return
      }
      // 检查节点code是否已经存在
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
      FrontElementService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('节点code已经存在'))
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
