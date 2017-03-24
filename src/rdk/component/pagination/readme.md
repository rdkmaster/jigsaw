
# 分页

## API

### Pagination

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| current | 当前页 | number | - |
| defaultCurrent | 默认当前页 | number | 1 |
| total | 数据总数 | number | - |
| pageSize | 每页显示条数 | number | 10 |
| pageSizeOptions | 指定每页可以显示多少条 | number[] | - |
| searchable | 搜索功能开关 | boolean | false |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| currentPageChange | 页码改变的事件 | EventEmitter | - |
| onShowSizeChange | pageSize 变化的事件 | EventEmitter | - |
