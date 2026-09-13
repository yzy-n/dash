## 1. 通用返回外壳（建议统一）

前端 `requestData` 解析规则：当返回对象包含 `data` 字段时，会取 `data`；并且当 `code` 存在且不为 `0/200` 时抛错。

建议统一：

```json
{ "code": 0, "message": "ok", "data": {} }
```

---

## 2. 推荐：整屏一次性接口

### GET /service/bigscreen/full

Query（可选）：

- `date`：字符串（如 `2023-05` / `2022年统计数据`）
- `area`：字符串（默认 `全市`）

返回 `data` 结构（只保留字段，不写类型定义）：

```json
{
  "meta": {
    "dateOptions": [],
    "electricityTabs": [],
    "capacityTabs": [],
    "projectTabs": [],
    "energyTabs": [],
    "gasTabs": [],
    "waterTypes": [],
    "heatingTabs": [],
    "resumeIndustryOptions": []
  },
  "left": {
    "electricity": {
      "date": "",
      "activeTab": "",
      "metrics": [{ "label": "", "value": 0, "unit": "" }],
      "pie": [{ "name": "", "value": 0 }]
    },
    "capacity": {
      "date": "",
      "activeTab": "",
      "metrics": [{ "label": "", "value": 0, "unit": "" }],
      "rings": [{ "name": "", "value": 0 }]
    },
    "resume": {
      "date": "",
      "industry": "",
      "workRate": 0,
      "prodRate": 0,
      "unit": "%"
    },
    "chargingPile": {
      "date": "",
      "topKpis": [{ "label": "", "value": 0, "unit": "" }],
      "totalKpis": [{ "label": "", "value": 0, "unit": "", "yoy": 0, "yoyUnit": "%" }],
      "chart": {
        "categories": [],
        "series": [{ "name": "", "data": [] }],
        "unit": ""
      }
    },
    "projects": {
      "date": "",
      "activeTab": "",
      "total": 0,
      "done": 0,
      "todo": 0,
      "doneRate": 0,
      "todoRate": 0
    },
    "energy": {
      "date": "",
      "activeTab": "",
      "total": 0,
      "totalUnit": "",
      "chart": { "categories": [], "values": [], "unit": "" }
    }
  },
  "center": {
    "date": "",
    "facility": {
      "leftOuter": [
        { "label": "", "anshan": 0, "liaoning": 0, "anshanTrend": "up", "liaoningTrend": "down" }
      ],
      "leftInner": [{ "label": "", "anshan": 0, "liaoning": 0 }],
      "rightOuter": [{ "label": "", "anshan": 0, "liaoning": 0 }],
      "rightInner": [{ "label": "", "anshan": 0, "liaoning": 0 }]
    }
  },
  "right": {
    "gas": {
      "date": "",
      "activeTab": "",
      "gaugeValue": 0,
      "metrics": [{ "pos": "lt", "label": "", "value": 0, "unit": "" }]
    },
    "water": {
      "date": "",
      "activeType": "",
      "chart": { "categories": [], "values": [], "unit": "" }
    },
    "towers": {
      "date": "",
      "total": 0,
      "totalUnit": "",
      "legend": [{ "label": "", "value": 0, "unit": "", "rate": 0, "rateUnit": "%" }],
      "pie": [{ "name": "", "value": 0 }]
    },
    "heating": {
      "date": "",
      "activeTab": "",
      "rows": [{ "label": "", "value": 0, "unit": "" }]
    },
    "redcross": {
      "date": "",
      "top": [{ "label": "", "value": 0, "unit": "" }],
      "cards": [{ "label": "", "value": 0, "unit": "" }]
    },
    "aed": {
      "date": "",
      "points": [{ "x": 0, "y": 0, "label": "" }]
    }
  }
}
```

---

## 3. 备选：按面板拆分接口（字段同上）

如果后端更倾向按模块拆分、便于缓存/并行加载，可拆成：

- `/service/bigscreen/meta`
- `/service/bigscreen/left/electricity`
- `/service/bigscreen/left/capacity`
- `/service/bigscreen/left/resume`
- `/service/bigscreen/left/charging-pile`
- `/service/bigscreen/left/projects`
- `/service/bigscreen/left/energy`
- `/service/bigscreen/center/facility`
- `/service/bigscreen/right/gas`
- `/service/bigscreen/right/water`
- `/service/bigscreen/right/towers`
- `/service/bigscreen/right/heating`
- `/service/bigscreen/right/redcross`
- `/service/bigscreen/right/aed`
