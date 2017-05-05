
# 滑动条

## API

### Slider
| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| value | 滑动条的值 | number, array[number,number]| - |
| range | 是否支持双触点 | 双触点, value需要传入数组 | false |
| min | 最小值 | number | - |
| max | 最大值 | number | - |
| step | 步长 | 每次改变的最小值 | - |
| vertical | 垂直滑动条 | boolean | false |
| disabled | 是否不可滑动 | boolean | false|
| marks | 标签 | [Object<label, value>] | - |
| change | 滑动值变化事件 | number | - |
