import IncomeOutgo from '@/views/bss/analysis/jue-suan/chart/index-compare/income-outgo'
import IncomeTaxAndNot from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax-and-not'
import IncomeTax from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax'
import IncomeTaxNot from '@/views/bss/analysis/jue-suan/chart/index-compare/income-tax-not'
import OutgoFunc from '@/views/bss/analysis/jue-suan/chart/index-compare/outgo-func'
import OutgoEcon from '@/views/bss/analysis/jue-suan/chart/index-compare/outgo-econ'
import IncomeEcon from '@/views/bss/analysis/jue-suan/chart/index-compare/income-econ'
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
