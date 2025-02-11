<template>
  <div @mouseenter="adviceBtn = true" @mouseleave="adviceBtn = false" class="advice-item-container">
    <p class="time">
      <Tag color="volcano">{{$moment(data.crtTime).format('YYYY年MM月DD日')}}</Tag>
      <Tooltip content="已反馈" placement="top">
        <Tag color="green" v-if="data.replied" @click.native="handleRepliedClick(data)" style="cursor: pointer">
          <Icon style="margin-right: 2px; position: relative; bottom: 2px" custom="iconfont icon-message" size="15"></Icon>
        </Tag>
      </Tooltip>
    </p>
    <p class="time">{{data.title}}</p>
    <div class=" mt-8">
      <!-- <Icon type="md-attach" color="#5cadff" /> -->
      <!-- <a>
        <span class="list-title">
          3个附件
        </span>
      </a> -->
    </div>
    <div class="mt-8">
      <div style="color:grey" :class="{ 'show-more': showMore }">
        {{data.content}}
      </div>
      <span v-if="data.content && data.content.length > 87" @click="showMore = !showMore" style="color: blue; cursor: pointer; text-decoration: underline">{{ showMore ? '展开' : '收起' }}</span>
    </div>
    <div v-if="adviceBtn" class="advice-item-actions">
      <div class="mt-8">
        <Poptip v-has-per="['bss-budget-advice-del-btn']" placement="top-end" confirm title="确定删除此意见？" @on-ok="handleDeleteClick(data)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
        <Button v-has-per="['bss-budget-advice-modify-btn']" @click="handleEditClick(data)" class="ml-16" size="small">修改</Button>
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
  data() {
    return {
      adviceBtn: false,
      showMore: true
    }
  },
  methods: {
    handleRepliedClick(data) {
      this.$emit('advice-replied', data)
    },
    handleDeleteClick(data) {
      this.$emit('advice-del', data)
    },
    handleEditClick(data) {
      this.$emit('advice-edit', data)
    }
  }
}
</script>

<style lang="less" scoped>
.advice-item-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}

.advice-item-actions {
  position: absolute;
  bottom: 0px;
  right: 10px;
}

.show-more {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
