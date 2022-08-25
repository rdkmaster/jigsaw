### 带div的抽屉

- `container`属性可以支持'.className'、'#id'、'[attr]'、'tagName'，向上寻找离抽屉最近的。
- `position`为left或者right时，只有`offsetTop`和`offsetBottom`能生效； 为top或者bottom时，只有`offsetLeft`和`offsetRight`能生效。
- `width`属性设置为'auto'，并且`offsetLeft`属性或者`offsetRight`属性设置有值，
例如设置为30px，则在抽屉内部，自动会将`width`属性的值转为calc(100% - 30px)，如果`offsetLeft`
和`offsetRight`属性的值均没有设置，则`width`属性当做没有设置处理。对于`height`属性
设置为'auto'的时候，配合`offsetTop`与`offsetBottom`属性值的设置也做类似处理。
