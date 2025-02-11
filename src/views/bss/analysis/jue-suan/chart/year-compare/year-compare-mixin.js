import Summary from '@/views/bss/analysis/jue-suan/chart/year-compare/summary'
import IncomeTax from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax'
import IncomeTaxYear from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-year'
import IncomeTaxNot from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-not'
import IncomeTaxNotYear from '@/views/bss/analysis/jue-suan/chart/year-compare/income-tax-not-year'
import OutgoFunc from '@/views/bss/analysis/jue-suan/chart/year-compare/outgo-func'
import OutgoEcon from '@/views/bss/analysis/jue-suan/chart/year-compare/outgo-econ'
export default {
  components: {
    Summary,
    IncomeTax,
    IncomeTaxYear,
    IncomeTaxNot,
    IncomeTaxNotYear,
    OutgoFunc,
    OutgoEcon
  },
  props: {
    conditions: Array,
    qc: Object
  }
}
