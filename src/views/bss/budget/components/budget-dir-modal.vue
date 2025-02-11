<template>
  <Modal v-model="showModal" title="选择文件夹" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="900">
    <Alert :type="selectedDirShow.type">{{ selectedDirShow.content }}</Alert>
    <div style="position:relative;height:30px;padding: 0px 16px;">
      <div style="font-size:14px;position:relative;">
        <span v-if="pid === -1">全部文件</span>
        <div v-else style="display:inline">
          <span class="breadcrumb-item">
            <a @click="goLastDir" class="ivu-breadcrumb-item-link" style="color: #09AAFF">返回上一级</a>
            <span class="ivu-breadcrumb-item-separator">|</span>
          </span>
          <span class="breadcrumb-item">
            <a @click="goRootDir" class="ivu-breadcrumb-item-link" style="color: #09AAFF">全部文件</a>
            <span class="ivu-breadcrumb-item-separator">></span>
          </span>
          <template v-for="(item, index) in dirParents">
            <span v-if="index !== dirParents.length - 1 " class="breadcrumb-item" :key="index">
              <a @click="refreshPage(item)" class="ivu-breadcrumb-item-link" style="color: #09AAFF"> {{item.dirName || ''}}</a>
              <span class="ivu-breadcrumb-item-separator">></span>
            </span>
            <span v-else :key="index">
              <span class="ivu-breadcrumb-item-link">{{item.dirName || ''}}</span>
            </span>
          </template>
        </div>
      </div>
    </div>
    <div class="i-scrollerbar-hide" style="height: 400px;overflow-y: auto;">
      <Spin fix large v-if="loading"></Spin>
      <div style="height: auto;">
        <div class="margin-inline-start">
          <dir
            @on-selected="handleSelected"
            @on-click='handleDirClick'
            :checked="dir.id in selectedDirs"
            v-for="(dir, index) in dirData"
            :data="dir"
            :key="index">
          </dir>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import '../style/budget-dir-modal.less'

import Dir from '@/views/bss/file/components/dir'
import DirService from '@/api/file/dir'

export default {
  components: {
    Dir
  },
  props: {
    checkedId: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      showModal: false,
      loading: false,
      dirData: [],
      currentDir: null,
      pid: -1,
      dirParents: [],
      selectedDirs: {},
      selectedDir: null
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    visibleChange(flag) {
      if (flag) {
        this.loadDir()
      } else {
        this.selectedDirs = {}
        this.selectedDir = null
      }
    },
    loadDir() {
      this.loading = true
      this.pid = this.$_.isNil(this.currentDir) ? -1 : this.currentDir.id
      DirService.findDirByPid(this.pid).then(res => {
        if (res.ok()) {
          this.dirData = res.data
          this.loading = false

          if (!this.$_.isNil(this.checkedId)) {
            let selectedDir = this.dirData.filter(dir => this.checkedId === dir.id)[0]
            this.$set(this.selectedDirs, this.checkedId, selectedDir)
            this.selectedDir = selectedDir
          }
        }
      }).catch(e => {
        this.loading = false
      })
    },
    goLastDir() {
      this.dirParents.pop()
      this.currentDir = this.dirParents[this.dirParents.length - 1]
      this.loadDir()
    },
    goRootDir() {
      this.dirParents = []
      this.currentDir = null
      this.loadDir()
    },
    refreshPage(dir) {
      let temp = []
      for (let item of this.dirParents) {
        temp.push(item)
        if (item.id === dir.id) {
          break
        }
      }
      this.dirParents = temp
      this.currentDir = dir
      this.loadDir()
    },
    handleDirClick(dir) {
      this.dirParents.push(dir)
      this.currentDir = dir
      this.loadDir()
    },
    handleSelected(selected, data) {
      let key = data.id
      if (selected) {
        this.selectedDirs = {}
        this.$set(this.selectedDirs, key, data)
        this.selectedDir = data
      } else {
        this.$delete(this.selectedDirs, key)
        this.selectedDir = null
      }
    },
    ok() {
      this.$emit('on-modal-ok', Object.assign({}, this.selectedDir), Object.assign([], this.dirParents))
    },
    cancel() {
      this.showModal = false
    }
  },
  mounted() {
    this.loadDir()
  },
  computed: {
    selectedDirShow() {
      let obj
      if (this.$_.isNil(this.selectedDir)) {
        obj = {
          type: 'info',
          content: '暂未指定任何文件夹'
        }
      } else {
        obj = {
          type: 'success',
          content: '已指定文件夹：' + this.selectedDir.dirName
        }
      }
      return obj
    }
  }
}
</script>

<style>

</style>
