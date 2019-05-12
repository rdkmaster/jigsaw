所有graph data从ajax获取的数据的格式必须是table data的格式

### RadarGraphData

对header的格式要求是[...radar, legend]

对data的格式要求是

```
{
    "rowDescriptor": ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
    "header": ["销售（sales）", "管理（Administration）", "信息技术（Information Techology）", "客服（Customer Support）", "研发（Development）", "市场（Marketing）"],
    "data": [
        [4300, 10000, 28000, 35000, 50000, 19000],
        [5000, 14000, 28000, 31000, 42000, 21000],
        [6500, 16000, 30000, 38000, 52000, 25000]
    ]
}
```


