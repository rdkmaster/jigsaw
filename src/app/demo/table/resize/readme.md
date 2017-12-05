#### JigsawTable的`width`属性

```
<j-table [width]='tableWidth'></j-table>
```

通过设置`tableWidth`的值可以动态改变table的宽度，并且table的单元格宽度和横线滚动条也会自动刷新。

#### JigsawTable的`height`和`maxHeight`属性

通过设置`height`和`maxHeight`属性，可以控制table的高度，并且自动生成纵向滚动条。

#### window resize

更改浏览器窗口大小时，table会自动刷新单元格宽度和横线滚动条。

#### table的父元素尺寸变化

如果需要在table的父元素尺寸变化时，table也跟着变化，需要调用table的`resize`方法

```
@ViewChild('tableCmp') tableCmp: JigsawTable;

changeTableParentWidth() {
    this.tableParent.style.width = '50%';
    this.tableCmp.resize();
}
```
