<!--  -->
<template>
<div class="paper-wrapper" @click="handleClick">
  <div class="paper-content-wrapper">
    <div v-if="data.replied" style="position:absolute;left:0px;top:10px;">
      <custom-icon type="iconfont icon-yifankui" :size="25" color="#5cadff"></custom-icon>
    </div>
    <div v-else style="position:absolute;left:-10px;top:7px;opacity:0.7">
      <custom-icon type="iconfont icon-wei" :size="40" color="red"></custom-icon>
    </div>
    <div class="paper-content">
      <div class="paper-content-title">{{data.title}}</div>
      <Divider dashed style="margin:12px 0"></Divider>
      <div class="paper-content-main">
        {{data.content}}
      </div>
      <div class="paper-content-bottom">
        <Divider dashed style="margin:12px 0"></Divider>
        <p>
          <Icon type="ios-time-outline" /> 时间：{{$moment(data.crtTime).fromNow()}}</p>
        <p v-if="!$_.isEmpty(data.deptName)">
          责任单位：<Tag color="blue">{{data.deptName}}</Tag>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit('on-click', Object.assign({}, this.data))
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style lang="less" scoped>
.paper-wrapper {
  margin-right: auto;
  margin-left: auto;
  max-width: 300px;
  box-sizing: border-box;
  word-wrap: break-word !important;
  cursor: pointer;
}

.paper-content-wrapper {
  max-width: 100%;
  position: relative;
  border-style: solid;
  -webkit-border-image: url('~@/assets/images/advice/advice-bg.jpeg') 30 fill;
  border-width: 20px 15px;
  line-height: 25px;
  box-sizing: border-box !important;
  word-wrap: break-word !important;
  color: #666;
  padding: 10px
}

.paper-content {
  width: 85%;
  margin: 0 auto;
  height: 300px;

  &-title {
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  &-main {
    // overflow-x: hidden;
    // overflow-y: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 16px;
    color: grey
  }

  &-bottom {
    position: absolute;
    width: 82%;
    bottom: 50px;
  }
}
</style>
