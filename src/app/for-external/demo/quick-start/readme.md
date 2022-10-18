## 预备知识

建议按照章节顺序学习，效果更佳。

### HTML5 / CSS3 相关知识

Jigsaw的组件大大弱化了开发者的 HTML5 / CSS3 的技能要求，因此这方面的内容只要大概了解一下即可，在无需非常深入学习的前提下，也可以继续下一步的学习，或者直接上手开发，边写代码边学习。

推荐的内容：（待补充）

### ES6相关知识

[点击查看ES6基础知识](/vmax-studio/awade/docs/basic-knowledge/es6-basic)

现代化网页开发必备技能之一，如果你是一个彻头彻尾的新手，或者还没掌握ES6，那请先学习一下阮一峰的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)。

如果你非常忙，没有时间把书看完，那么我建议你着重阅读如下的小节。在通读全书的时候，也请着重阅读如下小节。

- let 和 const 命令 <http://es6.ruanyifeng.com/#docs/let>
- 变量的解构赋值 <http://es6.ruanyifeng.com/#docs/destructuring>
- Set 和 Map 数据结构 <http://es6.ruanyifeng.com/#docs/set-map>
- Promise 对象 <http://es6.ruanyifeng.com/#docs/promise>
- Iterator 和 for...of 循环 <http://es6.ruanyifeng.com/#docs/iterator>
- 修饰器 <http://es6.ruanyifeng.com/#docs/decorator>

以上列表是我假设你已经熟悉了ES5的前提下给出来的，如果你连ES5都不熟悉，那还是请乖乖的把整本书看完吧。

### TS相关知识

[点击查看TS基础知识](/vmax-studio/awade/docs/basic-knowledge/ts-basic)

所有基于Angular或者Jigsaw的页面都必须采用[TypeScript](https://www.tslang.cn)语言编码，如果你还不了解它，那请先[学习](https://www.tslang.cn/docs/home.html)一下这门语言。

莫慌！如果你已经熟悉了ES6，那只要简单的浏览一下TS的语法即可，无需专门花时间学习，甚至你都可以跳过这一步，在以后的日子里边写代码边学也可以。

如果你非常忙而没能通读所有内容，那么我建议你着重阅读如下的小节：

- 类型相关，这部分是TS的精华
    - [基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)，建议仔细阅读；
    - [枚举](https://www.tslang.cn/docs/handbook/enums.html)，建议仔细阅读；
    - [类型推论](https://www.tslang.cn/docs/handbook/type-inference.html)，建议简单了解；
    - [类型兼容性](https://www.tslang.cn/docs/handbook/type-compatibility.html)，建议简单了解；
    - [高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)，建议仔细阅读；
- 语言相关，如果你已经熟悉了ES6，则如下内容可以快速过一下就好
    - [变量声明](https://www.tslang.cn/docs/handbook/variable-declarations.html)，基本上可直接跳过；
    - [函数](https://www.tslang.cn/docs/handbook/functions.html)，箭头函数的语法一定要学扎实，非常重要；
    - [泛型](https://www.tslang.cn/docs/handbook/generics.html)，建议了解一下，至少要能看懂其语法；
    - [装饰器](https://www.tslang.cn/docs/handbook/decorators.html)，建议只了解语法，会用就行啦，无需理解其原理；
- OOP相关，这是TS另一个非常有价值的功能
    - [接口](https://www.tslang.cn/docs/handbook/interfaces.html)，建议了解语法；
    - [类](https://www.tslang.cn/docs/handbook/classes.html)，建议仔细阅读；
- 项目配置，普通开发可以无视，TL必须了解，且越多越好
    - [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
    - [编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

### RxJS相关知识

Angular采用RxJS替代Promise来处理异步，把Promise比作鸟枪的话，那么RxJS就是大炮了，RxJS的能力和可用范围，比Promise强的不是一点两点。但是凡事总有两面性，强大带来的是需要额外的上手成本。幸运的是，我们不需要掌握RxJS所有知识，只要了解一点点就能玩下去。我把这些开发angular页面必须掌握的东西列举如下：

#### `subscribe()`与`unsubscribe()`

Angular的整个事件机制是建立在RxJS的基础上的，因此凡是涉及到事件、异步的功能，都离不开调用这2个方法来注册和反注册监听器。

Angular里涉及到的有

- **EventEmitter 这是Angular里定义事件所必须用到的类，相关文章：<https://angular.io/guide/observables-in-angular#event-emitter>**
- **[HttpClient](https://angular.cn/guide/http)的get/put/post/delete/request等方法的返回值。**
- Async pipe，异步管道，相关文章：<https://angular.io/guide/observables-in-angular#async-pipe>
- Router变化的相关事件，相关文章：<https://angular.io/guide/observables-in-angular#router>
- 响应式表单的相关事件，相关文章：<https://angular.io/guide/observables-in-angular#reactive-forms>

加粗的EventEmitter/HttpClient这2个是必学内容，其他的按需，用到的时候再看也来得及。

#### 常用的RxJS操作符（operators）

这是RxJS最神奇最牛逼的功能，[RxJS操作符](http://cn.rx.js.org/manual/overview.html#h213)非常非常多，但是需要了解的并不多，列举如下

- map [HttpClient](https://angular.cn/guide/http)里常常用到的功能，[详见这里](http://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-map)
- debounceTime [详见这里](http://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-debounceTime)
- do [详见这里](http://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-do)
- retry [详见这里](http://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-retry)

当然，和其他所有知识一样，对他们了解、掌握的越多，对你写代码越有利！

### OOP相关知识
[点击查看OPP基础知识](/rdk/app/ui-designer/docs/basic-knowledge/oop-basic.zip)

## IDE选择建议

工欲善其事必先利其器，挑选一个好的IDE你就已经迈出了坚实的一步，[WebStorm](https://www.jetbrains.com/webstorm/)和[VSCode](https://code.visualstudio.com/)都是不错的选择。

## Angular

[点击查看Angular基础知识](/vmax-studio/awade/docs/basic-knowledge/ng-basic)

Angular的概念很多，知识点也不少，但值得庆幸是你无需学习完所有的概念才能开工，只要学习和理解“**模块**”和“**组件**”两大概念，即可开工干活了，如果你要开发的是一个SPA（单页应用），那么还需要再学习“**路由**”的相关知识。

Angular所有概念的学习材料，都可以在 <https://angular.cn/docs> 找到。这里提供的是一站式的所有资料，因此别去搜索引擎找了，多数没啥价值。只要耐心将这里列出的知识点都阅读一两遍，就可以完全满足日常开发所需，多数bug也可以在这里找到答案。**强烈建议**初学者优先阅读官方的[《英雄指南》](https://angular.cn/tutorial)这一系列文章，它以从零开发一个简单SPA为线索介绍了Angular的所有基础知识。学习完了[《英雄指南》](https://angular.cn/tutorial)之后，再按需阅读“核心知识”章节的内容。这个过程约需要花掉2到3天的时间。

以下是其他学习途径/文章：

- 有问题需要询问的话，可以到 [Angular开发者](http://ngfans.net) 网站发帖询问，我会在上面帮你解答；
- 推荐一下大漠穷秋的[入门视频](http://ngfans.net/category/2/videos)，非常棒，推荐自学能力弱的同学仔细观看，动手编码；
- 这里是一些[优质学习资源](http://ngfans.net/topic/5/post)，东西较多，建议有了一定基础之后再按需学习；
- ES6、TS、Angular都有各自的模块概念，初学者容易混淆，如果你也老虎老鼠傻傻分不清楚，那么请读一下[这个文章](https://angular.cn/guide/architecture#模块)；

## Jigsaw

### 下载node

[下载node6](https://nodejs.org/download/release/v6.14.4/)
[下载node8](https://nodejs.org/download/release/v8.12.0/)

下载`.msi`文件，双击安装，安装完成后，在命令行执行`node -v` `npm -v`，出现版本号就说明安装成功。

中兴没有外网的人员，请点击参考[配置npm镜像](https://dev.zte.com.cn/topic/#/45132)

### 下载seed工程并启动

在命令行执行

```
    git clone https://github.com/rdkmaster/jigsaw-seed.git // 克隆seed工程
    cd jigsaw-seed // 进入项目根目录
    npm install // 下载依赖包，需要等一些时间
    npm start // 启动工程
```

> 点击查看[seed工程](https://github.com/rdkmaster/jigsaw-seed)

访问网页`localhost:4200`，如果能出现welcome的页面，就说明工程已启动起来了，整个jigsaw的开发环境也搭建好了。

### 查看组件demo

[demo地址](http://rdk.zte.com.cn/components/introduce)

> 我们为每个组件写了大量的demo，组件的功能大部分都显示在demo里，请仔细看。

> demo中可以查看示例和API，示例里可以点击'查看&编辑DEMO源码'查看源码。

### 简单的使用教程

[教程地址](https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md)

[代码地址](https://github.com/rdkmaster/jigsaw-tourist)

## 更新记录
- 20180218 新建。