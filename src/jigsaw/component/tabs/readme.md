
# Tab页

## API

### tab
| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| tabPanes | tabpane 对象queriList | QueryList<TabPane> | - |
| selectedIndex | 设置默认选择的tabpane（从0开始）支持双绑 | number | 0 |
| hideTabPane(index) | 根据索引号隐藏tabpane | function | - |
| showTabPane(index) | 根据索引号显示tabpane | function | - |
| destroyTabPane(index) | 销毁对应tabPane(不推荐使用) | function | - |
| selectChange | tab页切换事件 | event | - |
