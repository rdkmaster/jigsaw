
#### 关于列定义

列定义是表格里最重要的一个功能，它是玩转表格的一个重要技巧，详细可以参考[这里](/jigsaw/table/renderer#open-desc=true)。

#### 解释一下列产生器

本demo中，下面这个方法定义了一个列产生器

```
columnDefineGenerator(field, index): ColumnDefine {
    return ...;
}

```

表格提供了当前列的字段名和索引值，你需要根据这2个值返回对应的列定义。通过这个产生器，就可以应对表格的列事先未知的情况了。

#### 列产生器的上下文
表格有一个属性`columnDefineGeneratorContext`用于设置列产生器的上下文。列产生器的上下文的作用是确定了列产生器中的`this`所指向的对象。
在本demo中，`columnDefineGenerator`方法体内内用到了this了，因此，这里就必须设置 `columnDefineGeneratorContext`
的值。简单的将其设置为this即可：`[columnDefineGeneratorContext]="this"`

反过来，如果`columnDefineGenerator`方法体内内没有用到this，那这个上下文可以忽略不设置。

#### 需要注意的地方

假设你已经熟悉了表格的列定义，这个demo对你来说，唯一需要注意的地方就是ts代码中的这句话：

```
changeWidth(width) {
    this.colWidth = width;
    this.table.update();   // <- 强制刷新表格
}
```

直接修改`colWidth`的值，表格并不能感知到，因此需要调用`this.table.update()`来更细表格。

实际上，如果你了解表格的数据更新机制，还有另一个方法可以强制表格刷新：

```
this.tableData.refresh();
```

`TableData`及其子类都有这个`refresh()`方法，表格注册了这个方法的事件回调，因此这个方法也可以达到相同的目的。
注意，这个demo没有采用这个方式的原因是，这个方式在语义上并不好，并且有可能给不熟悉表格数据更新机制的同学造成困扰，
因此本demo采取了一个相对较繁琐，但是语义更清晰的方式。实际开发时，请开发者自行挑选应对方式了。

最后，值得一提的是，修改列定义是一个耗时操作，因此应该尽量避免修改列定义，建议通过Ux的手段来避免。
