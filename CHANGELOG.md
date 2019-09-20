## v5.0.2 (2019-9-20)

### 新特性 / New Features
- [新增] PageableTableData数据对象将_ajax从private改为protected，新增pagingServerUrl属性用于覆盖全局PagingInfo.pagingServerUrl
- [新增] PageableTableData添加ready属性，用于控制是否在分页信息初始化时触发查询
- [新增] 增加手动重置table排序按钮状态的功能
- [新增] 增加一个支持多行版的steps组件jigsaw-steps-multiline，用于处理步骤节点多且复杂的情形
- [新增] auto-complete-input支持新属性filterOnFocus，用于控制在输入框获得焦点后是否自动执行过滤


### 破坏性修改 / Breaking Changes

###  优化 / Modified
- [优化] 优化多tab嵌套性能问题

### 修复 / Fixes
- [故障] 解决upload指令在ie11中无效的问题
- [故障] ztree在弹窗中拖拽时，箭头和阴影被遮挡问题
- [故障] 修复无法准确根据tab的高度计算tab-content高度的问题
- [故障] table表头排序按钮与文字重叠，fixes #623, #663
- [故障] dialog固定高度时，内容太高被撑开，无法产生纵向滚动条
- [故障] 解决jigsw-steps-multiline在steps个数小于预设的一行数量时报错的问题
- [故障] 修复range-time无法初始化显示周范围

## v5.0.0-beta1 (2019-7-24)

Jigsaw的版本策略变更为：大版本号跟随angular的大版本号，当前v1.2.x版本对应的angular大版本是5，所以，直接将最新的1.2.0-beta4的版本提升为5.0.0-beta1。这是Jigsaw的第二个大版本，将在近期结束beta。

### 新特性 / New Features
- [新增] upload指令增加uploadShowFileList属性用于控制是否要弹出已上传文件列表
- [新增] 增加黑色、蓝色、灰色、紫色主题皮肤
- [新增] float指令增加initData输入属性，用于传递参数进入到弹出组件内
- [新增] 漂浮指令（jigsaw-float）在浏览器发生resize事件时，自动更正位置
- [新增] 地图轮廓图可视化数据
- [新增] 散点图可视化数据类型
- [新增] 雷达图可视化配置模型数据
- [新增] 可视化仪表盘数据
- [新增] select组件增加一个remove事件，在多选时，点击选中项的x后发出，同时发出valueChange事件
- [新增] HttpClientOptions.params参数支持HttpParams类型

### 破坏性修改 / Breaking Changes
- [修复] 修复无法使用服务端分页时排序的问题，服务端分页所用属性sortInfo属性名改为sort
- [优化] combo-select的height属性改成maxHeight

###  优化 / Modified
- [优化] slider组件的性能提升
- [优化] 优化input的padding计算时机，避免无效重复计算，提升性能
- [优化] combo-select支持设置height，支持多行滚动显示
- [优化] 直角系图数据对象优化
- [优化] select组件的value属性支持null/undefined值清空已选择项

### 修复 / Fixes
- [修复] 修复graph设置visibility:hidden无法隐藏图形的问题
- [故障] 修复仪表盘和散点图数据的多维度问题
- [故障] 修复input输入框disable没有背景的问题
- [故障] 修复CommonUtil.extendObject无法拷贝源对象属性值为对象目标对象不存在该属性的问题

## v1.2.0-beta4 (2019-05-12)

### 新特性 / New Features
- [新增] graph组件增加一个init事件，在其初始化时发出
- [新增] PopupService加一个popups数组返回当前所有弹出视图，float指令支持任意多层级下拉
- [新增] 增加模型化的饼图/直角系图的图形数据，为Awade图形可视化配置做准备
- [新增] 调整代码结构以支持在此仓库中制作适用于移动端的npm包，以及添加第一批适用于移动端的组件
- [新增] 增加一个内置的Tabs标题渲染器 `JigsawEditableTabTitleRenderer` 可用于动态修改Tab页标题

### 破坏性修改 / Breaking Changes
- [优化] 删除了`jigsaw-editable`组件及其相关的所有功能，包括：`LayoutData`数据对象，`JigsawEditableBox`等。后续将可能会提供一个以全新的交互方式实现的视图编辑器作为替代品。
- [优化] `VMAX_GRAPH_THEME` 更名为 `lightGraphTheme`
- [优化] `VMAX_GRAPH_THEME_DARK` 更名为 `darkGraphTheme`

###  优化 / Modified
- [优化] 抽屉的width/height默认值改为auto，以自动处理offsetTop/offsetLeft等带来的偏移问题
- [优化] float去掉对宿主节点click事件的阻止冒泡
- [优化] Graph组件注册事件的代码增加必要的保护
- [优化] 使用float指令改写combo的下拉实现，以获得统一的下拉功能
- [优化] Slider支持普通数组作为输入

### 修复 / Fixes
- [故障] 修复在combo里面time的国际化无法生效，fixes #666
- [故障] 修复table的checkbox渲染器设置初始data会导致功能不可用，fixes #925
- [故障] 解决j-moveable指令宿主节点的position属性在class中设置无效的问题

## v1.2.0-beta3 (2019-04-09)

### 新特性 / New Features
- [新增] 级联选择器（Cascade） 新增搜索和分页功能，支持大数据量的显示和选择
- [新增] upload组件和upload指令在删除已上传条目时给出remove事件
- [新增] popup增加水平弹出位置矫正，当右边位置不够时，靠右对齐
- [新增] 新增面包屑组件，支持自定义和路由两种形式
- [新增] 表格的selectedRow属性支持双绑
- [新增] 给auto-complete-input组件增加select事件
- [新增] tab组件支持headless属性，以支持隐藏页签部分
- [新增] 增加float指令，用于控制任意视图的下拉，并提供预设多种下拉位置
- [新增] 抽屉功能扩展，支持设置容器和偏移，以及直接在文档流中显示
- [新增] 把InternalUtils.trackByFn挪到CommonUtils里去，并改名为toTrackByFunction
- [新增] 抽屉的width/height支持一个快捷标志：auto，降低抽屉的尺寸与偏移量配合使用的复杂性
- [新增] tab增加enableAnimation属性，用于打开和关闭切换tab内容的动画
- [新增] CollapsePane折叠组件的isActive属性支持双绑
- [新增] jigsaw-pagination组件给搜索框增加placeholder属性
- [新增] 增加一套深色皮肤

### 破坏性修改 / Breaking Changes
- [优化] trustedHtml的回调执行放入zone中
- [优化] 优化collapse的展开动画，fixes #30
- [优化] 面包屑增加对中文url的支持
- [优化] button去除min-width
- [优化] 更新angular版本到5.2.11
- [新增] dialog现在可以设置弹框的高度；优化按钮的尺寸/文字大小等
- [优化] 修改皮肤的基础高度为32px,统一单行组件的高度，fixes#826
- [优化] jigsaw图标优化，支持图文分开样式设置，支持图标在上文字在下
- [新增] 增加Rate组件，可用于评分, fixes #258
- [优化] 更新 echarts 版本到 V4.1.0
- [新增] tag组件增加show()方法，用于tag隐藏后再次显示出来，优化tag的删除操作
- [优化] 自动完成输入框屏蔽原生select事件，改为textSelect事件

###  优化 / Modified
- [优化] 穿梭框组件在服务端分页时左侧列表loading，增加valid和disabled属性，修复未国际化的词条
- [优化] 解决input输入框初始化加载时出现黑边的问题
- [优化] JigsawButton现在采用纯css的形式居中，去掉line-height的计算
- [优化] tab过多时，显示下拉列表供选择
- [优化] transfer组件加背景色
- [优化] 优化autoinput设置尺寸的逻辑，现在可以随意设置高度了
- [优化] 去掉slider的边框，这样slider可以与深色背景更好的融合在一起
- [优化] 优化对table内部嵌套含table的渲染器的支持，fixes #859
- [优化] jigsaw-auto-complete-input组件在鼠标按下时，自动关闭下拉提示列表，避免在对话框拖动时，下拉列表位置出错
- [优化] auto-complete-input代码格式化，给私有属性增加显式的internal标志
- [优化] 解决combo不设置maxWidth会报错的问题
- [优化] 修正demo系统中ajax拦截器的处理器定义，把float加入到导出列表
- [优化] 面包屑现在支持无层级关系的路由显示，fixes #855
- [优化] 面包屑的demo中增加live-demo必要的路由信息，优化live-demo调整逻辑
- [优化] 采用覆盖png图片的方式来重新定义ztree皮肤，对齐ux最新规范
- [优化] 去掉多余代码
- [优化] float指令位置修正算法支持宿主在可视范围外的情形，以及一些临界情况优化

### 修复 / Fixes
- [修复] 提醒框改变宽度的输入框输入值无论为多少，输入框显示的都为60或600而无法手动直接输入其它值，解决了 @549
- [修复] 修复table不设置trackItemBy时，数据的最后字段相等会导致checkbox选择错误
- [修复] 修复dialog设置高度后，content部分的宽度无法正确获取
- [修复] 修改在加入滚动条后tab的样式问题，fixes #831
- [修复] 修复input在combo中有边框的问题
- [修复] 修复slider的value为数组时，改变value的元素不能更新视图的问题，fixes#840
- [修复] popup无法在ie里矫正位置，fixes #850
- [修复] 修复radio在data异步获取，无法显示已有选中选的问题，fixes #823
- [修复] 修复最新tab在editable-box里面会报错，fixes #870
- [修复] 修复auto-compoment-input下拉报错的问题, fixes #876
- [修复] auto-complete-input输入框存在内容popup下拉框时不会自动过滤
- [修复] select控件的clearable为true时，点击clear按钮未能清空所选项的问题
- [修复] graph事件回调无法被angular变更检查 (#885)
- [修复] 上传控件按文件类型检测时，需要无视大小写
- [修复] 在node里面require jigsaw的的umd包时报错，fixes #889
- [修复] 给graph加个afterViewInit钩子并调下resize，让图表撑开
- [修复] Tabs组件在初始化组件时，如果一开始就显示按钮，会报错
- [修复] 修复isActive直接赋值会产生的问题
- [修复] 修复auto-input在float里面选择时，float也被关闭
- [修复] float指令弹出位置算法修正

## v1.2.0-beta2 (2018-10-31)

### 新特性 / New Features
- [新增] 增加update事件，用于提供给用户可用的文件列表信息，现在complete只用于监听所有文件上传成功，不包含删除文件；增加clearFileList功能；去掉指令的remove功能
- [新增] 增加内置表格下拉选择单元格渲染器
- [新增] 给jigsaw-list-lite添加invalid属性
- [新增] ButtonBar支持多选;只有一个选项时的圆角问题
- [新增] 分页组件增加mode属性，用于让分页支持精简版布局
- [新增] tree中增加选中节点的函数，以解决awade的调试界面代码框和树节点选中的不一致
- [新增] input添加password属性
- [新增] trusted-html支持复杂的多级属性下的函数
- [新增] 实现了LocalPageableArray的分页功能、排序功能，优化了list-lite的搜索
- [新增] 添加jigsaw-textarea组件 (#777)
- [新增] 服务端分页功能支持自定义函数过滤
- [新增] 新增穿梭（Transfer）组件，支持大数据量的呈现和选择

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] upload控件在上传失败时给出tooltip失败原因
- [优化] 优化upload的布局，使用div替代j-box
- [优化] trusted-html指令支持在多级属性时自动处理好上下文

### 修复 / Fixes
- [修复] 数据对象在处理ajax请求时，误将json对象转为json字符串，导致服务端解析失败
- [修复] PageableTable和PageableArray对齐rdk新版paging服务，取数据的HTTP方法与数据源的HTTP方法保持一致
- [修复] 分页下一页按钮的bug问题

## v1.2.0-beta1 (2018-10-15)

### 新特性 / New Features
- [新增] upload的基类，upload指令，修改单文件多文件添加逻辑，增加删除功能

### 破坏性修改 / Breaking Changes
- [破坏性修改] 分页组件现在不传入current、pageSize、total属性，改由一次性传入含pagingInfo的data

###  优化 / Modified
- [优化] 主分支上删除upload里不必要的兼容性代码

### 修复 / Fixes
- [修复] 修复group items为空时，在destroy中会报错的问题
- [修复] upload组件的api回退，并保持upload指令的api里都带有upload关键字
- [修复] 修复numeric-input初始化时样式标红的问题
- [修复] 删除tab自动滚动条，改由用户自己添加


## v1.1.x

v1.1.x 的版本变更记录在[这里](https://github.com/rdkmaster/jigsaw/blob/v1.1/CHANGELOG.md)。
