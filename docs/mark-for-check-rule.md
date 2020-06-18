
## 关于`@RequireMarkForCheck`装饰器的使用

组件为了提升性能，变更检测策略改为了 `onPush` 模式了，这导致应用获取到组件的实例，并通过实例修改组件的输入属性时，组件内部无法检测到变化，
从而导致这个情况下组件失去了输入属性的绑定效果。为了解决这个问题，需要在输入属性的值有变化时，通过 `ChangeDetectorRef.markForCheck()`
来通知angular做变更检测。

为了更加方便的做好这个事情，我们新增了 `@RequireMarkForCheck` 装饰器来完成这个事情，只需要在任何输入属性上额外添加这个装饰器即可，示例代码为：

```
@Input()
@RequireMarkForCheck()
public valid: boolean = true;
```

这样一来，一个输入属性就会有多个装饰器，经测试，装饰器的顺序没有要求，并且，`@RequireMarkForCheck` 装饰器也能自动识别getter/setter。
理论上，任何输入属性都必须添加 `@RequireMarkForCheck` 装饰器，但是我们测试发现，不是所有的输入属性都需要这样做，并且没有确切的规则可以判断，
因此这个事情就比较麻烦了，必须通过人工来对各个输入属性一一做测试。经过一番测试，当前，我们把所有需要添加 `@RequireMarkForCheck`
装饰器的输入属性都找了出来并加上装饰器了。

对于那些不需要添加 `@RequireMarkForCheck` 装饰器输入属性，则必须在其文档注释中，添加一个标记来显式说明，示例代码如下：

```
/**
 * 控件的值是否有效，常常用于表单中，配合表单状态使用
 * @NoMarkForCheckRequired
 */
@Input()
public valid: boolean = true;
```

> 注意文档注释中的 `@NoMarkForCheckRequired` 标记

同时，我们在CI脚本里，加入了一个脚本用于对上述规则做检测，对于任何一个输入属性，必须拥有 `@RequireMarkForCheck`
装饰器或者 `@NoMarkForCheckRequired` 标记之一，且不能同时拥有这2个标记，否则脚本会报错。

现在，一个输入属性会有多个附加修饰（文档注释，多个装饰器），为了提升代码可读性，这个脚本还会强制约束输入属性的文档注释必须在所有装饰器的最前面，
否则它也会报错。比如下面的写法是非法的：

```
@Input()
/**
 * 控件的值是否有效，常常用于表单中，配合表单状态使用
 * @NoMarkForCheckRequired
 */
public valid: boolean = true;
```

## 本文的主要目的

虽然当前已经把所有需要变更检测的输入属性都一一做了标记，但考虑到日后组件演进过程中，势必有新增的组件、新增的输入属性，而这些新来的输入属性，
也必须经过类似小心的评估来确认是否需要添加 `@RequireMarkForCheck` 装饰器，如果确认不需要添加 `@RequireMarkForCheck` 装饰器，
则必须为这个输入属性添加一个文档注释，以通过CI的检测。

另外，由于在 `RequireMarkForCheck` 装饰器中，使用了 `Injector` 服务，来获取 `ChangeDetectorRef` 的实例，
所以，在需要使用 `RequireMarkForCheck` 装饰器的组件类中，请务必在构造器中，注入 `Injector` 服务：
```
constructor(protected _injector: Injector) {
}
```

## 如何评估

评估一个输入属性是否需要添加 `@RequireMarkForCheck` 装饰器的方法是，在demo中通过 `@ViewChild` 获得其实例，并通过这个实例直接修改新增的输入属性的值，
然后观察属性值修改之后，是否可以立即生效，如果不生效，表示需要添加 `@RequireMarkForCheck` 装饰器，否则就不需要。

**请务必仔细评估** 

