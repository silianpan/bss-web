import CommonUtil from '@/utils/CommonUtil'
import Vue from 'vue'
// import FileUploadService from '@/api/file/file-upload'
import ajax from '@/plugins/ajax/file-upload'
import _ from 'lodash'
// 最大正在上传文件数量
// const MaxLimitUploadingFiles = 5
// 表单的文件
// 文件上传的状态
const FileUploadStatus = {
  // 排队中
  prepare: {
    status: 'prepare',
    percentage: 0,
    showProgress: false
  },
  // 正在上传中
  uploading: {
    status: 'uploading',
    showProgress: true
  },
  // 成功上传
  success: {
    status: 'success',
    file: null,
    showProgress: false
  },
  // 上传失败
  fail: {
    status: 'fail',
    showProgress: false
  }
}
export default {
  state: {
    // 上传文件存放队列
    uploadFilesQueue: {}
  },
  getters: {

    getFormUploadFileTokens: (state, getters) => (formId) => {
      return (getters.getUploadFilesByFormId(formId) || []).filter((f) => f.status === FileUploadStatus.success.status).map(f => ({ ...f.token }))
    },
    // 获取表单上传文件
    getUploadFilesByFormId: (state) => (formId) => {
      return _.filter(Object.values(state.uploadFilesQueue) || [], (f) => f.dir.formId === formId)
    },
    // 判断表单 文件是否已经上传完毕
    isFormFilesUploaded: (state, getters) => (formId) => {
      let notUploaded = _.filter(getters.getUploadFilesByFormId(formId), (f) => {
        return f.status === FileUploadStatus.prepare.status || f.status === FileUploadStatus.uploading.status
      })
      return _.isEmpty(notUploaded)
    },
    getUploadSuccessFilesCnt: (state) => {
      let squeue = Object.values(state.uploadFilesQueue).filter((f) => f.status === FileUploadStatus.success.status) || []
      return squeue.length
    }
  },
  mutations: {

    // 开始上传文件时设置 文件上传状态及 开始上传时间
    startUploadFile: (state, uid) => {
      let info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.startTime = new Date().getTime()
        Vue.set(state.uploadFilesQueue, uid, Object.assign({}, info, FileUploadStatus.uploading))
      }
    },
    uploadFileSuccess: (state, { uid, token }) => {
      let info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.endTime = new Date().getTime()
        info.token = token
        Vue.set(state.uploadFilesQueue, uid, Object.assign({}, info, FileUploadStatus.success))
      }
    },
    uploadFileFail: (state, { uid, token }) => {
      let info = state.uploadFilesQueue[uid]
      if (!_.isEmpty(info)) {
        info.endTime = new Date().getTime()
        info.token = token
        Vue.set(state.uploadFilesQueue, uid, Object.assign({}, info, FileUploadStatus.fail))
      }
    },
    // 将文件加入到上传队列中去
    pushUploadFileQueue: (state, fileInfo) => {
      Vue.set(state.uploadFilesQueue, fileInfo.uid, fileInfo)
    },
    // 更改文件上传百分比
    changeUploadFilesPercentage: (state, { uid, percentage }) => {
      if (!_.isEmpty(state.uploadFilesQueue[uid])) {
        Vue.set(state.uploadFilesQueue[uid], 'percentage', percentage)
      }
    }

  },
  actions: {

    // 删除某个表单上传的文件
    async deleteFormUploadfile({ state }, {
      formId,
      uid
    }) {
      for (let key in state.uploadFilesQueue) {
        let _file = state.uploadFilesQueue[key]
        if (_file.dir.formId === formId && key === uid) {
          Vue.delete(state.uploadFilesQueue, key)
        }
      }
    },

    //
    async deleteUploadfiles({ state }, accept) {
      for (let key in state.uploadFilesQueue) {
        if (accept && accept(key, state.uploadFilesQueue[key])) {
          Vue.delete(state.uploadFilesQueue, key)
        }
      }
    },

    // 刷新文件队列
    async refreshFilesQueue({ state, dispatch, commit }) {
      // 如果队列中正在上传的文件数量大于 最大限制 数量 则等待最大数量完成，否则调用上传文件动作
      // let uploadingQueue = []
      // let willUploadQueue = []
      for (let key in state.uploadFilesQueue) {
        let _file = state.uploadFilesQueue[key]
        if (_file.status === FileUploadStatus.prepare.status) {
          commit('startUploadFile', _file.uid)
          dispatch('startUploadFile', _file)
        }
      }
    },

    // 准备上传表单附件
    async prepareUploadFormFile({ dispatch }, { file, dir, data, action }) {
      await dispatch('prepareUploadFile', { file, dir, data, action })
    },

    // 准备文件上传
    async prepareUploadFile({ dispatch, commit }, { file, dir, data, action }) {
      if (_.isEmpty(file.uid)) {
        file.uid = CommonUtil.uuid()
      }
      // 封装成对象
      const _file = {
        // 上传状态
        status: FileUploadStatus.prepare.status,
        // 文件名
        fileName: file.name,
        extName: CommonUtil.extname(file.name),
        // 大小
        fileSize: file.size,
        // 百分比
        percentage: 0,
        uid: file.uid,
        // 是否显示进度
        showProgress: true,
        // 请求地址
        action: action,
        // 文件数据
        file: file,
        // 其他数据
        data: data || {},
        // 父级文件夹
        dir: dir || {},
        // 返回数据
        token: {}
      }
      commit('pushUploadFileQueue', _file)
      dispatch('refreshFilesQueue')
    },

    // 开始文件上传
    async startUploadFile({ dispatch, commit }, fileInfo) {
      let { data, file, uid, action } = fileInfo
      ajax({
        // headers: {},
        withCredentials: true,
        file: file,
        data: data,
        filename: 'file',
        action: action,
        onProgress: e => {
          // 更改上传百分比
          commit('changeUploadFilesPercentage', { uid, percentage: e.percent || 0 })
        },
        onSuccess: res => {
          let token = res.data
          if (res.code === 200) {
            // 更改状态为成功
            commit('uploadFileSuccess', { uid, token })
          } else {
            // 更改状态为失败
            commit('uploadFileFail', { uid, token })
          }
          // 刷新队列
          dispatch('refreshFilesQueue')
        },
        onError: () => {
          let token = {
            msg: '上传失败'
          }
          commit('uploadFileFail', { uid, token })
          dispatch('refreshFilesQueue')
        }
      })
    }
  }
}
