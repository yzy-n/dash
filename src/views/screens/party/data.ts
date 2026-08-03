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

export type PartyStructureData = {
  title: string
  genderStats: PartyMetric[]
  ageStats: PartyDistItem[]
  joinStats: PartyDistItem[]
  eduLeft: PartyDistItem[]
  eduRight: PartyDistItem[]
  jobStats: PartyBubbleItem[]
}

export type PartyLeftData = {
  orgTitle: string
  orgTotal: string
  orgList: PartyOrgItem[]
  starsTitle: string
  starsTotal: string
  starRows: PartyStarRow[]
  structurePanel: PartyStructureData
}

export type PartyCenterData = {
  title: string
  topStats: PartyMetric[]
  leftBlocks: Array<{ title: string; rows: PartyMetric[] }>
  rightBlocks: Array<{ title: string; rows: PartyMetric[] }>
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
    ],
    structurePanel: {
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
    }
  },
  center: {
    title: '党员结构',
    topStats: [
      { label: '党员总数', value: '258750名' },
      { label: '预备党员', value: '3122名' },
      { label: '发展党员', value: '2924名' },
      { label: '大专及以上', value: '129303名' },
      { label: '基层党组织总数', value: '11411个' }
    ],
    leftBlocks: [
      {
        title: '党员人数',
        rows: [
          { label: '中省直单位', value: '4066名' },
          { label: '市直单位', value: '29433名' },
          { label: '海城市', value: '61561名' },
          { label: '台安县', value: '20750名' },
          { label: '岫岩县', value: '26726名' },
          { label: '铁东区', value: '46198名' },
          { label: '铁西区', value: '18108名' },
          { label: '立山区', value: '30299名' },
          { label: '千山区', value: '8476名' },
          { label: '高新区', value: '7554名' },
          { label: '经开区', value: '4646名' },
          { label: '风景区', value: '933名' }
        ]
      },
      {
        title: '预备党员人数',
        rows: [
          { label: '中省直单位', value: '104名' },
          { label: '市直单位', value: '1158名' },
          { label: '海城市', value: '619名' },
          { label: '台安县', value: '246名' },
          { label: '岫岩县', value: '307名' },
          { label: '铁东区', value: '141名' },
          { label: '铁西区', value: '79名' },
          { label: '立山区', value: '126名' },
          { label: '千山区', value: '100名' },
          { label: '高新区', value: '68名' },
          { label: '经开区', value: '117名' },
          { label: '风景区', value: '57名' }
        ]
      }
    ],
    rightBlocks: [
      {
        title: '发展党员人数',
        rows: [
          { label: '中省直单位', value: '102名' },
          { label: '市直单位', value: '1044名' },
          { label: '海城市', value: '616名' },
          { label: '台安县', value: '241名' },
          { label: '岫岩县', value: '288名' },
          { label: '铁东区', value: '130名' },
          { label: '铁西区', value: '79名' },
          { label: '立山区', value: '110名' },
          { label: '千山区', value: '98名' },
          { label: '高新区', value: '68名' },
          { label: '经开区', value: '116名' },
          { label: '风景区', value: '32名' }
        ]
      },
      {
        title: '基层党组织数量',
        rows: [
          { label: '中省直单位', value: '225个' },
          { label: '市直单位', value: '2068个' },
          { label: '海城市', value: '2784个' },
          { label: '台安县', value: '883个' },
          { label: '岫岩县', value: '1066个' },
          { label: '铁东区', value: '1380个' },
          { label: '铁西区', value: '726个' },
          { label: '立山区', value: '1065个' },
          { label: '千山区', value: '445个' },
          { label: '高新区', value: '403个' },
          { label: '经开区', value: '325个' },
          { label: '风景区', value: '41个' }
        ]
      }
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
