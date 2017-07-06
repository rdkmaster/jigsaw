
# 单选框

## API

### Select

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| width | 控件宽度 | string: number/px/% | 300px |
| height | 控件高度 | string: number/px/% | 28px |
| value | radio的表单值 `双绑` | json object | - |
| valueChange | value变化的回调 | EventEmitter | - |
| trackItemBy | 设置对象的标识 | string或者string[] | labelField的值 |
| labelField | 显示在界面上的属性名 | string | 'label' |
| placeholder | placeholder | string | - |
| scrollable | option加滚动条 | boolean | false |
| optionWidth | option加宽度 | string: number/px/% | 100% |
| optionHeight | option加高度 `配合scrollable使用` | string: number/px | - |

### Option
| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| optionItem | option数据 | json object | - |
