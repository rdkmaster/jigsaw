#### 数据体系简介

Jigsaw的数据总体分成两大分支：
- `ArrayCollection` 这个分支只关注数组类型的集合；
- `GeneralCollection` 这个分支只关注通用的key-value结构的集合；

每个分支下面都派生出许许多多的适合特定场景使用的数据对象，在使用Jigsaw组件的时候，按照自己的场景需要挑选合适的数据对象可以达到事半功倍的效果。

所有可用的数据对象可以查看[数据关系图](/data-encapsulation/full#relationship)小节。


#### 主要数据接口介绍

本小节主要介绍Jigsaw数据对象中重要的接口，理解这些接口以及每个属性、方法的作用对使用好这些数据对象有着重要的帮助。

- `IComponentData` 详情请访问<a href="http://10.9.233.35:52580/components/interfaces/api?apiItem=IComponentData">这个页面</a>


<a name="relationship"></a>
#### 数据关系图

下面这个图描述了Jigsaw的数据对象之间的关系，有些许复杂，但是它对理解Jigsaw的数据之间的关系非常有帮助。

![](/jigsaw-source/docs/image/comp-data-map.png)





