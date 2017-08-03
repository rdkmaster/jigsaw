# 滚动条

## 使用方式
共分两步:
### 1  添加scrollBar 组件
将滚动条添加到需要使用滚动条的ngMdule的declarations中
### 2 添加scrollBar到需要滚动条的组件
    <div jigsawScrollBar class="bar"><div>
**注意: 添加滚动条的元素,需要设置宽高，和overflow:auto(heidder)**


## API

### scrollbar

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
|  axis    | 产生滚动条的方向  | string["x", "y","yx"]| "yx"|
| theme   | 滚动条的主题样式 | string | "dark"|
| autoHideScrollbar| 是否隐藏滚动条 | boolean | false |
| scrollInit | 事件: 滚动条组件初始化后条用 | Function(e:Event)|   - |
| scrollStart | 事件: 滚动条开始滚动 | Function(e:Event) |   - |
| whileScrolling | 事件: 滚动条滚动过程中 | Function(e:Event) |   - |


