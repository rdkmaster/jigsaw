所有graph data从ajax获取的数据的格式必须是table data的格式

### DoughnutGraphData

对data的格式要求是[value, name]

```
{
    "header": ["次数", "来源"],
    "field": ["field1", "field2"],
    "data": [
        [52, "终端"],
        [15, "无线网"],
        [15, "互联网"],
        [18, "核心网"]
    ]
}
```

### DoughnutRateGraphData

对data的格式要求是[value]

### DoughnutScoreGraphData

对data的格式要求是[value, name]


