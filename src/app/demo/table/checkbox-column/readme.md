#### 配置`trackRowBy`

- 不配置`trackRowBy`，table会把一行的数据拼成字符串，作为这一行的标识；
- 配置了`trackRowBy`，table会把`trackRowBy`指定的列`field`对应的单元格数据，拼成字符串，作为当前行的标识，这里单元格数据
一般是`string`或者`number`类型的；
- `trackRowBy`可以设置多个列`field`。

#### 单元格数据是`Json Object`类型

按照上面说的，我们要把单元格数据拼成字符串，如果单元格数据是`Json Object`类型，默认拼出来是`[object object]`，这样看上去每个对象都一样了。

补救的方法是: 在`Json Object`上实现一个`toString`方法，让其能够转换成字符串。

```
data: object[][] = [
    [
        {a:1, b:'q'},
        {a:2, b:'w'},
        {a:3, b:'e'},
    ],
    [
        {a:1, b:'r'},
        {a:2, b:'t'},
        {a:3, b:'y'},
    ]
];
addToString(){
    this.data.forEach(item => {
        item.forEach((obj, i) => {
            obj.toString = () => {
                return obj['a'] + obj['b'];
            }
        })
    })
}
```

