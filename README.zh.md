# Jigsaw-七巧板

- 桌面版 **@rdkmaster/jigsaw**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw) [![Jigsaw](https://circleci.com/gh/rdkmaster/jigsaw.svg?style=svg)](https://app.circleci.com/pipelines/github/rdkmaster)
- 移动版 **@rdkmaster/jigsaw-mobile** [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw-mobile.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw-mobile) [![Build Status](https://travis-ci.org/rdkmaster/jigsaw.svg?branch=v1.1)](https://travis-ci.org/rdkmaster/jigsaw)

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rdkmaster/jigsaw) 

## Jigsaw的优势

Jigsaw是一套完整强大的Web组件集，当前的版本里包含了50个组件、6个容器、6个服务、9个指令，基本上覆盖了Web应用的方方面面。简单的说，其他组件集有的，Jigsaw都有，而且功能更强大性能更好。因此完全没有必要担心Jigsaw的功能缺失的问题。

Jigsaw拥有一个其他组件集所没有的能力：**Jigsaw的应用一次开发就能同时支持多种Ux规范**。

这是业界首创！[点击这里](https://jigsaw-zte.gitee.io/latest/#/components/guide/supports-multiple-ux-specifications)了解更多。

## 可用清单

### 组件 / Components

\# | 名称 | 简述         | 链接
---|------|-------------|------
1 | 警示框 | 一个简单的对话框，通常用于告诉用户一些重要的东西，它还可以收集用户的选择。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/alert/demo/popup)
2 | 提示输入框 | 一个全功能 [Input](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full) 组件，附带一个提示可选值的下拉列表。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/auto-complete-input/demo/basic)
3 | 面包屑 | 一个轻量级导航器，可在用户浏览时自动跟踪。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/breadcrumb/demo/router)
4 | 按钮 | 一个包含多种状态的按钮。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button/demo/full)
5 | 按钮栏 | 一个按钮栏，支持选择状态，单个或多个选择，它可以用作表单控件或导航器。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button-bar/demo/basic)
6 | 级联选择 | 一个用于收集或者展示具有从属关系的数据的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/cascade/demo/search-and-paging)
7 | 复选框 | 一个用于收集多项选择的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/checkbox/demo/full)
8 | 颜色选择器 | 一个提供了多种方法挑选颜色的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/color-select/demo/basic)
9 | 日期选择 | 一个用于收集日期的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-picker/demo/basic)
10 | 日期时间选择 | 一个用于收集日期时间的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/basic)
11 | 日期时间选择 | 一个用于收集日期时间的表单控件，它以下拉的方式提供选择。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/date-time-select)
12 | 日期时间范围 | 一个用于收集日期开始和结束日期时间的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/basic)
13 | 日期时间范围 | 一个用于收集日期开始和结束日期时间的表单控件，它以下拉的方式提供选择。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/range-date-time-select)
14 | 鱼骨图 | 鱼骨图通常用于以鱼骨的方式呈现具有从属关系的一些数据。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/fish-bone/demo/full)
15 | 图形 | 以图形方式呈现任何数据，包括条形图，折线图，饼图，仪表等任何图形，基于 [echarts](echarts.baidu.com) 实现。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/graph/demo/pie)
16 | 标题 | 一个简单的组件，用于提示界面上某个区域的主题。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/header/demo/basic)
17 | 图标 | 一个字体图标，可作为链接按钮来用，支持Font-aweasome和[Jigsaw内部图标库](https://www.npmjs.com/package/@rdkmaster/icon-font)。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/icon/demo/basic)
18 | 输入框 | 一个用于收集单行文本信息的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full)
19 | 搜索框 | 一个用于按照文本模糊匹配的搜索框。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/search-input/demo/basic)
20 | 简单列表 | 一个用于将一组数据以文本列表方式呈现的控件，支持单选和多选，支持主标题和副标题，支持图标。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full)
21 | 列表 | 一个增强版的 [List Lite](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full) 控件，支持以任何形式呈现一组数据。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list/demo/full)
22 | 加载中 | 显示一段简单的动画以缓解用户在等执行某些操作期间的焦虑感。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
23 | 菜单 | 一个多级菜单控件，常常用于功能导航。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/navigation)
24 | 通知提醒框 | 在UI的角落里弹出一些不重要的消息，或收集一些不重要的用户选择。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/notification/demo/full)
25 | 数字输入框 | 一个用于收集数字的表单控件，支持整数和浮点数。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/numeric-input/demo/step)
26 | 分页 | 一个用于将大量数据分成多个页面显示的控件，不仅可以与表格组件配合，还可以实现对任意数据的分页操作。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/pagination/demo/basic)
27 | 进度条 | 一个水平进度条。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo/full)
28 | 圆形进度条 | 一个圆形进度条。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo/circle-progress)
29 | 单选框 | 一个用于收集单个选项的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/radio-group/demo/full)
30 | 打分 | 一个用于打分的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/rate/demo/full)
31 | 滚动条 | 一个用于任意容器的自定义滚动条，基于 [perfect scrollbar](https://github.com/utatti/perfect-scrollbar)。  | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/scrollbar/demo/basic)
32 | 下拉选择 | 一个用于通过下拉列表来收集选项的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
33 | 下拉分组选择 | 一个用于通过下拉列表来收集选项的表单控件，支持选项分组，常用于选项较复杂的场合。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select-group/demo/select-group)
34 | 下拉折叠选择 | 一个用于通过下拉列表来收集选项的表单控件，支持折叠方式对选项分组，常用于选项较复杂的场合。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select-collapse/demo/select-collapse)
35 | 信令流程图 | 一个信令流程图。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/swim-lane-diagram)
36 | 滑动条 | 一个用于通过滑动收集数字信息的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
37 | 步骤条 | 显示一系列具有某些预定义状态的自定义步骤。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/steps/demo/goto-step)
38 | 开关 | 一个用于收集 是/否 或 开/关 的表单控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/switch/demo/basic)
39 | 页签头 | 一个[Tabs容器](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/renderer)的页切换器。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab-bar/demo/type)
40 | 表格 | 一个非常非常强大的数据表。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/renderer)
41 | 标签 | 一个标签控件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tag/demo/basic)
42 | 多行文本框 |  | [Demo]()
43 | 平铺 | 一个通过水平平铺方式来显示数据的列表，[List](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full)组件则是将数据垂直平铺。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tile-lite/demo/full)
44 | 平铺 | 一个增强版的 [Tile](https://jigsaw-zte.gitee.io/latest/#/components/tile-lite/demo/full) 控件。 | [Demo]()
45 | 时分秒选择 | 一个时间选择器，用于选择时分秒。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo/basic)
46 | 时段选择器 | 一个时间规则选择器，可设置用于匹配时间的规则。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-section/demo/basic)
47 | 穿梭选择 | 一个复杂选择器，用于大量条目的选择，支持分页。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/transfer/demo/basic)
48 | 树 | 以树的方式渲染一些具有从属关系的数据，基于 [ztree](http://www.treejs.cn/v3/main.php#_zTreeInfo)。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tree/demo/editable)
49 | 上传结果 | 打开文件选择器挑选一些文件并上传到服务器。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result)
50 | 视口 | 表示一个抽象视图的一部分。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/big-table)

### 容器 / Containers

\# | 名称 | 简述         | 链接
---|------|-------------|------
1 | 盒子布局 | 基于 flex 的强大视图布局器，将视图抽象为水平和垂直Box，并以他们的相互组合来实现复杂视图的快速布局。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/box/demo/middle-resize-line)
2 | 折叠 | 可以折叠或打开给定视图的容器。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/collapse/demo/full)
3 | 组合框 | 一个可以隐藏任何给定视图的容器，用户可以向下拉以显示此视图。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/combo-select/demo/searchable)
4 | 对话框 | 一个对话框组件，常常与 [PopupService](https://jigsaw-zte.gitee.io/latest/#/components/api/injectable/PopupService) 配合弹出使用。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/dialog/demo/popup-option)
5 | 抽屉 | 一个抽屉，常常用于收纳复杂视图。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drawer/demo/drawer-in-drawer)
6 | 选项卡 | 一个多页折叠容器，可将多个视图叠加在一起。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/api)

### 服务 / Services

\# | 名称 | 简述         | 链接
---|------|-------------|------
1 | 前后端通信 | Jigsaw封装了许多各式数据对象来帮助应用更容易的实现数据与控件之间的对接。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/data-encapsulation/demo/array-ssp)
2 | 加载中服务 | 用于弹出和管理给定的 [Loading](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full) 组件。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
3 | 弹出服务 | 弹出任意给定视图到UI的顶部，非常强大。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/dialog/demo/popup-option)
4 | 时间相关功能 | 将时间宏（如`now-1d`）转换为实际值。 | [Demo](--)
5 | 国际化 | 用于创建一个支持多语言的视图。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/i18n/demo/full)
6 | 图形化图标 | 将给定的简单数据渲染成一个小图标。 | [Demo](--)

### 指令 / Directives

\# | 名称 | 简述         | 链接
---|------|-------------|------
1 | 多功能徽标 | 给任意视图添加徽标以抓取用户的注意力，支持多种形式的徽标。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/badge/demo/basic)
2 | 菜单 | 给任意视图添加多级菜单功能，或者弹出一个上下文菜单。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/options)
3 | 图形批量下载 | 给一个图形容器添加一个将容器内所有图形的截图下载的功能。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/graph/demo/download-directive)
4 | 拖拽 | 赋予宿主视图支持鼠标拖拽的能力。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drag-drop/demo)
5 | 任意视图下拉 | 在宿主附近以下拉的形式弹出任意给定的视图，支持多种下拉位置。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/float/demo/pos-reviser)
6 | 跟随鼠标移动 | 添加到任意视图上，让该视图可以被鼠标拖动并跟随鼠标移动的能力。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/badge/demo/move)
7 | 多功能提示 | 给任意视图添加一个上下文提示，支持富文本，支持交互。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tooltip/demo/html-renderer)
8 | 富文本渲染器 | 与Angular的innerHtml指令功能相似，但不会删除给定的html片段中的敏感信息，支持交互。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/trusted-html/demo/full)
9 | 上传 | 给任意视图添加文件上传的功能，需要与[上传结果显示控件](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result)一起配合使用。 | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result)

## 名字的内涵
Jigsaw原意是七巧板，一种拼图游戏。游戏的过程和现代web页面开发过程很类似，游戏者按照既定的蓝图将杂乱的碎片组合成一幅图，我们使用这个名字正是为了让web页面开发者能够像玩Jigsaw游戏一样，边玩边开发你的页面。

**组合**是Jigsaw的灵魂，我们致力于将组合做到极致。

把若干组件按照一定的顺序排列&布局之后可以得到一个应用页面，这是通常意义上的组合，我们将这个层次的组合称归之为Level I。Level I 的组合把组件当做原子，不可再拆分。

Jigsaw的组件不再是原子，它对组件的功能进行了二次抽象，同时，允许组件的局部高度定制化，甚至有的组件做到完全的可定制化。小到类似`jigsaw-button`这样的基础组件，大到`jigsaw-table`这样的巨无霸组件，你看到的几乎每个UI元素，都是可以与其他组件再组合来覆盖其默认行为。原子组件是有限的，组合才能产生无限的可能。这里提到的定制化，换句话说，就是另一种形式的组合，我们将这个层次的组合归为Level II。

用Jigsaw，尽情释放你的想象力吧！


## 用法
### 全新的开始
我们强烈推荐使用 [Jigsaw Seed](https://github.com/rdkmaster/jigsaw-seed) 来作为新工程的开始。具体步骤为：
1. 如果未安装nodejs，或者nodejs低于6.x.x，npm版本低于3.x.x，请先安装[nodejs](https://nodejs.org)。
2. [下载](https://github.com/rdkmaster/jigsaw-seed/archive/master.zip)或者[clone](https://github.com/rdkmaster/jigsaw-seed) Jigsaw Seed 的源码。假设保存到了 `d:\jigsaw-seed`。
3. 下载依赖包，执行如下脚本（不能使用cnpm安装，会有问题，原因[在这里](https://github.com/cnpm/cnpmjs.org/issues/1463)）

```
cd d:\jigsaw-seed
npm config set registry=https://registry.npm.taobao.org/                 # for Chinese developers only
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass # for Chinese developers only
npm install -g @angular/cli                                              # 强烈推荐，可选
npm install
npm start
```

- **中国大陆的开发者请注意***：不要使用cnpm安装，会导致编译失败，原因[在这里](https://github.com/cnpm/cnpmjs.org/issues/1463)；
- **中兴内网用户请注意**：你可以使用中兴内网npm镜像来提升安装依赖包的速度，[详情点击这里](docs/how-to-use-npm-mirror-inside-of-zte/index.md)；

4. 浏览器里打开 http://localhost:4200 如果看到欢迎页，表示你的开发环境搭建完毕。
5. 后续直接在 `d:\jigsaw-seed` 目录下运行 `npm start` 命令就可以启动开发环境了。Jigsaw专门针对现代的IDE做了代码优化，让这些IDE可以精确提示更多的信息，节约你翻阅api文档的时间。我们推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)作为IDE。

### 集成到已有工程中
[具体过程请看这里](docs/integrate-your-project-with-jigsaw/index.md)

## 新手宝典
[Jigsaw Tourist](https://github.com/rdkmaster/jigsaw-tourist) 是一个专门为新手准备的教学工程，它展示了从零开始如何使用jigsaw来构建一个难度中等的应用页面。[单击这里](docs/tourist/index.md)，勇敢的迈出你在Jigsaw的第一步吧。

上手过程中有任何困难，请关注Jigsaw的官方微信公众号，在那里可以加入SOS群和我们开发者直接对话：

![](docs/image/qr-weixin.jpg)

## 进阶学习
[Any Badge](https://github.com/rdkmaster/any-badge)是一个使用Jigsaw和[RDK](https://github.com/rdkmaster/rdk)作为前后端框架来开发一个web应用的最佳实践。它介绍了如何使用Jigsaw和[RDK](https://github.com/rdkmaster/rdk)来开发一个页面，这是在学习了[Tour of Heroes](https://angular.io/tutorial)和[Jigsaw Tourist](https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md)之后进阶学习Jigsaw的好途径。

## 求星星！
请随手赏个星星，这是对我们最好的鼓励！

## 参与贡献
我们认为如下的行为都是在做贡献：
- 默默的关注；
- watch/star/fork 这个工程；
- 给我们[提bug/需求/建议](https://github.com/rdkmaster/jigsaw/issues/new)；
- 给我们写写文档，写点小文章；
- 更有效的是给我们推送PR，所有的PR我们都欢迎并会认真处理；
    - 请优先处理没有打 `suspend` 标签的[issue](https://github.com/rdkmaster/jigsaw/issues)；
    - [这里](https://github.com/rdkmaster/jigsaw/blob/master/docs/coding-spec.md)是一份简单的代码规范，请尽量遵守它；

