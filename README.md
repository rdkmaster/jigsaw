# Jigsaw

[![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw)
[![Build Status](https://travis-ci.org/rdkmaster/jigsaw.svg?branch=master)](https://travis-ci.org/rdkmaster/jigsaw)
[![Coverage Status](https://coveralls.io/repos/github/rdkmaster/jigsaw/badge.svg?branch=master)](https://coveralls.io/github/rdkmaster/jigsaw?branch=master)


## 名字的内涵
Jigsaw原意是一种拼图游戏，游戏的过程和现代web页面开发过程很类似，游戏者按照既定的蓝图将杂乱的碎片组合成一幅图，我们使用这个名字正是为了让web页面开发者能够像玩Jigsaw游戏一样，边玩边开发你的页面。

**组合**是Jigsaw的灵魂，我们致力于将组合做到极致。

把若干组件按照一定的顺序排列、布局之后可以得到一个应用页面，这是通常意义上的组合，我们将这个层次的组合称归之为Level one。Level one 的组合把组件当做原子，不可再拆分。

Jigsaw的组件不再是原子，它对组件的功能进行了二次抽象，同时，允许组件的局部高度定制化，甚至有的组件做到完全的可定制化。这里提到的定制化，换句话说，就是另一种形式的组合。小到类似`rdk-button`这样的基础组件，大到`rdk-table`这样的巨无霸组件，你看到的几乎每个UI元素，都是可以与其他组件再组合来覆盖其默认行为。原子组件是有限的，组合才能产生无限的可能。我们将这个层次的组合归为Level two。

用Jigsaw，尽情释放你的想象力吧！


## 用法
### 全新的开始
我们强烈推荐使用 [Jigsaw Seed](https://github.com/rdkmaster/jigsaw-seed) 来作为新工程的开始。具体步骤为：
1. 如果未安装nodejs，或者nodejs低于6.x.x，npm版本低于3.x.x，请先安装[nodejs](https://nodejs.org)。
2. [下载](https://github.com/rdkmaster/jigsaw-seed/archive/master.zip)或者[clone](https://github.com/rdkmaster/jigsaw-seed) Jigsaw Seed 的源码。假设保存到了 `d:\jigsaw-seed`。
3. 下载依赖包，执行如下脚本
```
cd d:\jigsaw-seed
npm config set proxy=http://proxy.zte.com.cn:80 #如果当前处于直连网络，则不可执行这个命令
npm config set registry=https://registry.npm.taobao.org/ # Chinese developer only
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ # Chinese developer only
npm install -g @angular/cli # 推荐将angular-cli装为全局命令。可选。
npm install
npm start
```
4. 浏览器里打开 http://localhost:4200 如果看到欢迎页，表示你的开发环境搭建完毕。
5. 后续直接在 `d:\jigsaw-seed` 目录下运行 `npm start` 命令就可以启动开发环境了。我们推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)作为IDE，Jigsaw专门针对这类IDE做了代码优化，让这些IDE可以精确提示更多的信息，节约你翻阅api文档的时间。

### 集成到已有工程中
1. 在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```
2. 安装其他的依赖项
```
npm install --save @ngx-translate/core@^6.0.1
npm install --save @ngx-translate/http-loader@^6.0.3
npm install --save core-js@^2.4.1 #不考虑IE系列可不安装
npm install --save echarts@3.5.2
npm install --save eonasdan-bootstrap-datetimepicker@^4.17.47
npm install --save font-awesome@^4.7.0
npm install --save jquery@^3.1.1
npm install --save jquery-mousewheel@^3.1.13
npm install --save malihu-custom-scrollbar-plugin@^3.1.5
npm install --save web-animations-js@^2.2.5
npm install --save ztree@^3.5.24"
```

## 求星星！One More Star Please!
请随手赏个星星，这是对我们最好的鼓励！This is the best encouragement for us.

## 组件状态图
![](comp-map.png)

## 参与贡献
建议优先处理没有打 `suspend` 标签的issue。所有的PR我们都欢迎并会认真处理。
