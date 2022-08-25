# Data 前后端通信
起始版本：v1.0.0
[Jigsaw](https://github.com/rdkmaster/jigsaw)的数据总体分成两大分支：
- `ArrayCollection` 这个分支只关注数组类型的集合；
- `GeneralCollection` 这个分支只关注通用的key-value结构（即JSON对象）的集合；
每个分支下面都派生出许许多多的适合特定场景使用的数据对象，在使用[Jigsaw](https://github.com/rdkmaster/jigsaw)组件的时候，
按照自己的场景需要挑选合适的数据对象可以达到事半功倍的效果。所有可用的数据对象可以查看数据关系图小节。

### 主要数据接口介绍
本小节主要介绍[Jigsaw](https://github.com/rdkmaster/jigsaw)数据对象中重要的接口，理解这些接口以及每个属性、方法的作用对使用好这些数据对象有着重要的帮助。
主要的接口包括：
- `IComponentData` 这是所有Jigsaw数据接口的根；
- `IAjaxComponentData` 实现了这个接口的数据对象都具备访问ajax的能力；
- `IPageable` 实现了这个接口的类都具备分页能力；
- `IServerSidePageable` 描述了服务端分页的更具体的接口，实现了这个接口的类就具备服务端分页的能力；
- `ISortable` 实现了这个接口的类就具备了数据排序的能力；
- `IFilterable` 实现了这个接口的类就具备了数据过滤的能力；
- `ISlicedData` 实现了这个接口的类就具备切片能力的数据；

### 常用数据对象介绍
- 数组对象
   - `ArrayCollection` 一个基础数组对象。
   - `PageableArray` 一个支持服务端分页、排序、过滤的数组对象。
   - `LocalPageableArray` 一个支持本地分页、排序、过滤的数组对象。
- 表格数据对象
   - `TableData` 一个基础的表格数据对象。
   - `PageableTableData` 一个支持服务端分页、排序、过滤的表格数据对象。
   - `LocalPageableTableData` 一个支持本地分页、排序、过滤的表格数据对象。
   - `BigTableData` 一个支持海量数据常数级呈现的表格数据对象。
- 图形数据对象
   - `GraphData` 通用的图形数据。
   - `PieGraphData` 通用的饼图数据。
   - `PieGraphDataByRow` 基于数据库表的行关系生成的饼图。
   - `PieGraphDataByColumn` 基于数据库表的列关系生成的饼图。
   - `LineBarGraphData` 通用的折线柱状图数据。
- 层次关系数据对象
   - `TreeData` 用于有层次关系的组件，包括树、鱼骨图等。
   - `SimpleTreeData` 用于简单包装有层次关系的数据，避免TreeData的性能问题。
- 动态关系数据
   - `LayoutData` 用于动态布局页面的数据。
目前而言，[Jigsaw](https://github.com/rdkmaster/jigsaw)在数组数据对象和表格数据对象方面的抽象程度较高，已经能够满足绝大部分场景，
因此较为稳定。 相对而言，图形数据、层次关系数据这2个方面还比较欠缺，后续需要进一步的抽象和扩展，也难免会引入一些破坏性修改。
