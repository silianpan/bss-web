<!--  -->
<template>
<div style="background:#f7f7f7;padding: 16px;">
  <Card :bordered="false">
    <div slot="title">
       <Button class="mr-16" @click="handleAddClick" type="primary" >新增前端节点元素</Button>
          <ButtonGroup >
            <Button  :disabled="selectedElements.length !== 1" @click="()=>this.handleEditClick(selectedElements[0])" >编辑</Button>
            <Button :disabled="$_.isEmpty(selectedElements)" type="error" icon="md-trash"  @click="handleDeleteClick" >删除</Button>
          </ButtonGroup>
    </div>
    <div slot="extra">
      <AutoComplete v-model="searchCon.keywords" icon="ios-search" placeholder="搜索..." style="width:260px" class="searchCriminal"></AutoComplete>
    </div>
    <div class="i-scrollbar-hide">
       <Table @on-selection-change="handleSelectChange" ref="table" :loading="isLoading" :columns="tableOptions.columns" :data="tableOptions.data"></Table>
       <div class="mt-8">
          <Page transfer @on-page-size-change="handlePageSizeChange" @on-change="handlePageIndexChange" :total="pageOption.total" show-total  show-sizer/>
       </div>
    </div>
  </Card>
</div>
</template>

<script>
import FrontElementService from '@/api/security/front-element'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
// import SignRoleToUser from './components/sign-role-to-user'
import FrontElementForm from './components/front-element-from'
export default {
  props: {},
  components: {
  },
  data() {
    return {
      searchCon: {
        keywords: ''
      },
      selectedElements: [],
      userDatas: [],
      tableOptions: {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '节点唯一code',
            key: 'code'
          },
          {
            title: '节点名称',
            key: 'name'
          },
          {
            title: '状态',
            width: 150,
            key: 'enabled',
            render: (h, params) => {
              let row = params.row
              return (
                <i-switch beforeChange={() => new Promise((resolve) => {
                  let opt = row.enabled ? '禁用' : '启用'
                  this.$Modal.confirm({
                    title: `${opt}确认`,
                    content: `您确认${opt}此节点元素吗？`,
                    onOk: () => {
                      resolve()
                    }
                  })
                })} value={row.enabled} onon-change={(value) => this.handleChangeEnabled(row, value)} class="ml-16" true-color="#13ce66" false-color="#ff4949" size="large">
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              )
            }
          }
        ],
        data: []
      },
      isLoading: false,
      pageOption: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  methods: {

    handleDeleteClick() {
      // 删除用户
      this.$Modal.confirm({
        title: `删除确认`,
        content: `您确认删除此所选的用户？`,
        onOk: async () => {
          if (!this.$_.isEmpty(this.selectedElements)) {
            let delAll = true
            let unDelUser = []
            this.isLoading = true
            for (let i = 0; i < this.selectedElements.length; i++) {
              let user = this.selectedElements[i]
              let rb = await FrontElementService.logicDelete(user.id)
              if (!rb.ok()) {
                delAll = false
                unDelUser.push(user.accountName)
              }
            }
            if (delAll) {
              this.$Message.success('成功删除')
            } else {
              this.$Message.error(unDelUser.join(',') + ',删除失败')
            }
            this.pageQuery()
          } else {
            this.$Message.error('请选择需要删除的用户')
          }
        }
      })
    },
    handleSelectChange(selection) {
      this.selectedElements = selection
    },
    // 打开用户新增弹窗
    openDrawer(drawerOption, formDatas) {
      let drawer = this.$dynamicDrawer.newInstance({
        title: drawerOption.title || '',
        width: drawerOption.width || 720,
        onRemove: () => {
          // this.init()
        },
        components: { FrontElementForm, ActionFormContainer },
        render: (h) => {
          return (
            <action-form-container saveAction={this.handleSaveClick} >
              <front-element-form data={formDatas} ></front-element-form>
            </action-form-container>
          )
        }
      }, this)
      drawer.show()
    },
    // 更改用户 启用 or 禁用 状态
    handleChangeEnabled(row, value) {
      if (!this.$_.isEmpty(row.id)) {
        FrontElementService.changeEnabled(row.id, value).then((rb) => {
          if (rb.ok()) {
            this.$Message.success({ content: rb.msg, duration: 5 })
          }
        })
      }
    },
    // 分页查询数据
    async pageQuery() {
      this.isLoading = true
      let { pageIndex, pageSize } = this.pageOption
      let params = {
        current: pageIndex,
        size: pageSize,
        conditions: [
          {
            field: 'name',
            value: this.searchCon.searchCon || ''
          }
        ]
      }
      let rb = await FrontElementService.page(params)
      if (rb.ok()) {
        this.tableOptions.data = rb.data.records
        this.pageOption.total = rb.data.total
      }
      this.selectedElements = []
      this.isLoading = false
    },

    handleEditClick(elementInfo) {
      this.openDrawer({
        title: '编辑节点元素'
      }, elementInfo || {})
    },
    // 点击新增按钮时
    handleAddClick() {
      this.openDrawer({
        title: '新增节点元素'
      }, {})
    },

    // 保存用户基本信息
    async handleSaveClick(formData) {
      let rb = await FrontElementService.save(formData)
      if (rb.ok()) {
        this.$Message.success({ content: rb.msg, duration: 5 })
        this.pageQuery()
      }
      return rb.ok()
    },

    // 页码发生变化
    handlePageIndexChange(pageIndex) {
      this.pageOption.pageIndex = pageIndex
      this.pageQuery()
    },
    // 页面大小发生变化
    handlePageSizeChange(pageSize) {
      this.pageOption.pageSize = pageSize
      this.pageQuery()
    }
  },
  mounted: function () {
    this.pageQuery()
  },
  computed: {}
}
</script>

<style scoped>

</style>
