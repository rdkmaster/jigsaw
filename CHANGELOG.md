## v1.1.20 (2019-1-15)

### 新特性 / New Features
- [新增] 给auto-complete-input组件增加select事件
- [新增] tab组件支持headless属性，以支持隐藏页签部分
- [新增] 增加float指令，用于控制任意视图的下拉，并提供预设多种下拉位置
- [新增] 抽屉功能扩展，支持设置容器和偏移，以及直接在文档流中显示
- [新增] 增加Rate组件，可用于评分, fixes #258

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] 去掉slider的边框，这样slider可以与深色背景更好的融合在一起
- [优化] jigsaw-auto-complete-input组件在鼠标按下时，自动关闭下拉提示列表，避免在对话框拖动时，下拉列表位置出错
- [优化] 优化对table内部嵌套含table的渲染器的支持，fixes #859
- [优化] auto-complete-input代码格式化，给私有属性增加显式的internal标志
- [优化] 解决combo不设置maxWidth会报错的问题
- [优化] 修正demo系统中ajax拦截器的处理器定义，把float加入到导出列表
- [优化] 面包屑现在支持无层级关系的路由显示，fixes #855
- [优化] 面包屑的demo中增加live-demo必要的路由信息，优化live-demo调整逻辑

### 修复 / Fixes
- [修复] 将JigsawTextarea加入到public列表中
- [修复] popup无法在ie里矫正位置，fixes #850
- [修复] 修复radio在data异步获取，无法显示已有选中选的问题，fixes #823
- [修复] 修复最新tab在editable-box里面会报错，fixes #870


## v1.1.19 (2018-12-24)

### 新特性 / New Features
- [新增] 表格的selectedRow属性支持双绑

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] tab过多时，显示下拉列表供选择
- [优化] transfer组件加背景色
- [优化] 优化autoinput设置尺寸的逻辑，现在可以随意设置高度了

### 修复 / Fixes
- [修复] 修改在加入滚动条后tab的样式问题，fixes #831
- [修复] 修复input在combo中有边框的问题
- [修复] 修复slider的value为数组时，改变value的元素不能更新视图的问题，fixes#840

## v1.1.18 (2018-11-30)

### 新特性 / New Features
- [新增] dialog现在可以设置弹框的高度;
- [新增] popup增加水平弹出位置矫正，当右边位置不够时，靠右对齐;
- [新增] 新增面包屑组件，支持自定义和路由两种形式;

### 破坏性修改 / Breaking Changes
- 无

### 优化 / Modified
- [优化] 优化collapse的展开动画，fixes #30;
- [优化] JigsawButton现在采用纯css的形式居中，去掉line-height的计算，优化按钮的尺寸/文字大小等；
- [优化] 面包屑增加对中文url的支持;
- [优化] 解决input输入框初始化加载时出现黑边的问题;

### 修复 / Fixes
- 无

## v1.1.17 (2018-11-9)

### 新特性 / New Features
- [新增] 级联选择器（Cascade） 新增搜索和分页功能，支持大数据量的显示和选择
- [新增] upload组件和upload指令在删除已上传条目时给出remove事件

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] 穿梭框组件在服务端分页时左侧列表loading，增加valid和disabled属性，修复未国际化的词条

### 修复 / Fixes
- [修复] 提醒框改变宽度的输入框输入值无论为多少，输入框显示的都为60或600而无法手动直接输入其它值，解决了 @549
- [修复] 修复table不设置trackItemBy时，数据的最后字段相等会导致checkbox选择错误

## v1.1.16 (2018-10-31)

### 新特性 / New Features
- 无

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- [修复] 修复在transfer中给pagination设置属性错误

## v1.1.15 (2018-10-31)

### 新特性 / New Features
- [新增] 新增穿梭（Transfer）组件，支持大数据量的呈现和选择
- [新增] 给jigsaw-list-lite添加invalid属性
- [新增] ButtonBar支持多选;只有一个选项时的圆角问题
- [新增] tree中增加选中节点的函数，以解决awade的调试界面代码框和树节点选中的不一致
- [新增] 分页组件增加mode属性，用于让分页支持精简版布局
- [新增] input添加password属性
- [新增] trusted-html支持复杂的多级属性下的函数
- [新增] 增加内置表格下拉选择单元格渲染器
- [新增] 实现了LocalPageableArray的分页功能、排序功能，优化了list-lite的搜索
- [新增] 添加jigsaw-textarea组件 (#777)
- [新增] 服务端分页功能支持自定义函数过滤

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化]upload控件在上传失败时给出tooltip失败原因
- [优化] trusted-html指令支持在多级属性时自动处理好上下文
- [优化] trusted-html指令支持在多级属性时自动处理好上下文
- [优化] 优化upload的布局，使用div替代j-box

### 修复 / Fixes
- [修复] 数据对象在处理ajax请求时，误将json对象转为json字符串，导致服务端解析失败
- [修复] PageableTable和PageableArray对齐rdk新版paging服务，取数据的HTTP方法与数据源的HTTP方法保持一致
- [修复] 分页下一页按钮的bug问题

## v1.1.14 (2018-10-16)

### 新特性 / New Features
- [新增] JigsawUpload组件增加update事件，用于提供给用户可用的文件列表信息，现在complete只用于监听所有文件上传成功，不包含删除文件；增加clearFileList功能；去掉指令的remove功能

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- 无


## v1.1.13 (2018-10-15)

### 新特性 / New Features
- [新增] upload的基类，upload指令，修改单文件多文件添加逻辑，增加删除功能

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- [修复] 修复group items为空时，在destroy中会报错的问题
- [修复] upload组件的api回退，并保持upload指令的api里都带有upload关键字
- [修复] 修复numeric-input初始化时样式标红的问题
- [修复] 删除tab自动滚动条，改由用户自己添加


## v1.1.12 (2018-9-29)

### 新特性 / New Features
- 无

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [新增] 表单控件增加valid属性和验证不通过样式
- [优化] 改正combo-select和auto-complete-input的弹出位置修正函数
- [优化] table的列对齐兼容火狐

### 修复 / Fixes
- [修复] 修复combo里的tag在火狐里面无法点击打开下拉

## v1.1.11 (2018-9-15)

### 新特性 / New Features
- [新增] upload组件支持限制文件类型，上传失败的文件信息也能从组件传出来，fixes #717
- [新增] Box增加viewInit静态事件，用于监听box整体布局样式的初始化 (#722)
- [新增] 给jigsaw-upload组件增加一个新的输入属性targetUrl，允许应用自定自己的上传目标服务器

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- [修复] 修复table编译渲染器在输入空白字符，退出编辑后不能再切换到编辑，fixes #725

## v1.1.10 (2018-9-3)

### 新特性 / New Features
- editable-box增加加入tab-wrapper的操作按钮
- 新增 jigsaw-button-bar 组件
- 增加 jigsaw-icon 组件

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化]tab wrapper 添加 editableChange的监听

### 修复 / Fixes
- tab无法监听selectedIndexChange和selectedChange事件 fixes #708
- upload的input：file文件上传无法在低版本的chrome上监听ngModelChange fixes #710
- 将upload组件添加到公共api里去
- ZTreeSettingCheck类型修正
- 修复list option有蒙层，导致option内部元素无法交互 fixes #700 

## v1.1.9 (2018-8-16)

### 新特性 / New Features
- 新增jigsaw-auto-complete-input组件
- 增加 graph data factory: GraphData.of()
- fixes #691 现在支持设置tabs的height属性，content部分会自动计算出一个固定的高度，并随高度出滚动条，tabs不设height属性时默认随内容改变

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 增加LineBarGraphData类，保持向下兼容
- 表格在update的时候，自动标记已经设置的选中行

### 修复 / Fixes
- fixes #674 解决table data刷新时， additionalData 和渲染器里面的tableData没有刷新的问题，现在additionalData 需要调reset方法手动刷新，渲染器里面的tableData会自动刷新

## v1.1.8 (2018-8-4)

### 新特性 / New Features
- 新增了jigsaw-cascade级联选择组件
- 新增了jigsaw-numeric-input数字输入组件
- Table组件支持直接将单元格的内容按照html方式来渲染，为单元格增加超链更简单了
- 增加了jigsaw-radios-lite组件
- 增加了jigsaw-tile-lite组件
- array-collection支持直接对字符串进行搜索
- box支持固定尺寸子组件自动冻结无法resize尺寸的功能
- 新增上传文件组件
- 新增多种图形数据

### 破坏性修改 / Breaking Changes
- 在增加了多种图形数据过程中，对少部分原有的GraphData做了不兼容调整，这些数据对象均未在文档中提及，因此估计未被外部知晓，影响范围有限。

###  优化 / Modified
- combo组件的trigger增加了none类型，用于完全通过编码方式控制combo下拉的开关
- 给Graph组件添加了一个x轴太长的解决方案的dome
- ZTreeSettingEditDrag优化，`prev` `next` `inner`属性增加了函数类型的支持
- 分页组件支持一键清除文本框内容
- 优化select组件在某个条目很长时的界面显示
- 表格支持列头渲染器实时刷新
- 按钮组件样式优化：使用height替代min-height
- box的reisze线实现优化，解决某些情况下resize线计算错误
- GraphData优化，将echartOptions属性改为public的
- 优化box组件渲染过程中，消除子组件的跳动
- ztree支持更多的事件

### 修复 / Fixes
- radio组件样式优化，解决啊awade里显示不正常的问题
- 解决list使用字符串数组搜索时，option的选中状态失效的问题

## v1.1.7 (2018-4-19)

### 新特性 / New Features
- https://github.com/rdkmaster/jigsaw/pull/646 新增了jigsaw-drawer组件
- https://github.com/rdkmaster/jigsaw/issues/256 新增了jigsaw-steps组件
- https://github.com/rdkmaster/jigsaw/pull/650 editable-box支持将tab作为容器

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- 增加了button/checkbox/fish-bone/input的api文档，以及一些api文档中的错漏
- 补充了combo/table/notification/movable等组件的自动化测试用例
- https://github.com/rdkmaster/jigsaw/issues/644 避免graph设置多次data时，一个事件会绑定多个回调

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/648 fishbone报错


## v1.1.6 (2018-3-23)

### 新特性 / New Features
- https://github.com/rdkmaster/jigsaw/issues/608 Viewport在滚动数据时，能发送事件出来 
- https://github.com/rdkmaster/jigsaw/issues/317 Time RangeTime 控件的推荐日期的提示支持可定制且默认值支持国际化

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- 增加了数据封装的api文档
- 增加了JigsawTime/JigswRangeTime/JigsawTab等组件的api文档
- 声明类型时，改用class声明，尽量避免再使用type别名
- 增加IEmittable接口，用于统一组件数据订阅功能的api；文档：完成了组件数据文档；
- https://github.com/rdkmaster/jigsaw/pull/595 修改popup的z-index机制，避免多层弹出层次错乱的问题；重新整合皮肤的z-index
- https://github.com/rdkmaster/jigsaw/issues/572 AbstractJigsawViewBase 中需要增加一个clearCallLater()函数

### 修复 / Fixes
- https://github.com/rdkmaster/jigsaw/issues/492 table/pageable分页时，某些情况未能采用最新分页数据；
- https://github.com/rdkmaster/jigsaw/issues/599 JigsawNotification弹出功能在连续弹出的时候，所有提示框都堆在一起了
- https://github.com/rdkmaster/jigsaw/issues/596 使用alert时会出现国际化不生效的问题
- https://github.com/rdkmaster/jigsaw/issues/593 combo的callLater会报错
- https://github.com/rdkmaster/jigsaw/issues/601 table没有数据时，不会自动计算contentWidth 
- https://github.com/rdkmaster/jigsaw/issues/531 Tab的title在动态改变之后样式错误 
- https://github.com/rdkmaster/jigsaw/issues/612 BigTableData.busy在往上滑到缓存数据尽头时更新不及时 
- https://github.com/rdkmaster/jigsaw/issues/613 viewport的滚动条在底部时，BigTableData的缓存数据前两页追加进来后，滚动条位置未更新


## v1.1.5 (2018-3-14)

### 新特性 / New Features
- https://github.com/rdkmaster/jigsaw/issues/535 增加switch功能的table内置渲染器

### 破坏性修改 / Breaking Changes
- 无 / none

###  优化 / Modified
- https://github.com/rdkmaster/jigsaw/pull/557 增加alert的ButtonInfo类型
- https://github.com/rdkmaster/jigsaw/issues/539 comboselect的单选模式实现错误

### 修复 / Fixes
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
- **重磅功能**：增强`j-box`布局功能，支持用户在界面上拖拽调整布局尺寸，[详见这里](http://rdk.zte.com.cn/jigsaw/box/layout)
- **重磅功能**：增加`j-editable-box`组件，纯数据驱动的布局方式，更加灵活，轻松实现所见即所得的布局效果，[详见这里](http://rdk.zte.com.cn/jigsaw/editable-box/monitor)
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
