#### 数据体系简介

Jigsaw的数据总体分成两大分支：
- `ArrayCollection` 这个分支只关注数组类型的集合；
- `GeneralCollection` 这个分支只关注通用的key-value结构（即JSON对象）的集合；

每个分支下面都派生出许许多多的适合特定场景使用的数据对象，在使用Jigsaw组件的时候，按照自己的场景需要挑选合适的数据对象可以达到事半功倍的效果。

所有可用的数据对象可以查看[数据关系图](/data-encapsulation/full#relationship)小节。

#### 主要数据接口介绍

本小节主要介绍Jigsaw数据对象中重要的接口，理解这些接口以及每个属性、方法的作用对使用好这些数据对象有着重要的帮助。

- `IComponentData` 详情请访问
<a href="/components/interfaces/api?apiItem=IComponentData" target="_blank">这个页面</a>。
- `IAjaxComponentData` 详情请访问
<a href="/components/interfaces/api?apiItem=IAjaxComponentData" target="_blank">这个页面</a>。
- `IPageable` 详情请访问
<a href="/components/interfaces/api?apiItem=IPageable" target="_blank">这个页面</a>。
- `IServerSidePageable` 详情请访问
<a href="/components/interfaces/api?apiItem=IServerSidePageable" target="_blank">这个页面</a>。
- `ISortable` 详情请访问
<a href="/components/interfaces/api?apiItem=ISortable" target="_blank">这个页面</a>。
- `IFilterable` 详情请访问
<a href="/components/interfaces/api?apiItem=IFilterable" target="_blank">这个页面</a>。
- `ISlicedData` 详情请访问
<a href="/components/interfaces/api?apiItem=ISlicedData" target="_blank">这个页面</a>。

#### 常用数据对象介绍
- 数组对象
    - `ArrayCollection<T>` 一个基础数组对象，详情请访问
    <a href="/components/interfaces/api?apiItem=ArrayCollection" target="_blank">这个页面</a>。
    - `PageableArray` 一个支持服务端分页、排序、过滤的数组对象，详情请访问
    <a href="/components/interfaces/api?apiItem=PageableArray" target="_blank">这个页面</a>。
    - `LocalPageableArray` 一个支持本地分页、排序、过滤的数组对象，详情请访问
    <a href="/components/interfaces/api?apiItem=LocalPageableArray" target="_blank">这个页面</a>。
- 表格数据对象
    - `TableData` 一个基础的表格数据对象，详情请访问
    <a href="/components/interfaces/api?apiItem=TableData" target="_blank">这个页面</a>。
    - `PageableTableData<T>` 一个支持服务端分页、排序、过滤的表格数据对象，详情请访问
    <a href="/components/interfaces/api?apiItem=PageableTableData" target="_blank">这个页面</a>。
    - `LocalPageableTableData<T>` 一个支持本地分页、排序、过滤的表格数据对象，详情请访问
    <a href="/components/interfaces/api?apiItem=LocalPageableTableData" target="_blank">这个页面</a>。
    - `BigTableData<T>` 一个支持海量数据常数级呈现的表格数据对象，详情请访问
    <a href="/components/interfaces/api?apiItem=BigTableData" target="_blank">这个页面</a>。

<a name="relationship"></a>
#### 数据关系图

下面这个图描述了Jigsaw的数据对象之间的关系，有点复杂，但是它对理解Jigsaw的数据之间的关系非常有帮助。

![](/source/docs/image/comp-data-map.png)





