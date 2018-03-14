## v1.1.5 (2018-3-14)

### 新特性 / New Features
- https://github.com/rdkmaster/jigsaw/issues/535 增加switch功能的table内置渲染器

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- https://github.com/rdkmaster/jigsaw/pull/557 增加alert的ButtonInfo类型 
- https://github.com/rdkmaster/jigsaw/pull/552 文档生成工具
- https://github.com/rdkmaster/jigsaw/issues/543 在文档中增加demo链接

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/539 comboselect的单选模式实现错误
- https://github.com/rdkmaster/jigsaw/pull/562 解决combo-select触发下拉的时延错误
- https://github.com/rdkmaster/jigsaw/issues/500 异步new TreeData在tree组件中会报错
- https://github.com/rdkmaster/jigsaw/issues/563 Time在Combo下拉时，点击切换到配置时分秒时，会自动关闭下拉
 
## v1.1.4 (2018-3-10)

### 新特性 / New Features
- https://github.com/rdkmaster/jigsaw/issues/527 `AdditionalTableData`新增了一套API，用于通过编程的方式模拟表格可编辑渲染的行为；

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- https://github.com/rdkmaster/jigsaw/issues/372 combo的opentrigger为mouseover的时候，增加100ms左右的延迟，避免鼠标快速划过的时候触发下拉的打开
- https://github.com/rdkmaster/jigsaw/issues/533 movable指令增加一个demo，在元素既能拖拽又能点击，如何做到拖拽和点击互不干扰
- combo-select的诸多事件回调函数的清理更加及时和准确，避免这方面的泄露

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/524 additionalDataChange没有按照cacheValue发送additionalTableData
- https://github.com/rdkmaster/jigsaw/issues/414 表格翻页后，checkbox渲染器疑似有问题
- https://github.com/rdkmaster/jigsaw/issues/528 j-editable-box的LayoutData在频繁变更box tree时，会导致box内部的table报错

### API废弃 / APIs Deprecated

如下API被标记为废弃，基于向下兼容的目的他们在当前版本中会被保留，但是在后续的版本里将会被删除，请尽早采用新API替代他们。

- 废弃`AdditionalTableData.clearCachedValues()`，使用`AdditionalTableData.clearTouchedValues()`替代
- 废弃`AdditionalTableData.cacheValue()`，使用`AdditionalTableData.touchValueByRow()`替代
- 废弃`AdditionalTableData.getTouchedValue()`参数`row`为数字的重载，使用`AdditionalTableData.getTouchedValueByRow()`替代
- 废弃`AdditionalTableData.getTouchedValues()`，使用`AdditionalTableData.getAllTouched()`替代


## v1.1.3 (2018-3-6)

### 新特性 / New Features
- `jigsaw-input`支持`valid`输入属性，用于在form表单校验失败时边框变红色

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- 无 / none

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/522 table的checkbox在没有默认选中值得时候，分页存储有误
- https://github.com/rdkmaster/jigsaw/issues/508 table的additionalTableData在存储分页信息时有问题


## v1.1.2 (2018-3-4)

### 新特性 / New Features
- 无 / none

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- Tab组件启用新的selecotor `jigsaw-tabs` / `j-tabs`，原来的selector将会在v1.2版本里废弃

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/509 Table的additionalColumnDefine里先设置最后一行，再设置最前面的行时，最后一行的列会插入错误，变成倒数第二列
- https://github.com/rdkmaster/jigsaw/issues/476 fishbone图例文字显示不全


## v1.1.1 (2018-2-27)

### 新特性 / New Features
- 特性：trusted-html指令支持angular风格的函数调用语法

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- 修复：trustedHtml指令在某些情况下回调函数重复注册的问题

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/503 trustedHtml指令在某些时候回错误清理上下文对象导致回调函数失败


## v1.1.0 (2018-2-22)

### 新特性 / New Features
- **重磅功能**：增强`j-box`布局功能，支持用户在界面上拖拽调整布局尺寸，[详见这里](http://rdk.zte.com.cn/jigsaw/layout/box-layout)
- **重磅功能**：增加`j-editable-box`组件，纯数据驱动的布局方式，更加灵活，轻松实现所见即所得的布局效果，[详见这里](http://rdk.zte.com.cn/jigsaw/layout/monitor)
- **新组件**：增加`j-notification`组件，更加灵活&友好的消息提示功能，[详见这里](http://rdk.zte.com.cn/jigsaw/notification/full)
- https://github.com/rdkmaster/jigsaw/issues/481 PageableTableData支持post请求

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- https://github.com/rdkmaster/jigsaw/issues/349 增加图例和饼图间距的配置，解决描述文字模糊的问题
- https://github.com/rdkmaster/jigsaw/issues/467 table的滚动条加个最小长度
- 简化`PopupService.setPosition()`的参数列表，提升易用性

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/434 Combo在tag变化时计算下拉的位置，没有判断有没有下拉
- https://github.com/rdkmaster/jigsaw/issues/439 j-tile自动去除selectedItems里无效的条目
- https://github.com/rdkmaster/jigsaw/issues/354 【ie 11】table有时会出现渲染不出来的情况，鼠标hover上去，才渲染出来
- https://github.com/rdkmaster/jigsaw/issues/405 【ie 11】button/disabled 鼠标点击CheckBox后，四周边框黑线出现，但是box没有打上勾
- https://github.com/rdkmaster/jigsaw/issues/461 tree销毁时会把页面所有的ztree都销毁
- https://github.com/rdkmaster/jigsaw/issues/458 paginaton的page、goto支持国际化
- slider的值校验功能在组件初始化之前执行异常导致`value`的初始值在特定情况下未生效
- 修复`PopupService.show()`自动根据路由变化关闭所有对话框功能异常


## v1.1.0-rc.4 (2018-1-2)

### 新特性 / New Features

- **新增j-box组件**，同时支持垂直和水平方向上的布局，可完成任意复杂的布局要求

### 破坏性修改 / Breaking Change

- 无 / none

###  优化 / Modified

- #432 表格在数据无效的时候，将error打印改为warn打印
- #419 表格将其滚动条对象暴露出来，应用可以通过这个对象操作表格的滚动条，监听滚动条事件

### 修复 / Fixes

- #389，圆角兼容IE11的问题


## v1.1.0-rc.3 (2017-12-24)

### 新特性 / New Features
- combo组件在水平上自动扩展，达到最大宽度之后，垂直方向上自动换行

### 破坏性修改 / Breaking Change
- 无 / none

###  优化 / Modified
- 删除seed工程里少量无用代码
- https://github.com/rdkmaster/jigsaw/issues/368 tab页的内容初始化策略修改
- https://github.com/rdkmaster/jigsaw/issues/413 select组件有全局click事件未及时销毁
- 将遗漏的模块加入到JigsawModule中

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/359 [ie11]range-time的grItem功能报错
- https://github.com/rdkmaster/jigsaw/issues/374 combo-select open属性为true时，下拉内容未按照预期打开
- https://github.com/rdkmaster/jigsaw/issues/378  time在手动改变时间时，时分秒变化错误
- https://github.com/rdkmaster/jigsaw/issues/384 【IE11】鱼骨图组件IE11渲染出来后每个节点下都有个null值
- https://github.com/rdkmaster/jigsaw/issues/389 【IE11】time组件周粒度高亮有间隙


## v1.1.0-rc.1 (2017-12-8)

本版本提供的功能清单如下：

### 组件
一共提供45个各式组件，详情列出如下：

- JigsawTable 表格组件，功能强大，性能强劲，碾压绝大多数开源或者收费的angular表格，[详情请参考这里](http://rdk.zte.com.cn/components/table/demo)
- 表格内置渲染器和编辑器，[详情请参考这里](http://rdk.zte.com.cn/components/table/demo#renderer)
    - DefaultCellRenderer 默认渲染器
    - TableCellCheckboxRenderer 单元格复选框渲染器
    - TableHeadCheckboxRenderer 单元格复选框渲染器
    - TableCellTextEditorRenderer 单元格复选框渲染器
- 表单控件系列
    - JigsawButton 按钮组件，[详情请参考这里](http://rdk.zte.com.cn/components/button/demo)
    - JigsawCheckBox 复选框组件，[详情请参考这里](http://rdk.zte.com.cn/components/checkbox/demo)
    - JigsawRadioGroup 单选框组件，[详情请参考这里](http://rdk.zte.com.cn/components/radio-group/demo)
    - JigsawInput 文本框组件，[详情请参考这里](http://rdk.zte.com.cn/components/input/demo)
    - JigsawList 列表组件，[详情请参考这里](http://rdk.zte.com.cn/components/list/demo)
    - JigsawTile 平铺组件，[详情请参考这里](http://rdk.zte.com.cn/components/tile/demo)
    - JigsawSelect 下拉选择框组件，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/select/full)
    - JigsawSwitch 开关组件，[详情请参考这里](http://rdk.zte.com.cn/components/switch/demo)
    - JigsawSlider 滑动条组件，[详情请参考这里](http://rdk.zte.com.cn/components/slider/demo)
- 图形系列
    - JigsawGraph 图形组件，基于echarts，可以完成绝大多数常用图形的开发，[详情请参考这里](http://rdk.zte.com.cn/components/graph/demo#pie)
    - JigsawFishBone 鱼骨图组件，标准鱼骨图，[详情请参考这里](http://rdk.zte.com.cn/components/fish-bone/demo)
- 通用控件系列
    - JigsawComboSelect 组合框组件，用于解决所有下拉场景，[详情请参考这里](http://rdk.zte.com.cn/components/combo-select/demo#full)
    - JigsawDialog 普通对话框组件，用于解决所有弹出式对话场景，[详情请参考这里](http://rdk.zte.com.cn/components/dialog/demo#misc)
    - JigsawTooltipDialog 气泡对话框组件，用于解决所有弹出式对话场景，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/tooltip/dialog)
- 日期时间系列
    - JigsawTime 时间点组件，[详情请参考这里](http://rdk.zte.com.cn/components/time/demo#full)
    - JigsawRangeTime 时间范围组件，[详情请参考这里](http://rdk.zte.com.cn/components/range-time/demo)
- 容器类组件
    - JigsawTab 页签组件，[详情请参考这里](http://rdk.zte.com.cn/components/tab/demo#api)
    - JigsawCollapse 折叠组件，[详情请参考这里](http://rdk.zte.com.cn/components/collapse/demo)
- Loading系列，[详情请参考这里](http://rdk.zte.com.cn/components/loading/demo)，包含如下内置loading效果，适合所有场景的需要
    - JigsawLoading
    - JigsawBubbleLoading
    - JigsawFontLoading
    - JigsawBallLoading
- 弹出式Alert组件系列，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/alert/in-dom)
    - JigsawAlert
    - JigsawConfirmAlert
    - JigsawErrorAlert
    - JigsawInfoAlert
    - JigsawWarningAlert
- JigsawTag Tag组件，[详情请参考这里](http://rdk.zte.com.cn/components/tag/demo)
- JigsawTreeExt 树组件，[详情请参考这里](http://rdk.zte.com.cn/components/tree/demo)
- JigsawPagination 通用分页组件，[详情请参考这里](http://rdk.zte.com.cn/components/pagination/demo)
- JigsawViewport 视口组件，[详情请参考这里](http://rdk.zte.com.cn/components/table/demo#big-table)
- JigsawScrollbar 滚动条组件组件，配合 JigsawViewport 组件使用
- 其他组件
    - JigsawRoot Root组件，无视图，提供常用功能的初始化过程
    - JigsawBlock 模态框辅助组件，覆盖全视图
    - JigsawCollapsePane 配合 JigsawCollapse 折叠组件使用
    - JigsawListOption 配合 JigsawList 列表组件使用
    - JigsawRadioOption 配合 JigsawRadioGroup 单选框组件使用
    - JigsawTabPane 配合 JigsawTab 页签组件使用
    - JigsawTileOption 配合 JigsawTile 平铺组件使用

### 指令
一共提供6个指令，详情列出如下：

- JigsawDraggable / JigsawDroppable 快速在任何dom元素上实现拖拽功能，详情请参考[这里](http://rdk.zte.com.cn/jigsaw/drag-drop/table-drag)和[这里](http://rdk.zte.com.cn/jigsaw/drag-drop/drag-to-replace)
- JigsawMovable 实现任何dom元素拖拽改变位置的功能，常用于对话框的标题栏
- JigsawTooltip 在任何dom元素上增加tooltip文本提示功能，[详情请参考这里](http://rdk.zte.com.cn/components/tooltip/demo#inline)
- JigsawTrustedHtml 在组件内部的任意dom元素里增加可定制的高可交互html片段插入点，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/trusted-html/full)
- perfectScrollbar 在任意dom元素上提供定制滚动条功能，第三方提供，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/scrollbar/basic)

### 通用功能（Injectable）
一共提供2个通用功能，详情列出如下：

- PopupService 用于处理**任何**弹出场景的功能，[详情请参考这里](http://rdk.zte.com.cn/jigsaw/popup/introduce)
- LoadingService 用于控制弹出式loading组件的显示和隐藏的功能，[详情请参考这里](http://rdk.zte.com.cn/components/loading/demo)

### 多皮肤支持
Jigsaw在这个版本里已经支持了相对比较完善的多皮肤开发系统，可实现一键换肤。

并且内置了两套完整皮肤：

- 中兴大数据风格（默认），[演示站点](http://rdk.zte.com.cn/components)；
- antd风格，[临时演示站点](http://rdk.zte.com.cn/jigsaw-antd/)；
