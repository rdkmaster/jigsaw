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