#### TreeData动态变化的问题

FishBone组件现在支持随TreeData动态刷新了。TreeData的数据处理可以直接放在`onAjaxComplete`中进行

TreeData的ajax callback处理顺序是：
```
ajaxSuccessHandler
     |   
     V
fromObject: 根据ajax返回的数据，生成TreeData
     |
     V
refresh: 刷新数据，异步操作
     |
     V
onAjaxSuccess --> onAjaxComplete --> onRefresh

```

在使用ChartIcon时，因为图形的渲染与FishBone无关，所以如果只是图形的数据改变了，可以不用刷新FishBone，只要遵照ChartIcon的方法刷新图形
就可以了。


