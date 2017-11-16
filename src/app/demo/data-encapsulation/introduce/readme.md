#### 数据体系简介

Jigsaw的数据总体分成两大分支：
- `ArrayCollection` 这个分支只关注数组类型的集合；
- `GeneralCollection` 这个分支只关注通用的key-value结构（即JSON对象）的集合；

每个分支下面都派生出许许多多的适合特定场景使用的数据对象，在使用Jigsaw组件的时候，按照自己的场景需要挑选合适的数据对象可以达到事半功倍的效果。

所有可用的数据对象可以查看[数据关系图](/data-encapsulation/introduce#relationship)小节。

#### 主要数据接口介绍

本小节主要介绍Jigsaw数据对象中重要的接口，理解这些接口以及每个属性、方法的作用对使用好这些数据对象有着重要的帮助。

主要的接口包括：
- `IComponentData` 详情请访问[这个页面](/components/interfaces/api?apiItem=IComponentData)。
- `IAjaxComponentData` 详情请访问[这个页面](/components/interfaces/api?apiItem=IAjaxComponentData)。
- `IPageable` 详情请访问[这个页面](/components/interfaces/api?apiItem=IPageable)。
- `IServerSidePageable` 详情请访问[这个页面](/components/interfaces/api?apiItem=IServerSidePageable)。
- `ISortable` 详情请访问[这个页面](/components/interfaces/api?apiItem=ISortable)。
- `IFilterable` 详情请访问[这个页面](/components/interfaces/api?apiItem=IFilterable)。
- `ISlicedData` 详情请访问[这个页面](/components/interfaces/api?apiItem=ISlicedData)。

#### 常用数据对象介绍
- 数组对象
    - `ArrayCollection<T>` 一个基础数组对象，详情请访问[这个页面](/components/classes/api?apiItem=ArrayCollection)。
    - `PageableArray` 一个支持服务端分页、排序、过滤的数组对象，详情请访问[这个页面](/components/classes/api?apiItem=PageableArray)。
    - `LocalPageableArray` 一个支持本地分页、排序、过滤的数组对象，详情请访问[这个页面](/components/classes/api?apiItem=LocalPageableArray)。
- 表格数据对象
    - `TableData` 一个基础的表格数据对象，详情请访问[这个页面](/components/classes/api?apiItem=TableData)。
    - `PageableTableData<T>` 一个支持服务端分页、排序、过滤的表格数据对象，详情请访问[这个页面](/components/classes/api?apiItem=PageableTableData)。
    - `LocalPageableTableData<T>` 一个支持本地分页、排序、过滤的表格数据对象，详情请访问[这个页面](/components/classes/api?apiItem=LocalPageableTableData)。
    - `BigTableData<T>` 一个支持海量数据常数级呈现的表格数据对象，详情请访问[这个页面](/components/classes/api?apiItem=BigTableData)。

<a name="relationship"></a>
#### 数据关系图

下面这个图描述了Jigsaw的数据对象之间的关系，有点复杂，但是它对理解Jigsaw的数据之间的关系非常有帮助。

提示：单击图上的类名可转到它的api说明页面。

<object type="image/svg+xml" data="$uedHost/jigsaw/source/docs/image/comp-data-relationship.svg">
</object>



