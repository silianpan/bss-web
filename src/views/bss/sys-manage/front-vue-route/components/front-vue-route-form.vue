<!--  -->
<template>
<div>

  <div style="padding:16px;">
    <div v-if="!$_.isEmpty(parentRoute)">
      <Alert type="success" show-icon>
        父级路由信息
        <Icon type="ios-information-circle" slot="icon">
        </Icon>
      </Alert>
      <Card style="margin-bottom:24px;">
        <div>
          <Row :gutter="16">
            <i-col :xs="24" :sm="12">
              <div class="mt-8 ">
                <span>路由名称:</span>
                {{parentRoute.name}}
              </div>
            </i-col>
            <i-col :xs="24" :sm="12">
              <div class="mt-8 ">
                <span>组件文件:</span>
                {{parentRoute.component}}
              </div>
            </i-col>
          </Row>
        </div>
      </Card>
    </div>
    <Form ref="form" label-colon :model="formDatas" :label-width="100" :rules="formRules">
      <Row>
        <i-col :xs="24" >
          <FormItem label="路由名称" prop="name">
            <Input v-model="formDatas.name" placeholder="路由名称" />
          </FormItem>
        </i-col>
        <i-col :xs="24" >
          <FormItem label="组件文件" prop="component">
            <Input v-model="formDatas.component" placeholder="组件文件" />
          </FormItem>
        </i-col>
         <i-col :xs="24" >
          <FormItem label="路径" prop="path">
            <Input v-model="formDatas.path" placeholder="组件路径" />
          </FormItem>
        </i-col>
      </Row>
    </Form>
  </div>
</div>
</template>

<script>
import FormMixin from '@/mixins/form'
import FrontRouteService from '@/api/security/front-route'
export default {
  name: 'm-form-front-route',
  mixins: [FormMixin],
  props: {
    parentRoute: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      defaultFormValue: {
      },
      formDatas: {},
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: this.routeNameValidator

        }],
        component: [{
          type: 'string',
          required: true,
          message: '组件文件不能为空'
        }],
        path: [{
          type: 'string',
          required: true,
          message: '组件路径不能为空'
        }]
      }

    }
  },
  methods: {

    routeNameValidator: function (rule, value, callback) {
      if (this.$_.isEmpty(value)) {
        callback(new Error('路由名称不能为空'))
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
        field: 'name',
        queryType: 'eq',
        value: value
      })
      FrontRouteService.countByCondition(params).then(resp => {
        if (resp.ok()) {
          let cnt = resp.data
          if (cnt === 0) {
            callback()
          } else {
            callback(new Error('路由名称已经存在'))
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
