# 评分

## API

### Input

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| value | 当前值 双绑 | number | 0 |
| allowHalf | 是否允许半星 | boolean | false |
| max | 星星个数 | number |5|
| icon | 图标，支持font-awesome和iconfont | string | fa fa-star |
| disabled | 只读，无法进行交互 | boolean | false |
| valueChange | value变化的回调 | EventEmitter | - |

#### 备注
设置组件内icon的`font-size`：

```html
<jigsaw-rate class="rate-font-size"></jigsaw-rate>
```

```css
.rate-font-size{
    font-size: 20px;
}
```
