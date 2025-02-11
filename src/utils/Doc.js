import router from '@/router'
import Viewer from 'viewerjs'

export function previewDoc(name, url) {
  if (url && typeof url === 'string') {
    const downloadUrl = Config.ServerApiPrefix + '/file/upload/download'
    const convertUrl = `${downloadUrl}?name=${name}&path=${url}`
    const index = url.lastIndexOf('.')
    let suffix = url.substring(index + 1)
    if (suffix) {
      suffix = suffix.toLowerCase()
      switch (suffix) {
        case 'pdf':
          // pdf预览
          const viewerUrl = '/pdfjs/web/viewer.html'
          const { href } = router.resolve({
            name: 'SDocPreview',
            query: { viewerUrl, fileUrl: convertUrl, url, name }
          })
          window.open(href, '_blank')
          // const pdfUrl = viewerUrl + '?file=' + encodeURIComponent(convertUrl)
          // window.open(pdfUrl, '_blank')
          break
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'ppt':
        case 'pptx':
        case 'txt':
          const docUrl = '/loleaflet/dist/loleaflet.html?file_path=' + encodeURIComponent('file:///opt/lool/file-upload/formal/' + url)
          window.open(docUrl, '_blank')
          break
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'bmp':
        case 'gif':
          // 图片预览
          const image = new Image()
          image.src = convertUrl
          image.alt = name
          const viewer = new Viewer(image, {
            hidden: function() {
              viewer.destroy()
            }
          })
          // image.click()
          viewer.show()
          break
        default:
          window.open(convertUrl, '_blank')
          break
      }
    }
  }
}
