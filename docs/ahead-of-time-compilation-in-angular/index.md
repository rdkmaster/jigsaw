# 译文 | Angular中的AoT编译

> 前两天，Jigsaw七巧板上来了个issue <https://github.com/rdkmaster/jigsaw/issues/113>，[@jackjoy](https://github.com/jackjoy) 在issue中提到了一篇介绍Angular AoT的文章，我看了一下，觉得讲的非常好，还涉及到一些Angular编译原理的内容。于是打算翻译一下，让大伙都能够读一读，多了解一点AoT知识。
>
> 文中的第一人称“我”均指代作者本人(<http://blog.mgechev.com>)
>
> 原文地址是 <http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/>

最近我给angular-seed增加了对Ahead-of-Time（AoT）编译的支持，这引来了不少关于这个新特性的问题。我们从下面这些话题开始来回答这些问题：
- 为什么Angular需要编译？
- 什么东西会被编译？
- 他们是如何被编译的？
- 编译发生在什么时候？JiT vs AoT
- 我们从AoT中获得了什么？
- AoT编译是如何工作的？
- 我们使用AoT和JiT的代价是什么？

## 为什么Angular需要编译？
这个问题的简短回答是：**编译可以让Angular应用达到更高层度的运行效率**，我所说的效率，主要是指的性能提升，但也包括电池节能和节省流量。

AngularJs1.x 有一个实现渲染和变化检测的很动态的方式，比如AngularJs1.x的编译器非常通用，它被设计为任何模板实现一系列的动态计算，虽然它在通常情况下运行的很好，但是JS虚拟机的动态特性让一些低层次的计算优化变得很困难。**由于js虚拟机无法理解那些我们作为脏检查的上下文对象（术语为scope）的形态，虚拟机的内联缓存常常不精确，这导致了运行效率的下降**。

> 译者：scope是AngularJs1.x中的一个重要对象，他是AngularJs1.x用于计算模板的上下文。

Angular2+采用了一个不同的方式。在给每个组件做渲染和变化检测的时候，它不再使用同一套逻辑，框架在运行时或者编译时会**生成**对js虚拟机友好的代码。**这些友好的代码可以让js虚拟机在属性访问缓存，执行变化检查，进行渲染的逻辑执行的快的多**。

举个例子，看看下面的代码：

```
// ...
Scope.prototype.$digest = function () {
  'use strict';
  var dirty, watcher, current, i;
  do {
    dirty = false;
    for (i = 0; i < this.$$watchers.length; i += 1) {
      watcher = this.$$watchers[i];
      current = this.$eval(watcher.exp);
      if (!Utils.equals(watcher.last, current)) {
        watcher.last = Utils.clone(current);
        dirty = true;
        watcher.fn(current);
      }
    }
  } while (dirty);
  for (i = 0; i < this.$$children.length; i += 1) {
    this.$$children[i].$digest();
  }
};
// ...
```

这个代码片段来自《轻量级angularJs1.x实现》一文。这些代码实现了对scope树做深度优先搜索，目的是为了寻找绑定数据的变化，这个方法对任何指令都生效。这些代码显然比下面这些直接指定检查的代码慢：

```
// ...
var currVal_6 = this.context.newName;
if (import4.checkBinding(throwOnChange, this._expr_6, currVal_6)) {
    this._NgModel_5_5.model = currVal_6;
    if ((changes === null)) {
        (changes = {});
    }
    changes['model'] = new import7.SimpleChange(this._expr_6, currVal_6);
    this._expr_6 = currVal_6;
}
this.detectContentChildrenChanges(throwOnChange);
// ...
```

> 译者：
> -《轻量级angularJs1.x实现》的地址是 <https://github.com/mgechev/light-angularjs/blob/master/lib/Scope.js#L61-L79>
> - 这里一下子提及了angularJs1.x的好几个概念，包括scope，数据绑定，指令。不熟悉angularJs1.x的同学理解起来费劲，想弄懂的话，自行搜索吧。个人认为可以无视，毕竟这个文章的重点不是在这里。你就认为Angular2+的处理方式比angularJs1.x牛逼很多就好了，哈哈。

上面代码包含了一个来自angular-seed的某个编译后的组件的代码，这些代码是由编译器生成的，包含了一个 `detectChangesInternal` 方法的实现。Angular框架通过直接属性访问的方式读取了数据绑定中的某些值，并且采用了最高效的方式与新的值做比较。一旦Angular框架发现这些值发生了变化，它就立即更新只受这些数据波及的DOM元素。

在回答了“为什么Angular需要编译”这个问题的同时，我们同时也回答了“什么东西会被编译”这个问题。我们希望把组件的模板编译成一个JS类，这些类包含了在绑定的数据中检测变化和渲染UI的逻辑。通过这个方式，我们和潜在的平台解耦了。换句话说，通过对渲染器采取了不同的实现，我们在不对代码做任何的修改的前提下，就可以对同一个以AoT方式编译的组件做不同的渲染。比如，上述代码中的组件还可以直接用在NativeScript中，这是由于这些不同的渲染器都能够理解编译后的组件。

## 编译发生在什么时候？JiT 还是 AoT

![](timing.jpg)

Angular编译器最cool的一个点是它可以在页面运行时（例如在用户的浏览器内）启动，也可以作为构建的一个步骤在页面的编译时启动。这主要得益于Angular的可移植性：我们可以在任何的平台的JS虚拟机上运行Angular，所以我们完全可以在浏览器和NodeJs中运行它。

### JiT编译模式的流程
一个典型的非AoT应用的开发流程大概是：

- 使用TypeScript开发Angular应用
- 使用`tsc`来编译这个应用的ts代码
- 打包
- 压缩
- 部署

一旦把app部署好了，并且用户在浏览器中打开了这个app，下面这些事情会逐一进行：

- 浏览器下载js代码
- Angular启动
- Angular在浏览器中开始JiT编译的过程，例如**生成**app中各个组件的js代码
- 应用页面得以渲染

### AoT编译模式的流程
相对的，使用AoT模式的应用的开发流程是：

- 使用TypeScript开发Angular应用
- 使用`ngc`来编译应用
    - 使用Angular编译器对模板进行编译，**生成TypeScript代码**
    - TypesScript代码编译为JavaScript代码
- 打包
- 压缩
- 部署

虽然前面的过程稍稍复杂，但是用户这一侧的事情就变简单了：

- 下载所以代码
- Angular启动
- 应用页面得以渲染

如你所见，第三步被省略掉了，这意味着页面打开更快，用户体验也更好。类似Angular-cli和Angular-seed这样的工具可以让整个编译过程变的非常的自动化。

概括起来，Angular中的Jit和AoT的主要区别是：
- 编译过程发生的时机
- JiT生成的是JS代码，而AoT生成的是TS代码。这主要是因为JiT是在浏览器中进行的，它完全没必要生成TS代码，而是直接生产了JS代码。

你可以在我的Github账号中找到一个最小的AoT编译demo，链接在这里 <https://github.com/mgechev/angular2-ngc-rollup-build>

## 深入AoT编译
![](mechanics.jpg)

这个小节回答了这些问题：
- AoT编译过程产生了什么文件？
- 这些产生的文件的上下文是什么？
- 如何开发出AoT友好又有良好封装的代码？

对`@angular/compiler`的代码一行一行的解释没太大意义，因此我们仅仅来快速过一下编译的过程。如果你对编译器的词法分析过程，解析和生成代码过程等感兴趣，你可以读一读Tobias Bosch的《Angular2编译器》一文，或者它的胶片。

> 译者：
> -《Angular2编译器》一文链接 <https://www.youtube.com/watch?v=kW9cJsvcsGo>
> - 它的胶片链接 <https://speakerdeck.com/mgechev/angular-toolset-support?slide=69>

Angular模板编译器收到一个组件和它的上下文（可以这认为是组件在组件树上的位置）作为输入，并产生了如下文件：
- `*.ngfactory.ts` 我们在说明组件上下文的小节会仔细看看这些文件
- `*.css.shim.ts` 样式作用范围被隔离后的css文件，根据组件所设置的 `ViewEncapsulation` 模式不同而会有不同
- `*.metadata.json` 当前组件/模块的装饰器元数据信息，这些数据可以被想象成以json格式传递给 `@Component` `@NgModule` 装饰器的信息。

`*` 是一个文件名占位符，例如对于`hero.component.ts`这样的组件，编译器生成的文件是 `hero.component.ngfactory.ts`, `hero.component.css.shim.ts` 和 `hero.component.metadata.json`。`*.css.shim.ts`和我们讨论的主题关系不大，因此不会对它详细描述。如果你希望多了解 `*.metadata.json` 文件，你可以看看“AoT和第三方模块”小节。

### `*.ngfactory.ts` 的内部结构
它包含了如下的定义：
- `_View_{COMPONENT}_Host{COUNTER}` 我们称之为**internal host component**
- `_View_{COMPONENT}{COUNTER}` 我们称之为 **internal component**
- `viewFactory_{COMPONENT}_Host{COUNTER}`
- `viewFactory_{COMPONENT}{COUNTER}`