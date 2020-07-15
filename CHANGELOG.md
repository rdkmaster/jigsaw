## v9.1.7 (2020-07-15)

### 新特性 / New Features
- [新增] input、auto-complete-input新增输入属性preIcon和icon用于设置前后图标

### 破坏性修改 / Breaking Changes
- [破坏性修改] 当select控件的trackItemBy属性有效时，根据trackItemBy所指的属性的值来判定value值是否有变更

#### 破坏性说明

select控件的`valueChange`事件触发时机有细微的变化，此前，通过select组件的`value`属性输入任何非空新对象都会触发`valueChange`事件，而不管当前控件是否给定了`trackItemBy`属性。这个做法导致了`trackItemBy`属性失去作用。比如下面的代码

```
html:
// 注意，trackItemBy值为label，是有效的，这是关键
<j-select [value]="value" trackItemBy="label" (valueChange)="onValueChange()">
</j-select>

ts:
this.value = {label: 'xxx'}; // onValueChange将会被调用
this.value = {label: 'xxx'}; // onValueChange也会被调用，因为前后两次给的value值不是同一个对象。
```

现在，控件在触发`valueChange`事件之前，增加了对`trackItemBy`值的判断，行为发生了变更：

```
html: 与前例一致

ts:
this.value = {label: 'xxx'}; // onValueChange将会被调用
this.value = {label: 'xxx'}; // onValueChange不会被调用，因为label的值前后都是xxx，没有变化
```

但请注意，如果`trackItemBy`值为空，则select控件的行为与之前一致：

```
html:
// 注意，trackItemBy没有配置，为非法值
<j-select [value]="value" (valueChange)="onValueChange()">
</j-select>

ts:
this.value = {label: 'xxx'}; // onValueChange将会被调用
this.value = {label: 'xxx'}; // onValueChange也会被调用，不给trackItemBy时，select控件会按照引用来判定value是否发生变化
```

###  优化 / Modified
- [优化] 将jigsawFloatArrowElement属性的类型改为any，避免在node运行时使用Jigsaw报错

### 修复 / Fixes
- [故障] 修复输入框在非键盘输入情况下改变时无法触发valueChange的问题

## v9.1.4 (2020-07-03)

### 新特性 / New Features
- [新增] autoinput组件添加maxDropDownWidth属性，可以设置弹出的最大宽度
- [新增] 分页组件增加searchDebounce，用于给搜索增加防抖和敲击回车键立刻搜索功能
- [新增] 时间选择器，用于只选择时间（不带日期），详见[这里](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo)
- [新增] 内置下拉时间选择器和内置下拉时间范围选择器，由于下拉选择时间的场景实在太多，我们直接将时间选择与组合下拉集成好，详见[这里](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/date-time-select)和[这里](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/range-date-time-select)。

### 破坏性修改 / Breaking Changes
- [破坏性修改] 控件在赋了初始值时，默认不触发change事件，**这个破坏性很轻微，基本上可无视**，涉及到的组件有级联选择、组合下拉选择、自动补齐输入框、单行输入框、多行输入框、数字输入框、下拉选择
- [破坏性修改] [优化] 重新实现日期时间控件，无依赖，全新交互，全新UI。

我们对日期时间组件进行了全新的改版，全新UI，全新交互，但是也引入了一些破坏性，全部列举如下：

#### selector变更/新增

我们给新组件设计了一套全新的selector：

- 增加[jigsaw-time-picker](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo)用于选择时间（不带日期）；
- 增加[jigsaw-date-time-select](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/date-time-select)和[jigsaw-range-date-time-select](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/range-date-time-select)控件用于下拉选择时间的场景；
- 原[jigsaw-time](https://jigsaw-zte.gitee.io/v8.0/#/components/time/demo)控件改为[jigsaw-date-time-picker](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo)；
- 原[jigsaw-range-time](https://jigsaw-zte.gitee.io/v8.0/#/components/range-time/demo)控件改为[jigsaw-range-date-time-picker](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo)；

#### 输入属性变更

> 这里的描述适用于时刻选择和时间范围选择两个组件。

- 去掉了原组件的[`recommendedBegin`](https://jigsaw-zte.gitee.io/v8.0/#/components/range-time/demo/recommended)、[`recommendedEnd`](https://jigsaw-zte.gitee.io/v8.0/#/components/range-time/demo/recommended)、[`recommendedLabel`](https://jigsaw-zte.gitee.io/v8.0/#/components/range-time/demo/recommended)属性，请使用新增的[`markDates`](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/mark)属性替代；
- 去掉了原组件`weekDayStart`属性，现在设置[weekStart](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/week-start)不需要`weekDayStart`属性配合了；
- 去掉了原组件[`refreshInterval`](https://jigsaw-zte.gitee.io/v8.0/#/components/range-time/demo/refresh-interval)属性，现在通过宏实时更新limit不需要通过`refreshInterval`属性配合了，现在根据宏更新limit改为交互时实时计算，并设置5分钟的误差，即宏时间往前5分钟作为limitStart，往后5分钟作为limitEnd
- [`gr`](https://jigsaw-zte.gitee.io/v8.0/#/components/time/demo/gr)属性去掉了`'time'|'time_hour_minute'|'time_minute_second'`选项，需要使用时间选择器的，请改用[`jigsaw-time-picker`](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo)；


###  优化 / Modified
- [优化] 对话框按钮栏显示机制，避免在对话框内部使用按钮时，按钮栏意外出现
- [优化] 弹出顶部进度条现在会销毁之前的，修复组件实例给status赋值无法更新视图
- [优化] 优化不同状态下进度条的布局，小问题修复
- [优化] 时间控件通过实例操作输入属性方式的问题
- [优化] @RequireMarkForCheck装饰器兼容多级父类中的getter/setter
- [优化] 其余的组件变更检测策略改为onpush以提升组件性能

### 修复 / Fixes
- [故障] 修复TreeData无法通过ajax获取数据
- [故障] 修复menu直接fromXML报错以及xml数据支持远程获取，以及select下拉框点击下拉选项报错的问题
- [故障] tab宽度缩小到比title还窄时页面卡死问题
- [故障] 解决折叠的手风琴模式不生效的问题
- [故障] 新增输入属性装饰器，修复OnPush策略带来的部分视图未及时更新的问题
- [故障] 修复部分日期时间组件没有白背景，date-select组件无法设置尺寸
- [故障] 处理无效的weekDate，以及提前设置weekStart
- [故障] 修复日期控件limitEnd小于limitEnd时页面卡死
- [故障] 修复没有初始值gr为分钟或小时，选了日期后value值依旧为00:00:00
- [故障] 修复没有初始值时，时间范围选择器显示limitStart&limitEnd不正确
- [故障] 修复日期范围选择器limit和周粒度一起用时无法发送change事件
- [故障] 连续弹出多个消息框时位置计算错误

## v9.1.0 (2020-06-5)

### 新特性 / New Features
- [新增] jigsaw-menu菜单组件和jigsaw-cascading-menu级联菜单指令
- [新增] 增加进度条组件
- [新增] 增加树形表格渲染器，用于模拟出树型表格的效果，表格支持展示级联关系数据
- [新增] cascade增加对内部tile option宽度的配置
- [新建] 上传组件和指令支持file-verify字段以及其他自定义字段，服务端可通过这些字段做安全相关校验
- [新增] 增加表格的编辑单元格jigsaw-auto-complete-input渲染器，jigsaw-auto-complete-input组件交互过程优化
- [新增] 增加switch组件的只读模式，优化表格渲染初始值的更新过程
- [新增] float指令增加reposition方法，优化下拉打开逻辑，单击宿主不关闭下拉
- [新增] 分页组件的简单模式增加选择分页记录数功能
- [新增] PopupOptions添加一个新属性showShadow用于控制是否自动添加阴影
- [新增] float下拉视图指令支持添加三角形指向宿主
- [新增] float指令暴露openFloat和closeFloat方法，auto-complete-input支持编程方式开关提示列表
- [新增] SimpleTreeData支持xml作为数据源格式

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] 性能优化：优化所有组件的异步操作，提升组件性能
- [优化] 性能优化：变更检查策略由默认改为onpush
- [优化] tile-lite / tile 组件添加showBoder属性，用于控制是否显示边框，默认为true
- [优化] 升级echarts到4.7.0
- [优化] 调整graph颜色，增加不同系列的对比，fixes #1109
- [优化] 在把Jigsaw与服务端一起编译时，直接使用window对象，会导致后端编译失败
- [优化] table header使用html渲染器同时也可以设置排序功能
- [优化] PopupService.setPosition中增加参数非空保护，避免报错
- [优化] 表格select渲染器退出编辑优化，支持通过ESC和鼠标点击其他区域退出
- [优化] 去掉data.refresh的setTimeout，优化鱼骨图的异步操作，组件剩余setTimeout改造
- [优化] 编辑表格更新优化
- [优化] auto-complete-input组件下拉列表优化，在条目过滤后，自动调整下拉到正确的位置
- [优化] 使用en/decodeURIComponent对HTTP的GET请求参数做编解码器，避免angular原生编解码未能处理=+等几个字符，导致服务端处理数据失败的问题
- [优化] 使用正常模式引入jszip，避免APP在编译时ng报warn日志
- [优化] 解决node环境下引用lib.dom中类型时报undefined问题
- [优化] 优化float和cascading-menu指令的实现，菜单功能支持更多的场景
- [优化] 当xml格式存在错误的时候，在控制台上打印出错误的位置
- [优化] 去掉root组件对notification的引用，提升aot摇树成功率
- [优化] 进度条动画优化，提升动画性能

### 修复 / Fixes
- [修复] 修复window获取不到echarts对象的破坏性，fixes #1111
- [修复] 上传组件和指令在additionalFields属性值未初始化时报错的问题
- [修复] 修复auto-complete的没有下拉数据时会报错
- [故障] 解决在某些情况下下拉视图意外弹出的问题
- [故障] 修复Demo元素之间默认边距消失的问题
- [故障] 修复由于ng9组件继承元数据导致autoCompleteInput样式出现问题
- [故障] 修复float指令在不设置option的时候弹出报错的问题
- [故障] 修改图形下载指令获取jigsaw-graph节点的方式，以解决在一些情况下无法获取echarts实例的问题
- [故障] select设置多选和初始值时，页面首次加载显示异常的问题
- [故障] 修改tab-pane的title属性实现方式，解决cascade组件无法及时更新标题显示的问题

## v9.0.5-beta1 (2020-3-17)

### 新特性 / New Features
- [新增] time和rangeTime组件增加weekDayStart属性，用于配合weekStart选择周粒度时间,fixes #1040
- [新增] 分页控件的simple模式支持搜索框
- [新增] table在columnDefine中的表头现在可以设置html作为表头的渲染器
- [新增] ModeledMapGraphData增加缩放属性
- [新增] upload组件的start事件加上数据
- [新增] 新增一套paletx风格的皮肤
- [新增] 弹出选项新增可以配置 top / right / left / bottom 四个绝对位置
- [新增] tile-lite和button-bar增加title提示文字
- [新增] 弹出选项新增可以配置 leftTop/ leftBottom/ rightTop/ rightBottom 四个位置
- [新增] 表格单元格编辑器新增数字编辑渲染器
- [新增] upload组件新增文件大小限制，并在上传列表中将非法文件显示出来

### 破坏性修改 / Breaking Changes
- [破坏性修改] icon控件的iconSize和textSize属性的默认值从14px改为"inherit"

###  优化 / Modified
- [优化] 调整图形组件导出图片按钮弹出位置
- [优化] 修改图形下载指令按钮的弹出方式，以解决在宿主有滚动条情况下的位置异常
- [优化] select组件高度不够时跟combo一样撑出滚动条
- [优化] 优化所有组件的异步操作，提升组件性能
- [优化] 采用Stackblitz作为新的demo代码演示和编辑测试方式
- [优化] 修改默认tree的皮肤
- [优化] 性能优化：变更检查策略由默认改为onpush，提升组件性能
- [优化] 当graph的宿主没有尺寸时，缩放浏览器不自动resize
- [优化] 分页的跳转输入框，失去焦点时也跳转
- [优化] 图形组件增加echarts的getMap方法，隐藏掉getMapMap方法（笔误）
- [优化] 将echarts的弹出z-index值归入jigsaw的z-index体系中，让它弹出在适当的层次
- [优化] box-resize-line高度计算改为callLater执行
- [优化] Checkbox的label为变量的时候，在ngAfterContentInit中获取不到而导致增加了padding:0的样式
- [优化] 添加三个时间粒度，以设置不带日期的时间

### 修复 / Fixes
- [故障] 修复日期选择周粒度时与combo配合使用有问题,废弃weekStart和weekDayStart的配置
- [故障] 修复抽屉的offsetLeft和offsetRight同时出现时，抽屉宽度计算错误
- [故障] cascade组件出现异常子级数据的问题
- [故障] 弹出视图中包含tabs时，通过下拉列表切换tab页导致弹出视图意外关闭的问题
- [故障] 修复表格在没有数据的时候，宽度计算异常的问题


## v9.0.0-beta1 (2019-12-30)

### 新特性 / New Features
- [新增] 重大更新：Jigsaw支持Angular9版本

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- 无

## v8.0.9 (2020-03-17)

### 新特性 / New Features
- [新增] 弹出选项新增可以配置 top / right / left / bottom 四个绝对位置
- [新增] tile-lite和button-bar增加title提示文字
- [新增] 弹出选项新增可以配置 leftTop/ leftBottom/ rightTop/ rightBottom 四个位置
- [新增] 表格单元格编辑器新增数字编辑渲染器
- [新增] upload组件新增文件大小限制，并在上传列表中将非法文件显示出来

### 破坏性修改 / Breaking Changes
- [破坏性修改] icon控件的iconSize和textSize属性的默认值从14px改为"inherit"

###  优化 / Modified
- [优化] 当graph的宿主没有尺寸时，缩放浏览器不自动resize
- [优化] 分页的跳转输入框，失去焦点时也跳转
- [优化] 图形组件增加echarts的getMap方法，隐藏掉getMapMap方法（笔误）
- [优化] Checkbox的label为变量的时候，在ngAfterContentInit中获取不到而导致增加了padding:0的样式
- [优化] 添加三个时间粒度，以设置不带日期的时间

### 修复 / Fixes
- [故障]修复抽屉的offsetLeft和offsetRight同时出现时，抽屉宽度计算错误
- [故障]解决paletx皮肤下，select选中项右侧空白过多的问题
- [故障]cascade组件出现异常子级数据的问题
- [故障] 弹出视图中包含tabs时，通过下拉列表切换tab页导致弹出视图意外关闭的问题
- [故障] 修复表格在没有数据的时候，宽度计算异常的问题


## v8.0.5 (2020-02-20)

### 新特性 / New Features
- [新增] TableCellTextEditorRenderer添加placeholder属性
- [新增] 增加SimpleTreeData数据类型，代替TreeData作为JigsawTreeExt的数据，以应对TreeData的性能问题
- [新增] table默认排序功能，fixes #582
- [新增] 组件数据支持onChange回调，只在组件数据有外部更新时才调度，分页、排序、过滤等不调度
- [新增] 直角系数据模型对无dim的支持
- [新增] 直角系数据模型对无dim的支持
- [新增] 红色主题皮肤
- [新增] PopupOption增加useCustomizedBackground属性，用来控制是否设置弹框背景
- [新增] 保存图片指令，可一键保存一个容器里的所有图形的截图
- [新增] upload指令和组件支持contentField和fileNameField属性，用于自定义内容和文件名字段名
- [新增] time和rangeTime组件增加weekDayStart属性，用于配合weekStart选择周粒度时间,fixes #1040
- [新增] 分页控件的simple模式支持搜索框
- [新增] table在columnDefine中的表头现在可以设置html作为表头的渲染器
- [新增] ModeledMapGraphData增加缩放属性
- [新增] upload组件的start事件加上数据
- [新增] 新增一套paletx风格的皮肤

### 破坏性修改 / Breaking Changes
- [破坏性修改] 默认皮肤的弹出现在会默认加上白色的背景，自定义背景需要在popupOptions里面打开useCustomizedBackground

###  优化 / Modified
- [优化] 优化collapse动画
- [优化] 优化tab的垂直响应
- [优化] cascade、fishbone的数据换成SimpleTreeData，提升性能
- [优化] drag指令在未设置dragData的时候，增加获取数据的保护
- [优化] JigsawInput系组件性能优化
- [优化] 添加从dom中获取图片的charts实例的途径，以解决有些场景下ContentChildren无法获取图片实例的问题
- [优化] 调整图片保存按钮弹出位置
- [优化] 将echarts的弹出z-index值归入jigsaw的z-index体系中，让它弹出在适当的层次
- [优化] 修改图形下载指令按钮的弹出方式，以解决在宿主有滚动条情况下的位置异常
- [优化] 修复表格demo中，美元和人民币换算错误的问题
- [优化] select组件高度不够时跟combo一样撑出滚动条
- [优化] 采用Stackblitz作为新的demo代码演示和编辑测试方式
- [优化] box-resize-line高度计算改为callLater执行
- [优化] 修改默认tree的皮肤

### 修复 / Fixes
- [故障] jigsaw-tree-ext销毁时清理刷新回调，否则会造成事件钩子泄露，影响性能
- [故障] 解决auto-complete-input 的focus和select方法无效的问题
- [故障] 解决textarea在disabled为true时，不变灰的问题
- [故障] 解决在collapse设置为手风琴模式时，初始时打开的页签多于一个，页面点击卡死问题
- [故障] icon的isLinkButton属性为true且href为空时，会打开空白页的问题
- [故障] 修复弹框有时计算位置不对
- [故障] 修复采用枚举方式配置服务端分页sortAs，会导致服务端报错
- [故障] 修复select和list-lite搜索会删除已选中项，fixes #1007
- [故障] 数字Input组件设置大于0的最小值后无法删除后输入
- [故障] 修复numeric输出的值变成了字符串，优化通过输入框输入数字的交互
- [故障] 修改直角系图形设置dimDisabled依旧会有dim的问题
- [故障] 修复双绑jigsawFloatOpen，在OnInit里面设置为true，导致float不停的打开关闭
- [故障] 修复input在flex布局中内容溢出的问题
- [新增] 保存图片指令，可一键保存一个容器里的所有图形的截图
- [故障] 修复测试demo时发现的bug
- [故障] 修复日期选择周粒度时与combo配合使用有问题,废弃weekStart和weekDayStart的配置

## v8.0.1 (2019-9-20)

### 新特性 / New Features
- [新增] PageableTableData数据对象将_ajax从private改为protected，新增pagingServerUrl属性用于覆盖全局PagingInfo.pagingServerUrl
- [新增] PageableTableData添加ready属性，用于控制是否在分页信息初始化时触发查询
- [新增] 增加手动重置table排序按钮状态的功能
- [新增] 增加一个支持多行版的steps组件jigsaw-steps-multiline，用于处理步骤节点多且复杂的情形
- [新增] auto-complete-input支持新属性filterOnFocus，用于控制在输入框获得焦点后是否自动执行过滤

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- [优化] 优化多tab嵌套性能问题

### 修复 / Fixes
- [故障] 修复无法准确根据tab的高度计算tab-content高度的问题
- [故障] table表头排序按钮与文字重叠，fixes #623, #663
- [故障] dialog固定高度时，内容太高被撑开，无法产生纵向滚动条
- [故障] 解决jigsw-steps-multiline在steps个数小于预设的一行数量时报错的问题
- [故障] 修复range-time无法初始化显示周范围

## v8.0.0-beta1 (2019-8-6)

### 新特性 / New Features
- [新增] 重大更新：Jigsaw支持Angular8版本

### 破坏性修改 / Breaking Changes
- 无

###  优化 / Modified
- 无

### 修复 / Fixes
- [故障] 解决upload指令在ie11中无效的问题
- [故障] ztree在弹窗中拖拽时，箭头和阴影被遮挡问题

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
