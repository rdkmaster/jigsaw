所有graph data从ajax获取的数据的格式必须是table data的格式

### RelationalGraphData

对data的格式要求是

```
[
    [...value],
    [...xAxisData],
    [...links]
]

```

```
{
    "data": [
        [872, 1190, 2192, 1513, 662, 4344, 6429],
        ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        [
            {source:0,target:1},
            {source:1,target:2},
            {source:2,target:3},
            {source:3,target:4},
            {source:4,target:5},
            {source:5,target:6}
        ]
    ]
}
```


