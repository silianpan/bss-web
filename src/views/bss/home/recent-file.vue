<!--  -->
<template>
<div>
  <div class="knowledgeTitle">
    <h2>近期文件</h2>
    <span class="showAll" @click="handleClickAll">
      全部
      <i class="showAllIcon"></i>
    </span>
  </div>
  <div class="knowledgeContent i-scrollbar-hide">
    <Spin v-if="spinFlag" fix></Spin>
    <template v-if="$_.isEmpty(datas)">
      <div class="no-file">本周暂无新增文件</div>
    </template>
    <template v-else>
      <div class="knowledgeItems" v-for="(item, index) in datas" :key="index">
        <Poptip trigger="hover" transfer>
          <span class="knowledgeIcon iconfont  icon-gerenzhongxincaozuojilu"></span>
          <span class="knowledgeText">{{item.fileName + '.' + item.extName}}</span>
          <ButtonGroup slot="content">
            <Spin v-if="popTipSpin" fix ></Spin>
            <Button @click="handleFileClick(item)" :disabled="previewDisabled(item)" type="info" ghost>预览</Button>
            <Button @click="handleDownloadClick(item)" type="success" ghost>下载</Button>
          </ButtonGroup>
        </Poptip>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import FileService from '@/api/file/file'
import FileUploadService from '@/api/file/file-upload'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import OnLineCmp from '@/components/OnLine'

export default {
  props: {},
  components: {},
  data() {
    return {
      datas: [],
      spinFlag: false,
      popTipSpin: false
    }
  },
  methods: {
    handleClickAll() {
      this.$router.push({ name: 'bss-file' })
    },
    handleDownloadClick(item) {
      FileUploadService.download(item.fileName + '.' + item.extName, item.path)
    },
    handleFileClick(item) {
      this.popTipSpin = true
      let drawer = DynamicDrawerUtil.newInstance({
        title: item.fileName,
        width: '90%',
        components: { OnLineCmp },
        onRemove: () => {
          this.popTipSpin = false
        },
        render: (h) => {
          return (
            <on-line-cmp file-path={item.path} file-name={item.fileName + '.' + item.extName}></on-line-cmp>
          )
        }
      }, this)
      drawer.show()
    },
    previewDisabled(item) {
      let previewAvalible = this.$store.state['bss-app'].previewAvalibleList
      return previewAvalible.indexOf(item.extName) === -1
    },
    init() {
      // 查询近期文件,201952
      this.spinFlag = true
      FileService.getRecentFile().then(res => {
        if (res.ok()) {
          this.datas = res.data
        }
        this.spinFlag = false
      })
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {}
}
</script>

<style scoped>
.t:after {
  display: inline;
  content: "...";
  font-size: 16px;

}
.no-file {
    margin: 0 auto;
    width: 200px;
    height: 50px;
    line-height: 50px;
    color: grey;
    font-family: '微软雅黑';
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
  }
::-webkit-scrollbar {
  width: 0
}
::-webkit-scrollbar-track {
  background-color: transparent
}
::-webkit-scrollbar-thumb {
  background: #e8eaec
}
</style>
