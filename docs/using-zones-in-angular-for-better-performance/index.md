# 译文 | 在Angular中使用zone来提升性能

 
> 关于原作者 Pascal Precht，他是一名资深前端狗，同时也是Google提名的Angular专家开发者。他作为Angular的贡献者，创作了angular翻译模块。同时他也是Angular文档团队的一员。
>
> 这篇文章创作与2017年2月21日，于2017年8月5日被_陈旭@中兴RDK_翻译。原文地址是 <https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html>
> 
> 译者：这是学习 Angular zone 的好文章，它揭开了神秘的zone，让我们对Angular的变化检测机制有了更加深刻的理解。Zone是Angular变化检测机制的基石，没有zone就没有变化检测机制。

在我们最近的一些文章中，我们讨论到了如何利用Angular的`ChangeDetectionStrategy` API和脱离变化检测器的小技巧等等，来让Angular应用运行的更快[1]。虽然我们提及了很多不同的方法来改进demo应用的性能，但是并不是所以的可能性都被提及。

Jordi Corllell提出了另一个方法，利用zone API来让我们的代码执行在Angular zone之外，这让Angular停止进行不必要的变化检测，他甚至花了时间和精力创建了一个plunk demo，用于演示这是如何做到的。

**我们必须要对他的工作道声谢谢**，并好好思考一下他文章中提及的解决方案。所以写这篇文章就是为了看看他写的这个demo，并解释他是如何利用zone来让这个demo应用以接近60fps（帧每秒）的效率运行的。

## 主要内容
- 实际看看这个demo
- zone的概念
- 让代码在Angular zone以外运行
- 测算性能
- 结论

## 实际看看这个demo
在我们开始阅读代码之前，我们先看看这个demo的运行效果。快速介绍一下这个demo：demo创建了一万个可拖拽的svg框，主要挑战来自如何让拖拽某个框过程尽可能的平滑，而非创建这一万个框的过程。换句话说，我们的目标是实现60fps的平滑拖拽体验，考虑到在鼠标移动过程中频繁发出的事件，在默认情况下会导致Angular不停的对这一万个框进行重新渲染，这可能的确是一个挑战。

- 这是一个优化前的实现：<https://embed.plnkr.co/UBI5Sc5eDMpkDDkJfeGX>
- 这是Jordi利用Angular的zone API 优化后的版本：<https://embed.plnkr.co/GIf9sPuuZRLKwYK7mTfr>


注意两个demo的差异并不是特别容易察觉，优化后的版本的js每一帧的运行性能明显提升了。在给出具体的性能数据之前，我们先来快速了解一下zone，以及来看看demo的代码，并讨论一下Jordi是如何利用Angular的`NgZone`这个API让demo达到这样的性能的。

> 译者：原文的用词很容易给人造成误解。作者说的_不易察觉_是指demo表现上不容易被察觉，实际上只要你拖拽两个demo上的框框就会明显感觉到差距了。

## zone的概念
在我们开始使用Angular的`NgZone`这个zone API之前，我们需要先搞清楚zone到底是啥东西，以及为哈它在Angular里很有用。在这个方面我们不会太过深入，因为在这之前，我已经写了这两篇文章了：

- 理解zone[2]：讨论了普通情况下的zone的概念，以及它在分析异步代码执行方面的用途；
- Angular中的zone：讨论了Angular是如何利用zone的API创建了`NgZone`，`NgZone`让Angular自身以及Angular使用者的代码在zone内外运行。

如果你还没阅读过这两个文章，我们隆重推荐你阅读一下他们，他们会让你对zone是啥以及它能够做啥有一个坚实的理解。简单的说，zone对浏览器的异步API做了封装，并对外发出异步任务何时开始何时结束的通知。Angular利用了这一点，从而获得异步任务执行结束的通知。异步任务包括了`xhr`调用，`setTimeout()`，以及各种各样的用户事件，例如 `click`, `submit`, `mousedown`...

因为任何的异步任务都可能导致应用状态的变化，Angular在得到异步任务结束的通知之后，就知道它应该执行变化检测了。我们在使用`Http`服务从远程服务器上取到数据就是一个典型的例子，下面的代码片段演示了这样的一个调用是如何改变应用的状态的：

```
@Component(...)
export class AppComponent {

  data: any; // initial application state

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchDataFromRemoteService().subscribe(data => {
      this.data = data // application state has changed, change detection needs to run now
    });
  }
}
```

有趣的是，作为开发者，我们不需要通知Angular何时该进行变化检测，zone会替我们告诉Angular的，这是因为Angular注册了相应的回调了。

既然说到这了，我们就来看看如何利用这个特性帮助我们提升应用的性能。

## 让代码在Angular zone以外运行
我们已经知道了，在任何的异步任务结束之后，Angular都会进行变化检测，这就是我们优化前的demo运行的很慢的原因，我们先看看`AppComponent`的模板

```
@Component({
  ...
  template: `
    <svg (mousedown)="mouseDown($event)"
         (mouseup)="mouseUp($event)"
         (mousemove)="mouseMove($event)">

      <svg:g box *ngFor="let box of boxes" [box]="box">
      </svg:g>

    </svg>
  `
})
class AppComponent {
  ...
}
```

有3个事件被绑定在了svg元素上，任何一个事件的回调函数执行完了后，Angular的变化检测会开始执行。这就是说，即使我们没有拖拽一个框框，而是仅仅在他们上面移动鼠标，Angular也会进行变化检测！

这就是`NgZone` API可以派上用场的地方了，`NgZone`让我们可以精确控制哪些应该在Angular的zone以外运行，以达到避免触发不必要的变化检测。事件的回调函数依然会被调用，但是他们不是在Angular的zone中被调用的，因此在这些函数执行完毕后，Angular不会收到任何通知，因此它也就不会执行变化检测了。我们只需要在拖拽完成后松开鼠标的那一瞬间进行变化检测就行了。

我们如何做的到呢？在《Angular中的zone》[3]一文中，我们已经讨论了如何使用`NgZone.runOutsideAngular()`来让我们的代码运行在Angular的zone之外了，我们这里需要做的事情就是确保`mouseMove()`方法运行zone之外就好了。并且我们也知道，我们需要在一个框框在开始被拖拽之前才注册相应的事件回调函数。换句话说，我们不能在模板中注册这个事件的回调函数，而必须采用命令的方式来完成事件的注册。

代码看起来是这样的

```
import { Component, NgZone } from '@angular/core';

@Component(...)
export class AppComponent {
  ...
  element: HTMLElement;

  constructor(private zone: NgZone) {}

  mouseDown(event) {
    ...
    this.element = event.target;

    this.zone.runOutsideAngular(() => {
      window.document.addEventListener('mousemove', this.mouseMove.bind(this));
    });
  }

  mouseMove(event) {
    event.preventDefault();
    this.element.setAttribute('x', event.clientX + this.clientX + 'px');
    this.element.setAttribute('y', event.clientX + this.clientY + 'px');
  }
}
```

我们注入了`NgZone`，并在`mouseDown()`这个回调函数中调用了`runOutsideAngular()`方法，我们在这个方法中监听了`mousemove`事件，这确保了`mousemove`事件的回调函数的确是在我们开始拖拽框框的时候才被注册到dom上了。同时，我们保留被选择的框框的dom元素，这样我们才可以在`mouseMove()`中更新框框的`x`和`y`属性。注意到我们是直接对框框的dom元素进行操作的，而不是修改框框的数据对象通过绑定方式实现的拖拽效果，这是因为在zone外面，我们无法触发变化检测，绑定也就失效了。换句话说，我们**确实**更新了dom元素了，因此我们可以看到框框在移动，但是移动过程中，我们并未对框框的数据做出修改。

并且，要注意我们还把`mouseMove()`回调函数从组件的模板中删除了。我们还可以将`mouseUp()`回调函数也像`mouseMove()`一样，从模板中删除，并以代码的方式实现绑定，但是这样做并不能带来实质性的性能提升，因此我们还是将它保留在了模板中，以让实现变得简单一些：

```
<svg (mousedown)="mouseDown($event)"
      (mouseup)="mouseUp($event)">

  <svg:g box *ngFor="let box of boxes" [box]="box">
  </svg:g>

</svg>
```

下一步，我们需要确保在鼠标松开（`mouseUp`）的时候，我们能够正确更新框框对应的位置数据，并且，我们希望立即进行变化检测来让视图和数据模型恢复同步。`NgZone`一个很酷的功能是，它不仅能够让我们的代码运行在Angular zone的外头，还能够让代码继续回到Angular的zone中执行，这最终会再次触发Angular的变化检测。我们需要做的就是调用`NgZone.run()`，把需要执行的代码传递给它。

这是我们的`mouseUp()`的代码：

```
@Component(...)
export class AppComponent {
  ...
  mouseUp(event) {
    // Run this code inside Angular's Zone and perform change detection
    this.zone.run(() => {
      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
      this.currentId = null;
    });

    window.document.removeEventListener('mousemove', this.mouseMove);
  }
}
```

需要注意，我们在**每一次的`mouseUp`**中都会删除`mousemove`事件的回调函数，否则在鼠标移动的过程，它的回调函数就会继续执行，这会造成即使鼠标已经被释放，但是框框却仍然跟着鼠标移动的问题，从而让我们的拖拽功能失效。进一步的，我们要尽可能的把事件回调函数聚集在一起，否则不仅会造成一些奇怪的副作用，还会消耗内存。

## 测算性能




## 附录
- [1] how to make our Angular apps fast: <https://blog.thoughtram.io/angular/2017/02/02/making-your-angular-app-fast.html>
- [2] Understanding Zones: <https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html>
- [3] Zones in Angular: <https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html>
