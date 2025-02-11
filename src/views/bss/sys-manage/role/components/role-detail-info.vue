<!--  -->
<template>
<div>
  <div style="padding:16px;">
    <Alert type="success" show-icon >
      角色基本信息
      <Icon type="ios-information-circle" slot="icon">
      </Icon>
    </Alert>
    <Card>
      <Row :gutter="16">
      <i-col :xs="24" :sm="12">
        <div class="mt-8 ">
          <span>角色名称:</span>
          {{formDatas.name}}
        </div>
      </i-col>
      <i-col :xs="24" :sm="12">
        <div class="mt-8 ">
          <span>角色编码:</span>
          {{formDatas.code}}
        </div>
      </i-col>
      <i-col :xs="24" :sm="12">
        <div class="mt-8 ">
          <span>序号:</span>
          {{formDatas.level}}
        </div>
      </i-col>
      <i-col :xs="24" :sm="12">
        <div class="mt-8 ">
          <span class="mr-16">是否启用:</span>
          <Tag color="#13ce66" v-if="formDatas.enabled">启用</Tag>
          <Tag color="#ff4949" v-else>禁用</Tag>
        </div>
      </i-col>
      <i-col :xs="24" :sm="24">
        <div class="mt-8 ">
          <span>描述:</span>
          {{formDatas.desc}}
        </div>
      </i-col>
    </Row>
    </Card>
  </div>
  <div class="mt-8" style="background:#fff;padding:16px;">
    <Tabs :animated="false" >
      <TabPane label="用户" icon="md-person"  name="user">
        <RoleUserPermission :role-info="data"></RoleUserPermission>
      </TabPane>
      <TabPane label="菜单权限"  icon="ios-menu" name="menu">
        <RoleMenuPermission :role-info="data"></RoleMenuPermission>
      </TabPane>
      <TabPane label="前端路由权限"  icon="ios-navigate"  name="front-route">
        <RoleFrontRoutePermission :role-info="data"></RoleFrontRoutePermission>
      </TabPane>
      <TabPane label="前端元素节点权限"  icon="md-information"  name="front-element">
        <RoleFrontElementPermission :role-info="data"></RoleFrontElementPermission>
      </TabPane>
    </Tabs>
  </div>
</div>
</template>

<script>
import RoleUserPermission from '@/views/bss/sys-manage/permission/components/role-user-permission'
import RoleMenuPermission from '@/views/bss/sys-manage/permission/components/role-menu-permission'
import RoleFrontRoutePermission from '@/views/bss/sys-manage/permission/components/role-front-route-permission'
import RoleFrontElementPermission from '@/views/bss/sys-manage/permission/components/role-front-element-permission'
export default {
  components: {
    RoleUserPermission,
    RoleMenuPermission,
    RoleFrontRoutePermission,
    RoleFrontElementPermission
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.formDatas = Object.assign({}, this.data)
  },

  data() {
    return {
      formDatas: {}
    }
  },
  methods: {},
  mounted: function () {},
  computed: {}
}
</script>

<style  scoped>
</style>
