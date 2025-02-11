<!--  -->
<template>
<div @mouseenter="onHover=true" @mouseleave="onHover=false" class="feed-back-item-container">
  <p class="time">{{data.title || ''}}</p>
  <div class=" mt-8">
    <!-- <Icon type="md-attach" color="#5cadff" /> -->
    <!-- <a>
      <span class="list-title">
        3个附件
      </span>
    </a> -->
  </div>
  <div v-if="data.reviewed " class=" mt-8">
    <span style="color:grey">代表满意评分</span>
    <span class="ml-16">
      <Rate disabled show-text :value="data.stars || 0" />
    </span>
  </div>
  <div v-else class=" mt-8">
    <span style="color:grey">未查阅 （人大代表未查看）</span>
  </div>
  <div v-if="onHover" class="feed-back-item-actions">
    <div v-has-per="['bss-npc-advice-feedback-btns']" class="mt-8">
      <Poptip placement="top-end" confirm title="确定删除此反馈？" @on-ok="handleDeleteClick">
        <Button type="error" :loading="btnLoading" size="small">删除</Button>
      </Poptip>
      <Button @click="handleModifyClick" :loading="btnLoading" class="ml-16" size="small">
        修改
      </Button>
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
    return {
      onHover: false,
      btnLoading: false
    }
  },
  methods: {
    handleDeleteClick() {
      this.$emit('on-delete', Object.assign({}, this.data))
    },
    handleModifyClick() {
      this.$emit('on-modify', Object.assign({}, this.data))
    }
  },
  mounted: function () {},
  computed: {}
}
</script>

<style lang="less" scoped>
.feed-back-item-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}

.feed-back-item-actions {
  position: absolute;
  bottom: 0px;
  right: 10px;
}
</style>
