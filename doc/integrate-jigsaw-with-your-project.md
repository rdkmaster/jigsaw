
碰到问题请多多与 [Jigsaw Seed](https://github.com/rdkmaster/jigsaw-seed) 的相关配置文件对比。可能的话，请把你碰到的问题[报告给我们](https://github.com/rdkmaster/jigsaw/issues/new)，这样可以帮助到更多的巧粉。

# 原工程基于 [Angular CLI](https://github.com/angular/angular-cli) 构建的

1. 增加Jigsaw的依赖

在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```
请务必注意Jigsaw当前使用的Angular和TS版本与当前工程的版本是否兼容。

2. 打开 .angular-cli.json，在 `scripts` 节点下，增加如下条目，注意排除重复条目：

```
"../node_modules/jquery/dist/jquery.min.js",
"../node_modules/jquery-mousewheel/jquery.mousewheel.js",
"../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
"../node_modules/moment/min/moment.min.js",
"../node_modules/bootstrap/dist/js/bootstrap.min.js",
"../node_modules/ztree/js/jquery.ztree.all.js",
"../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
```

3. 打开 .angular-cli.json，在 `styles` 节点下，增加如下条目，注意排除重复条目：
```
"../node_modules/bootstrap/dist/css/bootstrap.min.css",
"../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
"../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",
"../node_modules/font-awesome/css/font-awesome.min.css",
"../node_modules/ztree/css/zTreeStyle/zTreeStyle.css"
```	

# 原工程基于 [angular quickstart](https://github.com/angular/quickstart) 构建的

待添加，欢迎推送PR给我们。

# 原工程用其他方式构建的
你肯定是资深玩家，请热心的你给推送PR给我们以完善这个文档，这样可以帮助到更多的巧粉。

你至少需要在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```