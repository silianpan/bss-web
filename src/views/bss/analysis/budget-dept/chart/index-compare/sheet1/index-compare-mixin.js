import IncomeOutgo from './income-outgo'
import FaDetail from './fa-detail'
export default {
  components: {
    IncomeOutgo,
    FaDetail
  },
  props: {
    conditions: Array,
    qc: Object
  }
}
