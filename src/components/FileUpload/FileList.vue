<!--  -->
<template>
  <div class="uploader-list i-scrollbar-hide">
    <ul class="container" id="uploaderList">
      <template v-for="(item, index) in data">
        <li
          :class="[
            'file-list',
            `status-${item.status || 'success'}`,
            isFormalFile(item) ? 'file-list-hover' : ''
          ]"
          @mouseenter="selectedFile = item"
          @mouseleave="selectedFile = {}"
          :key="index"
        >
          <div
            class="process"
            v-if="item.showProgress"
            :style="{ width: `${item.percentage}%` }"
          ></div>
          <div class="info">
            <div class="u-file-name" :title="item.name">
              <div :class="['file-small-icon', `small-${item.extName}`]"></div>
              <span class="name-text" @click="handleDownloadClick(item)">{{
                item.fileName
              }}</span>
            </div>
            <div class="file-size">{{ formatSize(item) }}</div>
            <div class="file-path">
              <span v-if="!$_.isEmpty(item.dir)" class="server-path">{{
                item.dir.dirName
              }}</span>
            </div>
            <div class="file-status">
              <span class="prepare">准备上传</span>
              <span class="uploading">
                <span>{{ $_.ceil(item.percentage, 2) }}%</span>
              </span>
              <span class="fail">
                <Tag color="red">{{
                  item.fileSize >= 104857600 ? '文件超过100M' : '服务器错误'
                }}</Tag>
              </span>
              <span class="success">
                <Icon type="md-checkmark-circle" size="18" color="#19be6b" />
                {{ formatTime(item) }}
                <Tag
                  color="cyan"
                  :class="['preview', showPreview(item) ? 'preview-tag' : '']"
                  @click.native.stop="handlePreviewClick(item)"
                >
                  <Icon
                    style="margin-right: 2px; position: relative; bottom: 2px"
                    custom="iconfont icon-preview"
                    size="15"
                  ></Icon
                  >可预览
                </Tag>
              </span>
            </div>
            <div v-if="showOpt" class="file-operate">
              <span class="operate-remove">
                <Poptip
                  placement="top-end"
                  transfer
                  confirm
                  title="确定移除此文件？"
                  @on-ok="handleDeleteClick(item)"
                >
                  <Button type="error" size="small">删除</Button>
                </Poptip>
              </span>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import FileUploadService from '@/api/file/file-upload'
import Config from '@/config'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showOpt: {
      type: Boolean,
      default: () => false
    }
  },
  components: {},
  data() {
    return {
      status: '',
      selectedFile: {}
    }
  },
  methods: {
    isFormalFile(item) {
      return this.$_.isNil(item.uid)
    },
    handlePreviewClick(item) {
      // 正式环境使用
      let serverPath = `http://192168100200.mysoft.com.cn/api/fileblocks/formal/${item.path}`
      window.open(`${Config.OfficeWebAppServer}${serverPath}`, '_blank')

      // libreoffice环境使用
      // console.log('item', item)
      // window.open(Config.OfficeWebAppServer + '/loleaflet/dist/loleaflet.html?file_path=' + encodeURIComponent('file:///opt/lool/file-upload/formal/' + item.path))
    },
    handleDownloadClick(item) {
      FileUploadService.download(item.fileName + '.' + item.extName, item.path)
    },
    handleDeleteClick(item) {
      this.$emit('on-delete', item)
    },
    formatSize(item) {
      let size = this.$_.ceil(this.$_.divide(item.fileSize, 1024 * 1024), 2)
      return `${size} M`
    },
    formatTime(item) {
      let { endTime, startTime } = item
      let formatTime = '已保存'
      if (endTime && startTime) {
        let m = endTime - startTime
        if (m <= 1000) {
          formatTime = '秒传'
        } else if (m > 1000 && m < 1000 * 1000) {
          formatTime = this.$_.ceil(this.$_.divide(m, 1000), 2) + '秒'
        } else if (m >= 1000 * 1000) {
          formatTime = this.$_.ceil(this.$_.divide(m, 1000 * 1000), 2) + '分钟'
        }
      }
      return formatTime
    },
    showPreview(item) {
      if (this.$_.isNil(item.id)) {
        return false
      } else {
        let previewAvalible = this.$store.state['bss-app'].previewAvalibleList
        return (
          this.selectedFile.id === item.id &&
          previewAvalible.indexOf(item.extName) !== -1
        )
      }
    }
  },
  mounted: function() {},
  computed: {}
}
</script>

<style lang="less" scoped>
.uploader-list {
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  pointer-events: auto !important;
  width: 100%;
  height: 349px;

  & .container {
    position: relative;
    overflow: hidden;
    color: #666;
    margin: 0px;
  }
}

.file-list {
  position: relative;
  height: 49px;
  border-bottom: 1px solid #f2f6fd;
  line-height: 49px;

  .info {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .process {
    position: absolute;
    z-index: 0;
    height: 100%;
    *height: 49px;
    background: #e2eeff;
  }

  .file-status,
  .file-operate {
    > span {
      display: none;
    }
  }
}

.file-list-hover:hover {
  background-color: lightgrey;
}

.status {
  &-prepare {
    .file-status {
      .prepare {
        display: block;
      }
    }
  }

  &-uploading {
    .file-status {
      .uploading {
        display: block;
      }
    }
  }

  &-success {
    .file-operate {
      .operate-remove {
        display: block;
      }
    }

    .file-status {
      .success {
        display: block;

        .preview {
          display: none;
        }

        .preview-tag {
          cursor: pointer;
          display: inline-block !important;
        }
      }
    }
  }

  &-fail {
    .file-operate {
      .operate-remove {
        display: block;
      }
    }

    .file-status {
      .fail {
        display: block;
      }
    }
  }
}

.u-file-name {
  position: relative;
  float: left;
  overflow: hidden;
  width: 43%;
  height: 49px;
  white-space: nowrap;
  text-indent: 45px;
  text-overflow: ellipsis;

  & .name-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .name-text:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.file-size {
  float: left;
  width: 13%;
  height: 49px;
  text-indent: 10px;
}

.file-path {
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 13%;
  height: 49px;

  .server-path {
    color: #5d9cff;
  }
}

.file-status {
  position: relative;
  float: left;
  width: 21%;
  height: 49px;
}

.file-operate {
  float: left;
  width: 10%;
  height: 49px;
}

.file-small-icon {
  position: absolute;
  top: 12px;
  left: 13px;
  width: 24px;
  height: 24px;
  margin: 0px;
}

ul,
li,
ol {
  list-style: none;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  // padding-inline-start: 0px;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}
</style>
