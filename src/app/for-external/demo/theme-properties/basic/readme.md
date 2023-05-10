# 皮肤属性

此DEMO展示了在js中使用皮肤中各个属性的方法，提示：切换不同的皮肤时，这些属性的值会相应变化。

#### 在CSS中使用皮肤属性

请关注里的`code`标签的用法，在`code`标签的样式中有这样的代码：`background: var(--brand-active-lighten)`，
这里使用了皮肤中的`--brand-active-lighten`属性来渲染它的`background`。这样在切换皮肤的时候，无论是深色还是浅色下，都可以显示的很好。
如果应用希望实现一个可以完美适应深浅色系皮肤的APP，那么应该多多使用这个方法。

#### 在Js中使用皮肤属性

在JS中可以使用`JigsawThemeService.getProperty(property)`来读取`property`当前皮肤的各个属性值。
虽然多数情况下在CSS里使用样式皮肤就足够了，但是在一些特殊情况下需要通过JS操作DOM节点时，就需要用到这个API了。注意观察这段文字中的`code`标签的用法：

```
// HTML代码：
<code [ngStyle]="{background: codeTagBg}">
    some text
</code>

// TS代码：
public get codeTagBg(): string {
    return JigsawThemeService.getProperty('--blue-2');
}
```
