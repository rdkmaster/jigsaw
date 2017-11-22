#### 配置`trackRowBy`

- 不配置`trackRowBy`，table会把一行的数据拼成字符串，作为这一行的标识；
- 配置了`trackRowBy`，table会把`trackRowBy`指定的列`field`对应的单元格数据，拼成字符串，作为当前行的标识，这里单元格数据
一般是`string`或者`number`类型的；
- `trackRowBy`可以设置多个列`field`。

#### 监听数据变化

配置在`additionalColumns`里的渲染器都是插入的列，这些渲染器的数据是保存在`additionalData`里面的，与table的`data`是完全隔离的。
所以这边要监听checkbox的数据变化，只能用`additionalDataChange`，请不要使用`dataChange`。

#### 单元格数据是`Json Object`类型

按照上面说的，我们要把单元格数据拼成字符串，如果单元格数据是`Json Object`类型，默认拼出来是`[object object]`，这样看上去每个对象都一样了。

补救的方法是: 在`Json Object`上实现一个`toString`方法，让其能够转换成字符串。下面是给一个`Json Object`实现`toString`的例子：

```
let obj = {a:'Angular', b:'Jigsaw'};
obj.toString = () => obj['a'] + '%%' + obj['b'];
```
