<!--  -->
<template>
<div class="role-group-container">
  <div v-if="!showForm" class="role-group-actions">
    <Button @click="handleGoBackClick" icon="ios-arrow-back">返回</Button>
    <Button class="ml-16" @click="handleAddRoleGroupClick" type="primary">新增角色组</Button>
  </div>
  <div v-else class="role-group-actions">
    <Button @click="handleCancle">取消</Button>
    <Button :loading="isBtnLoading" class="ml-16" @click="handleRoleGroupSaveClick" type="success">保存</Button>
  </div>
  <div v-if="showForm" class="role-group-form-container">
    <Spin fix v-if="isBtnLoading"></Spin>
    <role-group-form ref="roleGroupForm" :data="currentSelectRoleGroup"></role-group-form>
  </div>
  <div class="role-group-list-container">
    <div style="color:grey">
      <custom-icon type="iconfont icon-browse"></custom-icon>
      已有角色组
    </div>
    <div class="mt-8" style="margin-bottom:8px" v-for="(item, index) in roleGroups" :key="index">
      <Card>
        {{item.name}}
        <div style="position:relative;float:right">
          <Poptip transler placement="top-end" confirm title="确定删除此角色分组？" @on-ok="handleDeleteClick(item)">
            <Button class="mr-16" size="small" type="error" icon="md-trash">删除</Button>
          </Poptip>
          <Button size="small" @click="handleEditClick(item)">编辑</Button>
        </div>
      </Card>
    </div>
  </div>
</div>
</template>

<script>
import RoleGroupService from '@/api/security/role-group'
import RoleGroupForm from './role-group-form'
import CommonUtil from '@/utils/CommonUtil'
export default {
  props: {},
  components: {
    RoleGroupForm
  },
  data() {
    return {
      currentSelectRoleGroup: {},
      roleGroups: [],
      showForm: false,
      loading: false,
      isBtnLoading: false
    }
  },
  methods: {
    async init() {
      this.queryDatas()
    },
    // 查询所有角色分组信息
    async queryDatas() {
      let rb = await RoleGroupService.list()
      if (rb.ok()) {
        this.roleGroups = rb.data
      }
    },
    // 点击返回按钮时 关闭drawer
    handleGoBackClick() {
      let drawer = CommonUtil.findComponentUpward(this, 'Drawer')
      if (drawer) {
        drawer.visible = false
      }
    },
    // 取消按钮时隐藏表单
    handleCancle() {
      this.showForm = false
    },
    // 点击角色分组新增 暂时表单内容
    handleAddRoleGroupClick() {
      this.showForm = true
      this.currentSelectRoleGroup = {}
    },
    // 保存角色分组基本信息
    // 保存角色分组信息
    async handleRoleGroupSaveClick() {
      this.$refs.roleGroupForm.submit(async (formDatas) => {
        this.isBtnLoading = true
        let rb = await RoleGroupService.save(formDatas)
        if (rb.ok()) {
          this.$Message.success({ content: rb.msg, duration: 5 })
          this.queryDatas()
        }
        this.isBtnLoading = false
      }, () => {
        this.isBtnLoading = false
      })
    },

    // 点击 编辑按钮时 设置表单值
    handleEditClick(roleGroup) {
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
        this.currentSelectRoleGroup = Object.assign({}, roleGroup)
      })
    },
    // 删除角色分组
    async handleDeleteClick(item) {
      let {
        id
      } = item
      if (!this.$_.isEmpty(id)) {
        let rb = await RoleGroupService.logicDelete(id)
        if (rb.ok()) {
          if (this.currentSelectRoleGroup.id === item.id) {
            // 重置表单数据
            this.showForm = false
            this.$nextTick(() => {
              this.showForm = true
              this.currentSelectRoleGroup = {}
            })
          }
          this.$Message.success({ content: rb.msg, duration: 5 })
        }
        this.queryDatas()
      }
    }

  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style scoped>
.role-group-actions {
  margin: 16px;
}

.role-group-list-container {
  background: rgb(247, 247, 247);
  padding: 16px;
  height: 100%;
}

.role-group-form-container {
  position: relative;
  background: rgb(247, 247, 247);
  padding: 16px;
  margin-bottom: 8px;
}
</style>
