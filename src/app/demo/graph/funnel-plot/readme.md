所有graph data从ajax获取的数据的格式必须是table data的格式

### FunnelPlotGraphData

对data的格式要求是

```
[
    [value, legend],
    [value, legend]
]

```

```
{
    "data": [
        [60, '访问'],
        [40, '咨询'],
        [20, '订单'],
        [80, '点击'],
        [100, '展现']
    ]
}
```


