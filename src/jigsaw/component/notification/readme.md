
# Notification

## API

## show

//TODO 按钮 宽度目前是指定的（修改宽高的入口？show函数？）

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| message | 内容 | string |  |
| caption | 标题 | string |  |
| icon | 图标 | string |  |
| position | 弹出的位置 | NotificationPosition | rightTop |
| timeout | 自动消失的毫秒数 | number |  |
| buttons | 提示框的按钮 | ButtonInfo[] |  |
| callback | 回调函数 | DialogCallback |  |
| callbackContext | 回调函数上下文 | any |  |
