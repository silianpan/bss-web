<template>
  <div>
    <FileSelect @on-select-file="selectFileClick" :data="data">
      <template>
        <div style="text-align:center">
          <Button type="primary" @click="startClick">执行</Button>
        </div>
      </template>
    </FileSelect>
  </div>
</template>

<script>
import FileSelect from '../file-select'
import AnalysisBudgetFinalService from '@/api/sys/analysis/budget-final'
import CommonUtil from '@/utils/CommonUtil'
import { startLoading, endLoading } from '@/utils/LoadingUtil'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedFile: {}
    }
  },
  components: {
    FileSelect
  },
  methods: {
    closeDrawer() {
      let drawer = CommonUtil.findComponentUpward(this, 'Drawer')
      if (drawer) {
        drawer.visible = false
      }
    },
    selectFileClick(file) {
      this.selectedFile = file
    },
    startClick() {
      this.$Modal.confirm({
        title: '数据预处理',
        content: '该处理会覆盖该年、该地区、该部门的数据，是否继续？且运行时间有点长，请耐心等待！',
        onOk: () => {
          startLoading()
          AnalysisBudgetFinalService.dataPreHandle({
            budgetName: this.data.name,
            year: this.data.year,
            area: this.data.areaName,
            makeLevel: this.data.level,
            govDept: this.data.deptName,
            attaRealPath: this.selectedFile.path
          }).then(res => {
            endLoading()
            if (res.ok()) {
              this.$Message.success({ content: res.msg, duration: 5 })
              this.closeDrawer()
            }
          })
        }
      })
    }
  }
}
</script>
