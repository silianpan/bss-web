export const typeToName = {
  making: '预算编制',
  adjustment: '预算调整',
  execution: '预算执行',
  'final-account-making': '决算编制'
}

/**
 * 预算编制级别
 */
export const budgetMakeLevel = {
  totalLv: '总预/决算',
  thisLv: '本级',
  deptLv: '部门'
}

export const budgetFinalMakeLevel = {
  totalLv: '总决算',
  thisLv: '本级',
  deptLv: '部门'
}

export const budgetFinalMakeLevel2 = {
  totalLv: '总预算',
  thisLv: '本级'
}

export const budgetFinalTypeOptions = {
  totalLv: [
    {
      value: '一般公共预算',
      name: '一般公共预算'
    },
    {
      value: '政府性基金预算',
      name: '政府性基金预算'
    },
    {
      value: '国有资本经营预算',
      name: '国有资本经营预算'
    },
    {
      value: '社会保险基金预算',
      name: '社会保险基金预算'
    },
    {
      value: '地方政府债务',
      name: '地方政府债务'
    }
  ],
  thisLv: [
    {
      value: '一般公共预算',
      name: '一般公共预算'
    },
    {
      value: '政府性基金预算',
      name: '政府性基金预算'
    },
    {
      value: '国有资本经营预算',
      name: '国有资本经营预算'
    },
    {
      value: '社会保险基金预算',
      name: '社会保险基金预算'
    },
    {
      value: '地方政府债务',
      name: '地方政府债务'
    }
  ],
  deptLv: [
    {
      value: '一般公共预算',
      name: '一般公共预算'
    },
    {
      value: '政府性基金预算',
      name: '政府性基金预算'
    }
  ]
}
