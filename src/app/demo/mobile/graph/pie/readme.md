所有graph data从ajax获取的数据的格式必须是table data的格式

### PieGraphData

对header的格式要求是[...legend]

对data的格式要求是

```
[
    [...value]
]

```

```
{
    "header": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    "data": [
        [120, 220, 150, 320, 820]
    ]
}
```

### PieGraphDataByRow

对data的格式要求是

```
{
    "rowDescriptor": ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    "data": [
        [120],
        [220],
        [150],
        [320],
        [820]
    ]
}
```
