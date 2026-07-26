export type PartyOrgItem = {
  label: string
}

export type PartyStarRow = {
  label: string
  value: string
  rate: string
  stars: number
}

export type PartyMetric = {
  label: string
  value: string
}

export type PartyDistItem = {
  label: string
  value: string
}

export type PartyBubbleItem = {
  rate: string
  label: string
  count: string
}

export type PartyLeftData = {
  orgTitle: string
  orgTotal: string
  orgList: PartyOrgItem[]
  starsTitle: string
  starsTotal: string
  starRows: PartyStarRow[]
}

export type PartyCenterData = {
  title: string
  genderStats: PartyMetric[]
  ageStats: PartyDistItem[]
  joinStats: PartyDistItem[]
  eduLeft: PartyDistItem[]
  eduRight: PartyDistItem[]
  jobStats: PartyBubbleItem[]
}

export type PartyRightData = {
  topStats: PartyMetric[]
  ringStats: PartyMetric[]
  rankingRows: PartyMetric[]
  chartRows: PartyMetric[]
}

export type PartyScreenData = {
  left: PartyLeftData
  center: PartyCenterData
  right: PartyRightData
}

export const partyScreenMock: PartyScreenData = {
  left: {
    orgTitle: '鞍山市先进基层党组织',
    orgTotal: '200',
    orgList: [
      { label: '海城市纪委监委机关党委' },
      { label: '海城市腾鳌镇党群服务中心党支部' },
      { label: '海城市孤山镇党委' },
      { label: '海城市八里镇党委' }
    ],
    starsTitle: '星级党支部',
    starsTotal: '5309',
    starRows: [
      { label: '三星党支部总数', value: '885个', rate: '16.67%', stars: 3 },
      { label: '二星党支部总数', value: '3281个', rate: '61.80%', stars: 2 },
      { label: '一星党支部总数', value: '1143个', rate: '21.53%', stars: 1 }
    ]
  },
  center: {
    title: '党员结构',
    genderStats: [
      { label: '男性', value: '66.31%' },
      { label: '女性', value: '33.69%' }
    ],
    ageStats: [
      { label: '30岁及以下', value: '13234名 / 5.11%' },
      { label: '31-45岁', value: '67272名 / 26.00%' },
      { label: '46-60岁', value: '77599名 / 29.99%' },
      { label: '61岁及以上', value: '100645名 / 38.90%' }
    ],
    joinStats: [
      { label: '新中国成立前', value: '197名 / 0.07%' },
      { label: '新中国成立后至十一届三中全会前', value: '39721名 / 15.35%' },
      { label: '十一届三中全会后至十八大前', value: '180860名 / 69.90%' },
      { label: '党的十八大以来', value: '37972名 / 14.68%' }
    ],
    eduLeft: [
      { label: '大专以下', value: '129447名 / 50.02%' },
      { label: '大学本科', value: '69081名 / 26.70%' }
    ],
    eduRight: [
      { label: '大学专科', value: '54489名 / 21.06%' },
      { label: '研究生', value: '5733名 / 2.22%' }
    ],
    jobStats: [
      { rate: '29.90%', label: '公有制单位', count: '77377名' },
      { rate: '3.85%', label: '非公企业', count: '9952名' },
      { rate: '0.57%', label: '社会组织', count: '1477名' },
      { rate: '23.05%', label: '农牧渔民', count: '59652名' },
      { rate: '0.32%', label: '学生', count: '819名' },
      { rate: '35.10%', label: '离退休人员', count: '90813名' },
      { rate: '7.21%', label: '其他', count: '18660名' }
    ]
  },
  right: {
    topStats: [
      { label: '党员总数', value: '28750' },
      { label: '组织数量', value: '3122' },
      { label: '品牌支部', value: '2924' },
      { label: '志愿时长', value: '129305h' }
    ],
    ringStats: [
      { label: '主题党日', value: '1288次' },
      { label: '三会一课', value: '968次' },
      { label: '志愿活动', value: '634场' }
    ],
    rankingRows: [
      { label: '海城市', value: '9854' },
      { label: '台安县', value: '4977' },
      { label: '岫岩县', value: '8444' },
      { label: '铁东区', value: '2577' },
      { label: '铁西区', value: '1477' },
      { label: '立山区', value: '1977' }
    ],
    chartRows: [
      { label: '党员发展', value: '84.4%' },
      { label: '组织覆盖', value: '98.6%' },
      { label: '教育完成', value: '92.4%' },
      { label: '活动参与', value: '88.4%' }
    ]
  }
}
