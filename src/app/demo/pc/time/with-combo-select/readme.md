#### 初始时间的问题

当一个组件位于`ng-template`标签内部的时候，对绑定给这个组件的变量就需要被额外的关注，这些变量的初始化的时机与该组件不处于
`ng-template` 内部的情况会有很大的不同：

绑定给非位于在`ng-template`内部的组件的变量的初始化非常简单，在父组件的初始化完成之后马上进行，没有任何延迟。

但是绑定给位于在`ng-template`内部的组件的变量的初始化，却不是这样的，这个过程被延迟到这个`ng-template`视图被渲染到UI上的时候才进行的。
就本demo的代码举例来说，combo组件内部的`jigsaw-time`位于`ng-template`内部，因此绑定给`jigsaw-time`的变量 `beginDate` 和 `endDate`
的初始化需要一直被推迟到鼠标移动到combo上，打开下拉视图的一刹那才被`jigsaw-time`初始化。

`jigsaw-time`初始化的时候，才将 `beginDate` 和 `endDate` 从时间宏`now-7d`转为实际时间。为了避免时间宏的初始化不及时的问题，
我们不得不将代码改写为：

```
beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
endDate = TimeService.getFormatDate('now', TimeGr.date);
rangeTimeComboValue = new ArrayCollection([
    {label: this.beginDate, closable: false},
    {label: this.endDate, closable: false}
]);
```

这样才会保证在ComboSelect未触发下拉时，`beginDate`、`endDate`设置的初始值是正确的格式，ComboSelect的显示值也是正确的。

关于`ng-template`的更多信息，可以[访问这里](https://angular.io/guide/template-syntax)。
