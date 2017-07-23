
# 将Jigsaw集成到现有工程下的方法

![](title.jpg)

我们来聊聊如何将 Jigsaw (https://github.com/rdkmaster/jigsaw) 和已有的Angular工程集成到一起，本文将主流的两种基础工程做了详细的集成说明，相信在你的工程下使用Jigsaw将不费吹灰之力。

过程中碰到问题请多多与 Jigsaw Seed (<https://github.com/rdkmaster/jigsaw-seed>) 的相关配置文件对比，也欢迎关注Jigsaw的官方微信公众号，在那里可以加入SOS群和我们开发者直接对话。

![](../image/qr-weixin.jpg)

可能的话，请把你碰到的问题[报告给我们](https://github.com/rdkmaster/jigsaw/issues/new)，这样可以帮助到更多的巧粉。

## 原工程基于 Angular CLI 构建的

Angular CLI (<https://github.com/angular/angular-cli>) 是构建Angular工程的首选，Jigsaw也推荐用它构建工程。

1. 增加Jigsaw的依赖
在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```

2. 检查Jigsaw当前使用的Angular和TS版本与当前工程的版本是否兼容，[请查看本文附件1](#ver-dep)。

3. 编辑 `.angular-cli.json`，在 `scripts` 节点下，增加如下条目，注意排除重复条目：
```
"../node_modules/jquery/dist/jquery.min.js",
"../node_modules/jquery-mousewheel/jquery.mousewheel.js",
"../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
"../node_modules/moment/min/moment.min.js",
"../node_modules/bootstrap/dist/js/bootstrap.min.js",
"../node_modules/ztree/js/jquery.ztree.all.min.js",
"../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
```

4. 编辑 `.angular-cli.json`，在 `styles` 节点下，增加如下条目，注意排除重复条目：
```
"../node_modules/bootstrap/dist/css/bootstrap.min.css",
"../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
"../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css",
"../node_modules/font-awesome/css/font-awesome.min.css",
"../node_modules/ztree/css/zTreeStyle/zTreeStyle.css"
```

5. 编辑你的 `AppComponent` 所在的文件，把它的构造函数改为：
```
constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, /* 原有其他依赖注入项 */) {
    ...
}
```
这是由于我们的`PopupService`实现上的缺陷造成的，参考这个issue <https://github.com/rdkmaster/jigsaw/issues/33>。

## 原工程基于 angular quickstart 构建的

angular quickstart 工程地址是 <https://github.com/angular/quickstart>

1. 增加Jigsaw的依赖
在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```
如果npm报 `UNMET PEER DEPENDENCY @angular/animations` 的警告，则请通过[本文附件2](#peer-dep-warn)的提供方法来解决，否则后续会有编译错误。

2. 检查Jigsaw当前使用的Angular和TS版本与当前工程的版本是否兼容，[请查看本文附件1](#ver-dep)。

3. 编辑 `src/systemjs.config.js`，在`map`节点下，增加如下一行：
```
 // Jigsaw bundles
'@rdkmaster/jigsaw':                'npm:@rdkmaster/jigsaw/bundles/jigsaw.umd.js',
'@ngx-translate/core/index':        'npm:@ngx-translate/core/bundles/core.umd.js',
'@ngx-translate/http-loader/index': 'npm:@ngx-translate/http-loader/bundles/http-loader.umd.js',
'echarts':                          'npm:echarts/dist/echarts.min.js'
```

4. 编辑 `src/index.html`，在head节点插入如下内容
```
<!-- 引入Jigsaw的依赖的css -->
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" href="node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
<link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="node_modules/ztree/css/zTreeStyle/zTreeStyle.css">

<!-- 引入Jigsaw需要的依赖，这些依赖没有出umd包，只能配置在这里 -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/jquery-mousewheel/jquery.mousewheel.js"></script>
<script src="node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="node_modules/moment/min/moment.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="node_modules/ztree/js/jquery.ztree.all.min.js"></script>
<script src="node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
```

5. 编辑你的 `AppComponent` 所在的文件，把它的构造函数改为：
```
constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, /* 原有其他依赖注入项 */) {
    ...
}
```
这是由于我们的`PopupService`实现上的缺陷造成的，参考这个issue <https://github.com/rdkmaster/jigsaw/issues/33>。

## 原工程用其他方式构建的
你肯定是资深玩家，请热心的你给推送PR给我们以完善这个文档，这样可以帮助到更多的巧粉。

你至少需要在你的工程下，增加Jigsaw的依赖：
```
npm install --save @rdkmaster/jigsaw
```

以及在适当的位置加入如下js和css文件的依赖
```
bootstrap/dist/css/bootstrap.min.css
eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css
malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css
font-awesome/css/font-awesome.min.css
ztree/css/zTreeStyle/zTreeStyle.css

jquery/dist/jquery.min.js
jquery-mousewheel/jquery.mousewheel.js
malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js
moment/min/moment.min.js
bootstrap/dist/js/bootstrap.min.js
ztree/js/jquery.ztree.all.js
eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js

//如下几个提供了umd包，如果不想用umd包，则请将文件名中的 .umd 去掉即可
jigsaw/bundles/jigsaw.umd.js
@ngx-translate/core/bundles/core.umd.js
@ngx-translate/http-loader/bundles/http-loader.umd.js
echarts/dist/echarts.min.js
```

<a name="ver-dep"></a>
## 附件1：依赖Angular/TS版本检查和解决办法
Jigsaw依赖的重要版本：
- Jigsaw需要Angular版本4.0.0以上，推荐使用4.2.4，使用这些命令来解决
```
npm install --save @angular/animations@4.2.4
npm install --save @angular/common@4.2.4
npm install --save @angular/compiler@4.2.4
npm install --save @angular/core@4.2.4
npm install --save @angular/forms@4.2.4
npm install --save @angular/http@4.2.4
npm install --save @angular/platform-browser@4.2.4
npm install --save @angular/platform-browser-dynamic@4.2.4
npm install --save @angular/router@4.2.4
```
- Jigsaw需要TypeScript版本2.3以上，目前还不支持2.4，使用这个命令来解决
```
npm i --save typescript@2.3.2
```

<a name="peer-dep-warn"></a>
## 附件2：安装Jigsaw的时候npm报warning
默认的 angular quickstart 并没有加入对 `@angular/animations` 的依赖，但是Jigsaw对它有依赖，所以安装Jigsaw的时候，会报一个WARN：
```
npm install --save @rdkmaster/jigsaw
angular-quickstart@1.0.0 D:\Codes\angular-quickstart
+-- UNMET PEER DEPENDENCY @angular/animations@4.2.5 extraneous
`-- @rdkmaster/jigsaw@1.0.0-beta.8
```

解决的方法是

1. 执行如下命令
```
npm install --save @angular/animations
```

2. 编辑 `src/systemjs.config.js`，在`map`节点下，增加如下一行：
```
'@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
```