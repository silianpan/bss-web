import IncomeOutgo from './income-outgo'
import IncomeTaxAndNot from './income-tax-and-not'
import IncomeTax from './income-tax'
import IncomeTaxNot from './income-tax-not'
import OutgoFunc from './outgo-func'
import OutgoEcon from './outgo-econ'
import IncomeEcon from './income-econ'
export default {
  components: {
    IncomeOutgo,
    IncomeTaxAndNot,
    IncomeTax,
    IncomeTaxNot,
    OutgoEcon,
    OutgoFunc,
    IncomeEcon
  },
  props: {
    conditions: Array,
    qc: Object
  }
}
