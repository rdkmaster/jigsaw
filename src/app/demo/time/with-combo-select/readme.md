#### 初始时间的问题

可以看到时间控件在文档流中的demo的`beginDate`、`endDate`是这么写的：

```
    beginDate: string = 'now-7d';
    endDate: string = 'now';
```

但是在与ComboSelect组合使用时，不能这么用。因为在ComboSelect未触发下拉时，Time或者RangeTime控件还没初始化，
`beginDate`、`endDate`没有转化为时间串，所以还是原来的时间宏`'now-7d'`、`'now'`，而且ComboSelect的显示值也是不对的。

解决方法是让`beginDate`、`endDate`初始化的时候就做好转换：

```
    beginDate = TimeService.getFormatDate('now-7d', TimeGr.date);
    endDate = TimeService.getFormatDate('now', TimeGr.date);
    rangeTimeComboValue = new ArrayCollection([
        {label: this.beginDate, closable: false},
        {label: this.endDate, closable: false}
    ]);
```

这样才会保证在ComboSelect未触发下拉时，`beginDate`、`endDate`设置的初始值是正确的格式，ComboSelect的显示值也是正确的。

