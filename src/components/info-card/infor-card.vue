<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{ width: leftWidth }">
        <!-- <common-icon class="icon" :type="icon" :size="iconSize" color="#fff"/> -->
        <div>
          <slot name="title"></slot>
        </div>
      </div>
      <div
        class="right-area"
        :style="{ width: rightWidth, background: color, color: '#fff' }"
      >
        <div>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
// import CommonIcon from '_c/common-icon'
export default {
  name: 'InforCard',
  props: {
    left: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftWidth() {
      return `${this.left}%`
    },
    rightWidth() {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size {
  width: 100%;
  height: 100%;
}
.middle-center {
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper {
  border: 1px solid #f6bcbc;
  .size;
  overflow: hidden;
  .ivu-card-body {
    .size;
  }
  .content-con {
    .size;
    position: relative;
    .left-area {
      .common;
      & > div {
        .middle-center;
      }
    }
    .right-area {
      .common;
      & > div {
        .middle-center;
      }
    }
  }
}
</style>
