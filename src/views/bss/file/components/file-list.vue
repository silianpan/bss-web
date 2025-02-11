<!--  -->
<template>
<div style="height: auto;">
  <div class="margin-inline-start">
    <dir @on-click='handleDirClick' v-for="(dir, index) in dirs" :data="dir" :key="index"></dir>
    <span>
      <file :data="item" v-for="(item, index) in files" :key="index"></file>
    </span>
  </div>
</div>
</template>

<script>
import File from './file'
import Dir from './dir'
import DirService from '@/api/file/dir'
import FileService from '@/api/file/file'
export default {
  props: {},
  components: {
    File,
    Dir
  },
  data() {
    return {
      currentDir: {
        id: '-1'
      },
      dirs: [

      ],
      files: []
    }
  },
  methods: {
    handleDirClick(dir) {
      this.currentDir = Object.assign({}, dir)
      this.queryDatas()
    },
    async queryDatas() {
      let dirParams = {
        conditions: [{
          field: 'pid',
          queryType: 'eq',
          value: this.currentDir.id
        }]
      }
      let fileParams = {
        conditions: [{
          field: 'dirId',
          queryType: 'eq',
          value: this.currentDir.id
        }]
      }
      this.queryChildrenDirs(dirParams)
      this.queryChildrenFiles(fileParams)
    },
    // 查询子目录
    async queryChildrenDirs(params) {
      let rb = await DirService.findAll(params)
      if (rb.ok()) {
        this.dirs = rb.data
      }
    },
    // 查询此目录下的子文件
    async queryChildrenFiles(params) {
      let rb = await FileService.findAll(params)
      if (rb.ok()) {
        this.files = rb.data
      }
    }
  },
  mounted: function () {
    this.queryDatas()
  },
  computed: {}
}
</script>

<style lang="less">
@import url('./index.less');
</style>
