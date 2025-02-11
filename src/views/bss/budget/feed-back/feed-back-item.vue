<template>
<div class="feedBack-item-container">
  <p class="time">
    <Tag color="volcano">{{$moment(data.crtTime).format('YYYY年MM月DD日')}}</Tag>
    <Tag v-if="data.appendix" color="green" @click.native="handleFileClick(data)" style="cursor: pointer">附件</Tag>
  </p>
  <p class="time">{{data.title}}</p>
  <div class=" mt-8">
    <div v-if="data.reviewed" class=" mt-8">
      <span style="color:grey">代表满意评分</span>
      <span class="ml-16">
        <Rate disabled show-text :value="data.stars || 0" />
      </span>
    </div>
    <div v-else class="mt-8">
      <Button v-if="!showReviewedStar" @click="handleReviewedClick" size="small" type="error" style="font-size:12px">点击评分</Button>
      <div v-else class="mt-8">
        回复满意度调查：
        <Rate @on-change="handleStarChange" show-text :value="data.stars || 0" />
      </div>
    </div>

  </div>
  <div class="mt-8">
    <div style="color:grey" :class="{ 'show-more': showMore }">
      {{data.content}}
    </div>
    <span v-if="data.content && data.content.length > 87" @click="showMore = !showMore" style="color: blue; cursor: pointer; text-decoration: underline">{{ showMore ? '展开' : '收起' }}</span>
  </div>
</div>
</template>

<script>
import NpcAdvicesFeedbackService from '@/api/sys/npc/feedback'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      feedBackBtn: false,
      showMore: true,
      showReviewedStar: false
    }
  },
  methods: {
    handleReviewedClick() {
      this.showReviewedStar = true
      // 更改反馈意见状态
      //
    },
    handleStarChange(star) {
      this.$Modal.confirm({
        title: `确认`,
        content: `您确认评分吗？`,
        onOk: async () => {
          let feedbackItem = Object.assign({}, this.data)
          feedbackItem.stars = star
          feedbackItem.reviewed = true
          let rb = await NpcAdvicesFeedbackService.saveForm({
            feedback: feedbackItem
          })
          if (rb.ok()) {
            this.$Message.success('评分成功')
          }
        }
      })
    },
    handleFileClick(data) {
      this.$emit('feedback-file', data)
    }
  }
}
</script>

<style lang="less" scoped>
.feedBack-item-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}

.feedBack-item-actions {
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
