
# 平铺选择框

## API

### TileSelect

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| width | 控件宽度 | string: number/px/% | 100% |
| selectedItems | 选中的数值 `双绑` | any[] | - |
| selectedItemsChange | selectedItems变化的回调 | EventEmitter | - |
| trackItemBy | 设置对象的标识 | string或者string[] | labelField的值 |
| labelField | 显示在界面上的属性名 | string | 'label' |
| multipleSelect | 判断是否支持多选 | boolean | true |
| searchable | 搜索功能 | boolean | false |

### TileOption
| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| width | 控件宽度 | string: number/px/% | 50px |
| height | 控件高度 | string: number/px/% | 28px |
| optionItem | option数据 | json object | - |
