

Jigsaw提供了很多数据封装对象用于处理各种场景下的数据，熟悉和善于利用这些数据封装对象会减少很多重复性的工作。

本demo涉及到的数据对象有：
- 这里的浏览器内部数据过滤就使用到了[LocalPageableArray](/components/api/class/LocalPageableArray)对象，
它专门用于对一笔已经存在于浏览器内存中的数据做分页、过滤、排序等，受限于浏览器的内存，这个数据对象一般不会用于数据量特别大的场合。
- 这里的服务端数据过滤功能使用到了[PageableArray](/components/api/class/PageableArray)对象，
它的功能和和[LocalPageableArray](/components/api/class/LocalPageableArray)类似，
但是所有的操作都是在服务端进行，由于[PageableArray](/components/api/class/PageableArray)对象不受浏览器内存的约束，
因此它非常适合用于对海量数据的分页、过滤、排序等操作，是最常用的数据对象之一。

扩展：[了解Jigsaw的数据体系的详情](/components/api/interface/IComponentData)。
