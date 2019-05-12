
`PopupService`是[Jigsaw](https://github.com/rdkmaster/jigsaw)的基础弹出服务，所有弹出的场景，都是由这个服务来完成的。

已知的场景有：
- [普通对话框](/jigsaw/dialog/buttons)
- [Alert对话框](/jigsaw/alert/popup)
- 菜单
    - 上下文菜单
    - 导航菜单
- Notification提示框
- [como-select组件](/jigsaw/combo-select/full)
- [select组件](/jigsaw/select/full)
- [loading组件](/jigsaw/loading/full)
- tooltip相关功能
    - [tooltip指令](/jigsaw/tooltip/inline)
    - [tooltip对话框](/jigsaw/tooltip/dialog)

可以看到`PopupService`在[Jigsaw](https://github.com/rdkmaster/jigsaw)中扮演着一个非常重要的角色，
多多了解`PopupService`这个服务对在[Jigsaw](https://github.com/rdkmaster/jigsaw)中处理好弹出场景有很大的帮助。

#### 用法

首先，和普通的服务一样，你需要将`PopupService`注入到你的组件中去：

```
constructor(private popupService: PopupService) {
}
```

然后你就可以通过`this.popupService`变量来使用`PopupService`了：

```
this.popupService.popup(...);
```

`PopupService`只提供了`popup()`这一个方法，它接受3个参数：
- `what`：必选参数，被弹出的视图，可以是一个组件，也可以是一个`ng-template`对象。**`what`参数指定的是一类视图，而不是一个视图的实例**。
- `options`：可选参数，用于控制弹出视图的各种参数，包括是否模态、弹出位置、视图尺寸、弹出动画等等，`PopupService`能够覆盖所有弹出场景，
很大程度上得益于这个参数的强大扩展性，熟悉这个参数的各个属性对是否能够用好`PopupService`有着决定性的影响。
关于这个参数的所有知识，都在[这里](/components/api/class/PopupOptions)。
- `initData`：可选参数，只在`what`参数是一个组件时有效。这个对象会被赋值给组件实例中的`initData`属性，
可以参考[这个demo](/jigsaw/dialog/misc)中弹出对话框组件的代码，注意该demo的控制台打印。

