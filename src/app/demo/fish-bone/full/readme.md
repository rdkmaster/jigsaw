#### TreeData动态变化的问题

FishBone组件由于其迭代的复杂性，目前还不支持TreeData动态变化刷新组件的功能。如果用户想FishBone渲染完成后，再根据新数据重新渲染，
请先销毁原来的FishBone。有一个简单的方法可以在FishBone上加个`ngIf`开关，因为`ngIf`能控制组件的创建和销毁。你可以在获得新数据之前，先把
开关关掉，等到页面取到数据时，把开关打开，这样FishBone就能刷新了。

在使用ChartIcon时，因为图形的渲染与FishBone无关，所以如果只是图形的数据改变了，可以不用刷新FishBone，只要遵照ChartIcon的方法刷新图形
就可以了。


