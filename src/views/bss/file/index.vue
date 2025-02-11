<template>
  <div style="height:100%;">
    <div class="functionBar " style="margin:0px 40px">
      <div class="functionBarMain">
        <div class="leftGroup">
          <div class="formLabel">
            <CustomUpload @after-change="handleSelectFileChange" style="display:inline" :action="formalFileUploadUrl" :dir="dirFilesVo.current" :data="{ dirId: $_.isEmpty(dirFilesVo.current) ? '' : dirFilesVo.current.id }">
              <Button :disabled="$_.isEmpty(dirFilesVo)" type="primary">
                <Icon type="md-cloud-upload" />
                上传
              </Button>
            </CustomUpload>
            <Button :disabled="$_.isEmpty(dirFilesVo)" class="ml-16" @click="handleMkdirClick">
              <Icon type="ios-folder-outline" />
              新建文件夹
            </Button>
            <ButtonGroup v-if="selectedLength!==0" class="ml-16">
              <template v-for="(bar, index) in toolBars">
                <Button :disabled="bar.disabled()" @click="bar.clickHandle" :key="index" :type="bar.type||'dashed'">
                  <Icon v-if="bar.icon" :type="bar.icon" />
                  {{bar.name}}
                </Button>
              </template>
            </ButtonGroup>
          </div>
        </div>
        <div class="rightGroup">
          <div class="formLabel">
            <!-- <AutoComplete v-model="searchVal" icon="ios-search" placeholder="搜索文档..." style="width:260px" class="searchCriminal"></AutoComplete> -->
          </div>
          <div class="formLabel">
            <Button @click="showModelToggle">{{showModel?'列表显示':'图标显示'}}</Button>
          </div>
        </div>
      </div>
    </div>
    <div style="position:relative;height:30px;padding: 0px 16px;margin: 0px 40px;">
      <div style="font-size:14px;position:relative;">
        <span v-if="currentDirPath === '/'">全部文件</span>
        <div v-else style="display:inline">
          <span class="breadcrumb-item">
            <a @click="handleGo_1" class="ivu-breadcrumb-item-link">返回上一级</a>
            <span class="ivu-breadcrumb-item-separator">|</span>
          </span>
          <span class="breadcrumb-item">
            <a @click="refreshPage('')" class="ivu-breadcrumb-item-link">全部文件</a>
            <span class="ivu-breadcrumb-item-separator">></span>
          </span>
          <template v-for="(item, index) in dirParents">
            <span v-if="index!==dirParents.length-1" class="breadcrumb-item" :key="index">
              <a @click="refreshPage(item.path)" class="ivu-breadcrumb-item-link"> {{item.dirName || ''}}</a>
              <span class="ivu-breadcrumb-item-separator">></span>
            </span>
            <span v-else :key="index">
              <span class="ivu-breadcrumb-item-link">{{item.dirName || ''}}</span>
            </span>
          </template>
        </div>
        <span style="float: right;"> 已全部加载，共{{dirFilesVo.cnt || 0}}个</span>
      </div>
      <div class="mt-8" style="font-size:14px">
        <Checkbox :value="isSelectAll" @on-change="handleSelectAll">{{selectedLength==0?"全选":`已选中${selectedLength}个文件夹/文件`}}</Checkbox>
      </div>
    </div>
    <div class="container i-scrollerbar-hide" style="height: calc( 100% - 68px - 40px - 30px);overflow-y: auto;">
      <Spin fix large v-if="loading"></Spin>
      <div v-if="showModel" style="height: auto;">
        <div class="margin-inline-start">
          <dir @on-selected="handleSelected" :checked="`dir_${dir.id}` in selectedDirAndFiles" @on-click='handleDirClick' v-for="(dir, index) in dirFilesVo.dirs || []" :data="dir" :key="index"></dir>
          <div style="display:inline">
            <file @on-click="handleFileClick" :ext-name="item.extName" :checked="`file_${item.id}` in selectedDirAndFiles" @on-selected="handleSelected" :data="item"
              v-for="(item) in dirFilesVo.files || []" :key="item.id"></file>
          </div>
        </div>
      </div>
      <div class="tableContainer " style=" margin: 8px 30px;" v-else>
        <Table :columns="tableOptions.columns" :data="tableDatas"></Table>
      </div>
    </div>
    <FileUploadModal ref="fileUploadModal"></FileUploadModal>

  </div>
</template>

<script>
import File from '@/views/bss/file/components/file'
import Dir from '@/views/bss/file/components/dir'
import DirService from '@/api/file/dir'
import FileService from '@/api/file/file'
import FileUploadService from '@/api/file/file-upload'
import DynamicDrawerUtil from '@/utils/DynamicDrawerUtil'
import ActionFormContainer from '@/components/Form/ActionFormContainer'
import DirForm from '@/views/bss/file/components/dir-form'
import FileForm from '@/views/bss/file/components/file-form'
import CustomUpload from '@/components/FileUpload/Upload'
import FileUploadModal from '@/views/bss/file/components/file-upload-modal'
import OnLineCmp from '@/components/OnLine'

export default {
  components: {
    File,
    Dir,
    CustomUpload,
    FileUploadModal
  },
  data() {
    return {
      // 文件图标样式集合
      fileIcons: [
        'xls',
        'xlsx',
        'excel',
        'sql',
        'code',
        'pdf',
        'txt',
        'mp3',
        'jpg',
        'png',
        'ppt',
        'pptx',
        'video',
        'word',
        'white',
        'doc',
        'docx',
        'word',
        'rar',
        'zip',
        'rar',
        'exe'
      ],
      formalFileUploadUrl: FileUploadService.uploadFormalUrl,
      searchVal: '',
      loading: false,
      selectedDirAndFiles: {},
      toolBars: [
        {
          name: '删除',
          icon: 'md-trash',
          disabled: () => {},
          clickHandle: this.handleDeleteClick
        },
        {
          name: '下载',
          icon: 'md-cloud-download',
          disabled: () => {},
          clickHandle: this.handleDownloadClick
        },
        {
          name: '修改',
          disabled: () => this.selectedLength !== 1,
          clickHandle: this.handleModifyClick
        }
      ],
      rootDir: {
        path: '/'
      },
      currentDirPath: '/',
      dirFilesVo: {
        current: {}
      },
      showModel: true,
      tableOptions: {
        columns: [
          {
            type: 'check',
            width: 60,
            align: 'center',
            title: '序号'
          },
          {
            title: '名称',
            key: 'name',
            render: (h, params) => {
              let row = params.row
              if ('fileName' in row) {
                return (
                  <div style="height: 49px;width:100%;cursor: pointer;">
                    <div style="float:left" class={this.iconClasses(row)}></div>
                    <div
                      style="display:inline"
                      onClick={() => {
                        this.handleFileClick(row)
                      }}
                    >
                      {row.fileName}
                    </div>
                  </div>
                )
              } else {
                return (
                  <div>
                    <div
                      style="height: 26px;width: 26px;float:left;cursor: pointer;"
                      class={['file-small-icon2', 'ext-dir']}
                    ></div>
                    <div
                      style="display:inline"
                      onClick={() => {
                        this.handleDirClick(row)
                      }}
                    >
                      {row.dirName}
                    </div>
                  </div>
                )
              }
            }
          },
          {
            title: '大小',
            key: 'fileSize'
          },
          {
            title: '上传人',
            key: 'author'
          },
          {
            title: '上传时间',
            key: 'crtTime'
          }
        ]
      },
      throttled: this.$_.throttle(
        () => {
          this.queryDatas()
        },
        1000,
        { leading: false }
      )
    }
  },
  methods: {
    iconClasses(row) {
      return [
        'file-small-icon2',
        this.$_.includes(this.fileIcons, row.extName)
          ? 'ext-' + row.extName
          : 'ext-code'
      ]
    },
    handleSelectAll(isSelect) {
      let { files, dirs } = this.dirFilesVo
      let selected = {}
      if (!this.$_.isEmpty(dirs)) {
        dirs.forEach((dir) => {
          if (isSelect) {
            dir._type = 'dir'
            let key = `${dir._type}_${dir.id}`
            selected[key] = { ...dir }
          }
        })
      }
      if (!this.$_.isEmpty(files)) {
        files.forEach((file) => {
          if (isSelect) {
            file._type = 'file'
            let key = `${file._type}_${file.id}`
            selected[key] = { ...file }
          }
        })
      }
      this.selectedDirAndFiles = Object.assign({}, selected)
    },
    handleSelectFileChange() {
      this.$refs.fileUploadModal.show()
    },

    handleFileClick(data) {
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: data.fileName,
          width: '90%',
          components: { OnLineCmp },
          render: (h) => {
            return (
              <on-line-cmp
                file-path={data.path}
                file-name={data.fileName + '.' + data.extName}
              ></on-line-cmp>
            )
          }
        },
        this
      )
      drawer.show()
    },
    handleSelected(selected, data) {
      //  new_key
      let key = `${data._type}_${data.id}`
      if (selected) {
        this.$set(this.selectedDirAndFiles, key, data)
      } else {
        this.$delete(this.selectedDirAndFiles, key)
      }
    },

    getParamsFormSelected() {
      let values = Object.values(this.selectedDirAndFiles)
      let files = []
      let dirs = []
      if (!this.$_.isEmpty(values)) {
        for (let i = 0; i < values.length; i++) {
          let { _type } = values[i]
          if (_type === 'file') {
            files.push({ ...values[i] })
          } else {
            dirs.push({ ...values[i] })
          }
        }
      }
      return {
        files,
        dirs
      }
    },

    handleDeleteClick() {
      this.$Modal.confirm({
        title: '确认删除？',
        content: '此操作将会删除文件夹下的所有文件',
        onOk: () => {
          let params = this.getParamsFormSelected()
          if (!this.$_.isEmpty(params)) {
            this.loading = true
            FileUploadService.delete(params).then((rb) => {
              if (rb.ok()) {
                this.$Message.success('删除成功')
                this.queryDatas()
              }
              this.loading = false
            })
          }
        }
      })
    },

    handleDownloadClick() {
      let params = this.getParamsFormSelected()
      let dirs = params.dirs || []
      let files = params.files || []
      if (dirs.length === 0 && files.length === 1) {
        let file = files[0]
        FileUploadService.download(
          file.fileName + '.' + file.extName,
          file.path
        )
      } else {
        this.$Modal.confirm({
          title: '是否打包下载',
          content: '此操作将会压缩所选文件下载',
          onOk: () => {
            if (!this.$_.isEmpty(params)) {
              FileUploadService.downloadZip(
                params,
                this.$moment().format('YYYYMMDDHHmmss')
              )
            }
          }
        })
      }
    },

    // 修改基本信息
    handleModifyClick() {
      let dirOrFile = Object.values(this.selectedDirAndFiles)[0]
      if (dirOrFile._type === 'dir') {
        this.openDirDrawer(
          {
            title: '修改文件夹'
          },
          dirOrFile
        )
      } else {
        this.openFileDrawer(
          {
            title: '修改文件信息'
          },
          dirOrFile
        )
      }
    },
    // 刷新页面
    refreshPage(path) {
      this.$router.push({
        name: this.$route.name,
        query: {
          path: path
        }
      })
    },
    // 返回上一级
    handleGo_1() {
      let lastIndex = this.currentDirPath.lastIndexOf('/')
      let path = this.currentDirPath.slice(0, lastIndex > -1 ? lastIndex : 0)
      this.refreshPage(path)
    },
    openDirDrawer(drawerOption, data) {
      let formDatas = Object.assign({}, data)
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: drawerOption.title || '',
          width: drawerOption.width || 500,
          components: { DirForm, ActionFormContainer },
          render: (h) => {
            return (
              <action-form-container saveAction={this.handleDirFormSaveClick}>
                <dir-form data={formDatas}></dir-form>
              </action-form-container>
            )
          }
        },
        this
      )
      drawer.show()
    },
    openFileDrawer(drawerOption, data) {
      let formDatas = Object.assign({}, data)
      let drawer = DynamicDrawerUtil.newInstance(
        {
          title: drawerOption.title || '',
          width: drawerOption.width || 500,
          components: { FileForm, ActionFormContainer },
          render: (h) => {
            return (
              <action-form-container saveAction={this.handleFileFormSaveClick}>
                <file-form data={formDatas}></file-form>
              </action-form-container>
            )
          }
        },
        this
      )
      drawer.show()
    },

    // 点击创建文件按钮
    handleMkdirClick() {
      let formDatas = {
        pid: (this.dirFilesVo.current || {}).id || '-1'
      }
      this.openDirDrawer(
        {
          title: '新增文件夹'
        },
        formDatas
      )
    },

    async handleFileFormSaveClick(formDatas) {
      let rb = await FileService.save(formDatas)
      if (rb.ok()) {
        this.$Message.success('操作成功')
        this.queryDatas()
      }
      return rb.ok()
    },
    async handleDirFormSaveClick(formDatas) {
      let rb = await DirService.save(formDatas)
      if (rb.ok()) {
        this.$Message.success('操作成功')
        this.queryDatas()
      }
      return rb.ok()
    },
    showModelToggle() {
      this.showModel = !this.showModel
    },
    // 点击文件夹时 进入子集目录
    handleDirClick(dir) {
      let path = this.currentDirPath + '/' + dir.dirName
      this.refreshPage(this.$_.trim(path, '/'))
    },

    // 根据path 查询目录结构
    async queryDatas() {
      this.loading = true
      this.selectedDirAndFiles = {}
      let rb = await DirService.findChildrenPyFilePath(this.currentDirPath)
      if (rb.ok()) {
        this.dirFilesVo = rb.data
        this.dirFilesVo.files = rb.data.files.filter(item => item.dirId !== '-1')
      } else {
        this.dirFilesVo = {}
      }
      this.loading = false
    },

    // 初始化数据
    async init() {
      let path = this.$route.query.path

      if (!this.$_.isEmpty(path)) {
        this.currentDirPath = this.$_.trimEnd(path, '/')
      } else {
        this.currentDirPath = this.rootDir.path
      }
      this.queryDatas()
    },
    throttleRefresh() {
      if (this.uploadSuccessFilesCnt !== 0) {
        this.throttled()
      }
    }
  },
  computed: {
    isSelectAll() {
      let selectCnt = Object.values(this.selectedDirAndFiles).length
      let files = this.dirFilesVo.files || []
      let dirs = this.dirFilesVo.dirs || []
      return selectCnt !== 0 && selectCnt === files.length + dirs.length
    },
    // 目录上级
    dirParents() {
      let path = this.$_.trimStart(this.currentDirPath, '/')
      let dirParents = []
      if (!this.$_.isEmpty(path)) {
        let paths = path.split('/')
        if (!this.$_.isEmpty(paths)) {
          for (let i = 0; i < paths.length; i++) {
            if (i === 0) {
              dirParents[i] = {
                dirName: paths[i],
                path: paths[i]
              }
            } else {
              dirParents[i] = {
                dirName: paths[i],
                path: dirParents[i - 1].path + '/' + paths[i]
              }
            }
          }
        }
      }
      return dirParents
    },
    // 表格数据
    tableDatas() {
      let datas = []
      let { files, dirs } = this.dirFilesVo
      datas = (dirs || []).concat(files || [])
      return datas
    },
    selectedLength() {
      return Object.values(this.selectedDirAndFiles).length
    },

    uploadSuccessFilesCnt() {
      return this.$store.getters.getUploadSuccessFilesCnt
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    $route: 'init',
    uploadSuccessFilesCnt: 'throttleRefresh'
  }
}
</script>

<style lang="less">
@import url('~@/views/bss/file/components/index.less');

.breadcrumb-item a {
  color: #09aaff;
}
</style>
