# Jigsaw皮肤
## 颜色变量说明
### background 背景色

#### 大面积背景
- `$bg-body` => 大面积背景色，用于页面背景
- `$bg-container` => 大面积背景色，用于容器背景（卡片）
- `$bg-app` => 默认的大屏背景色（Awade专属、非规范、创建大屏时的应用背景）

#### 组件背景
- `$bg-component` => 组件背景
- `$bg-component-darken` => 组件背景（偏灰）（date-picker）
- `$bg-transparent` => 透明背景
- `$bg-popup` => 弹框背景（dialog、notification、toast）
- `$bg-gray` => 灰色背景（tag、表头）
- `$bg-gray-spec` => 特殊的灰色背景，亮色下为白色，深色下为亮灰色（switch）

#### 状态
- `$bg-disabled` => 禁用背景
- `$bg-hover` => 悬停背景
- `$bg-active` => 点击背景

#### 其他背景
- `$bg-scrollbar` => 滚动条
- `$bg-scrollbar-lighten` => 滚动条（偏浅）

### font 字体颜色
- `$font-color-default` => 正文
- `$font-color-disabled` => 禁用文字
- `$font-color-hint` => 提示
- `$font-color-watermark` => 水印文字
- `$font-color-heading` => 非加粗标题
- `$font-color-heading-bold` => 加粗标题
- `$font-color-tag` => 标签文字
- `$font-color-white` => 深底白字，纯白色（此变量色值不会变）
- `$font-color-white-darken` => 深底白字，暗白色

### border 边框
- `$border-color-default` => 边框颜色
- `$border-color-disabled` => 边框禁用

### box-shadow 阴影（基于altitude）
- `$box-shadow-lv0` => 背景
- `$box-shadow-lv1` => 页内卡片
- `$box-shadow-lv2` => Tooltip、浮动按钮、卡片hover、popover、抽屉、下拉框、级联框 、datepicker
- `$box-shadow-lv3` => 及时消息、模态弹框、alert

### nav 导航色
- `$nav-header` => 导航条背景色

## 新皮肤满足要素
- [ ] 组件的背景色唯一。可以透明，也可以有自己的背景。