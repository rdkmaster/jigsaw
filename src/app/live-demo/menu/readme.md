# 评分

## API

### Input

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| data | 菜单配置 | MenuData[] | 0 |

### Output

```
select: EventEmitter<MenuData> 当菜单被选中后，发出这个事件。

```

### 静态方法

```
show(menu: MenuData[], popupOptions?: PopupOptions)，这个方法用于弹出一个菜单。
```
popupOptions中定义了`posType`和`posOffset`，
```
posType: 'absolute' || 'fixed', (有absolute和fixed两个值,用于菜单定位)
posOffset: {                    (有right、left、top、bottom四个值,用于调整菜单出现位置)
    right: string,
    top: string,
    left: string,
    bottom: string
}
```
#### 备注
MenuData定义为:
```
{
    label: string,        // 菜单的主文本
    extraLabel?: string,  // 菜单的附加文本，未定义则不显示
    icon?: string,        // 菜单的图标，支持font-awesome和iconfont字符图标即可，未定义则不显示
    children?: MenuData[] // 菜单的子节点
    [prop: string]: any;  // 应用自定义数据
}
```
