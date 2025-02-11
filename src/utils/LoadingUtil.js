import iView from 'view-design'

export const startLoading = () => {
  iView.Spin.show({
    render: h => {
      return h('div', [
        h('Icon', {
          attrs: {
            style: 'animation: ani-demo-spin 1s linear infinite'
          },
          props: {
            type: 'ios-loading',
            size: 18
          }
        }),
        h('div', '正在提交请求，请耐心等待。。。')
      ])
    }
  })
}
export const endLoading = () => {
  iView.Spin.hide()
}
