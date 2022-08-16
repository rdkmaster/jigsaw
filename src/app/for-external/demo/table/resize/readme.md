#### JigsawTable的`width`属性

```
<j-table [width]='tableWidth'></j-table>
```

通过修改上述代码中的`tableWidth`的值可以动态改变table的宽度，并且table的单元格宽度和水平滚动条也会自动刷新。

#### JigsawTable的`height`和`maxHeight`属性

通过设置`height`和`maxHeight`属性，可以控制table的高度，并且自动生成垂直滚动条。

#### 窗口resize事件

更改浏览器窗口大小时，table会自动刷新单元格宽度和水平滚动条。

#### table的父元素尺寸变化

由于元素尺寸不变化没有resize事件发出，因此如果需要在父元素尺寸变化时，table也跟着变化，需要调用table的`resize()`方法手工同步尺寸。

```
@ViewChild('tableCmp') tableCmp: JigsawTable;

changeTableParentWidth() {
    this.tableParent.style.width = '50%';
    this.tableCmp.resize();
}
```
