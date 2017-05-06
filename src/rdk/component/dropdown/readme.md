
# 下拉组件

## API

### DropDown
| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| value  | dropDown组件的值.   | string或者array| - |
| placeholder | 没有value时的提示 | string | - |
| labelField | 显示的值的属性 | string | 'label' |
| disabled | 是否可编辑 | boolean | - |
| trigger | 触发下拉的事件 | DropDownTrigger | DropDownTrigger.click |
| dropDownWidth | dropdown 下拉内容的宽度 | string | - |
| open() | 打开下拉内容方法 | function() {} | - |
| close() |  关闭下拉内容的方法 | function() {}  | - |
