#### 提供给列定义的值
表格的列定义接受两种类型值：
- `ColumnDefine[]`，在你的表格的列事先已知的场合，推荐使用这个方式提供列定义的方式，多数表格的列都是可以事先可以知道的；
- `ColumnDefineGenerator`，一个产生列定义的函数，可以编写任何复杂的逻辑，因此这个方式往往用于你的表格列事先不知道的场合。
这个函数的定义为：`(field: string, index: number) => ColumnDefine`，这个来自实际应用场景的 [demo](/table/swim-lane-diagram)
就用到了列定义产生器。

#### `ColumnDefine`的结构

`ColumnDefine`的结构如下：

```
{
    target?: number | string | (number | string)[];
    visible?: boolean;
    width?: string | number;
    header?: {
        text?: string;
        renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
        clazz?: string;
        sortable?: boolean;
        sortAs?: SortAs;
        defaultSortOrder?: SortOrder;
    };
    cell?: {
        renderer?: Type<TableCellRendererBase> | TemplateRef<any>;
        clazz?: string;
        editable?: boolean;
        editorRenderer?: Type<TableCellRendererBase>;
        data?: any | TableCellDataGenerator;
        tooltip?: any;
    };
    group?: boolean;
}
```

注意到`ColumnDefine`的所有字段都是可选的，你只要提供所需的定义字段即可。这些字段的功能与它的属性名含义一致，因此无需每个都解释一番。
实在有不清楚的，可以动手试一试。

#### 列渲染器

表格和其他控件一样，也是数据驱动的，`TableData`（及其子类）中有哪些列，表格就会原原本本的把这些列展示出来。
但是一般在这些场合下，需要对表格默认的列做出行为上的改变：
- 数据中的某些列数据是辅助数据，我们不希望将他们展示出来；
- 在强交互设计下的表格，很多列都需要带有交互性，以满足用户对数据的操作需求；
- 在强可视化设计下的表格，需要对表格的数据做可视化渲染；
- 其他场合，例如需要根据列数据改变列宽，修改文本样式以强调数据等等；

表格的列定义模式就是为了解决上述林林总总的列修饰需求的。

**列渲染器是列定义中最重要的一个功能**，它则主要用于如下目的：
- 改变列数据的展示方式；
- 增强列的交互性

这个demo中，我们用到了两类列渲染器，一个是列头渲染器（见职位/部门列），一个是单元格渲染器(见部门列）。
列头渲染器通常是用于对本列数据做过滤，本demo展示了单选过滤（职位列）和多选过滤（部门列）的实现方式。

单元格渲染器比列头渲染器要更加复杂一些，它有两个状态：
- **静默状态**：表格默认呈现该单元格的状态，这个状态最典型的用法是改变数据的呈现方式，比如可以用小图标来替代枚举型数据，
    可以用进度条渲染进展，用不同颜色的背景表示数据的状态等等，发挥你的想象力肯定可以想到更多的用法。
    注意这个状态下也是可以带有编辑功能的，参考第二列勾选框列。
- **激活状态**：当单元格获得焦点的时候的状态，单元格渲染器允许单元格在这个状态下变成另一个形态，参考部门列。
    在Excel中我们可以看到在编辑一个单元格的时候，可以通过下拉选择的方式对单元格编辑的数据有效性做约束，
    本demo的部门列就演示了如何实现这样的功能。

#### 列宽调整

表格的列宽原则是：优先给指定了列宽的列分配宽度，然后将剩余的宽度均分给剩余未指定列宽的列。

表格有如下两种指定列宽的方式：
- 固定像素，例如 `width="120"` 或者 `width="120px"`；
- 固定百分比，例如 `width="20%"`，表格将算出当前容器的宽度后乘以这个百分比取得像素值；

具体设置列宽请看[这个demo](/table/content-width)


#### 宽文本控制 和 tooltip

表格在对文本是否换行的原则是：默认文本超过列宽后自动换行，撑开行高。你可以通过给列定义的cell属性增加tooltip属性来让约束
表格在文本超过之后，自动隐藏，例如本demo在处理desc列的时候，给的定义如下：
```
{
    target: "desc",
    cell: {
        tooltip: TableValueGenerators.originCellDataGenerator,
    },
},
```
tooltip接收两种值：
- 字符串值，直接将字符串作为tooltip显示出来，参考本demo表格的最后一列（在`additionalColumnDefines`里）
- 值产生器，例如 `originCellDataGenerator` 就是表格预置的一个值产生器，它的作用就是返回当前单元格的值，
    desc列使用这个产生器的作用就是在文本超过列宽的时候，用户可以通过鼠标tooltip看到完整的单元格的值。
    应用也可以自己写自己的值产生器，例如：
    
```
cell: {
    tooltip: (tableData, row, col, additionalData) => tableData.data[row][col]
},
```

这个产生器的作用和 `originCellDataGenerator` 的作用基本类似。

#### 小结

前面介绍了表格列定义模式的主要功能，但是仍然没有覆盖表格列定义模式的全部内容，我们可以看到，
表格的列定义模式可以帮助应用实现很多非常复杂、交互性很强的功能，
因此仔细阅读Jigsaw有关列定义的所有的demo的源码是非常有必要的。

虽然表格的列定义模式非常强大，但是也要注意到应用在不了解这个功能之前，仍然能够使用表格的其他功能，
这一点就是Jigsaw一直秉承的“渐进式”使用模式。包括表格在内，Jigsaw的所有组件都具备高度可定制的能力，
但是每个可定制能力都有对应的默认行为，因此应用在无需事先了解如何使用这些定制功能就可以用好每个控件，
当有需要的时候，再学习对应的demo源码，然后再对控件的功能按需定制。





