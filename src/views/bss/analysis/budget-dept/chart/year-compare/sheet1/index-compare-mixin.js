import Summary from './summary'
import FaDetail from '@/views/bss/analysis/budget-dept/chart/index-compare/sheet1/fa-detail'
export default {
  components: {
    Summary,
    FaDetail
  },
  props: {
    conditions: Array,
    qc: Object,
    groupField: {
      type: String,
      default: 'year'
    }
  }
}
