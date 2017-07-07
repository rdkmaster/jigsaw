### 在angular项目中配置懒加载路由

比如AppModule中引入带loadChildren的路由
```
const appRoutes = [
    {
        path: 'button',
        loadChildren: './button/demo.module#ButtonDemoModule'
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

在ButtonDemoModule中配置路由导航
```
const buttonDemoRoutes = [
    {
        path: 'basic', component: ButtonBasicDemoComponent
    }
];

@NgModule({
    declarations: [ButtonBasicDemoComponent],
    imports: [
        RouterModule.forChild(buttonDemoRoutes)
    ]
})
export class ButtonDemoModule {
}
```

加载效果： 
![加载效果](image/angular_lazy_load.gif "加载效果")


### webpack是如何打包的

在使用angular-cli构建的angular项目中，angular-cli是使用了webpack进行打包的，先看看webpack是如何实现懒加载的。

比如js中引用了第三方插件，我们现在要对第三方插件进行懒加载，可以在js代码中使用require.ensure，webpack可以通过require.ensure区分正常require进行切片。

```javascript
require.ensure([], (require) => {
    require("bootstrap/dist/css/bootstrap.min.css");
    require("eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
    require("eonasdan-bootstrap-datetimepicker");
}, 'datepicker'); // datepicker就是定义的切片包名
```

在webpack.config.js中配置切片名
```
output: {
    path: helpers.root('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js' // 切片命名
}
```

切片： 
![切片](image/webpack_chunk.png "切片")

加载效果： 
![加载效果](image/webpack_lazy_load.gif "加载效果")

那么问题来了，webpack是如何懒加载切片文件的呢？我们可以扒开打包后的文件来看看。

webpack打包后生成的文件里有三个重要的全局函数
```javascript
webpackJsonp
__webpack_require__
__webpack_require__.e
```

#### webpackJsonp

webpack利用JSONP技术，先在浏览器定义好webpackJsonp这个函数，然后从后端下载用webpackJsonp进行封装的js，
浏览器获取这样的js文件就可以立即执行了。webpackJsonp的源码如下：

```javascript
(function(modules) { // webpackBootstrap 	
    // install a JSONP callback for chunk loading
 	var parentJsonpFunction = window["webpackJsonp"];
 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
 		// add "moreModules" to the modules object,
 		// then flag all "chunkIds" as loaded and fire callback
 		var moduleId, chunkId, i = 0, resolves = [], result;
 		for(;i < chunkIds.length; i++) {
 			chunkId = chunkIds[i];
 			if(installedChunks[chunkId])
 				resolves.push(installedChunks[chunkId][0]);
 			installedChunks[chunkId] = 0;
 		}
 		for(moduleId in moreModules) {
 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
 				modules[moduleId] = moreModules[moduleId];
 			}
 		}
 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
 		while(resolves.length)
 			resolves.shift()();
 		if(executeModules) {
 			for(i=0; i < executeModules.length; i++) {
 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
 			}
 		}
 		return result;
 	};
})([]) 	
```
webpackJsonp有三个参数，chunkIds, moreModules和executeModules。其中moreModules就是包文件自带的
modules，以moduleId一一对应，webpackJsonp会把包文件的modules复制到全局的modules。

webpack打包出来的文件都是用webpackJsonp这个函数封装起来的，类似于：
```javascript
webpackJsonp([12, 33],{
    111:
    (function(module, exports) {
        /*......*/
    }),
    
    112:
    (function(module, exports, __webpack_require__) {
        /*......*/
    }),
    /*......*/
})
```

#### \_\_webpack\_require\_\_

主要根据moduleId从全局的modules加载模块。源码如下：
```javascript
// The require function
function __webpack_require__(moduleId) {

    // Check if module is in cache
    if(installedModules[moduleId])
        return installedModules[moduleId].exports;

    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
}
```

#### \_\_webpack\_require\_\_.e

通过动态插入script标签的方式，加载对应的chunk包文件，可以看看源码
```javascript
__webpack_require__.e = function requireEnsure(chunkId) {
    /*......*/
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    /*......*/
 	script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";
    /*......*/
    head.appendChild(script);
    return promise;
}
```

### angular-cli是如何打包的
angular-cli里面对webpack进行了定制化开发，不同于前面说的使用require.ensure进行切片打包，angular-cli
让webpack识别router里的'loadChildren'关键字进行打包。让我们来看看打包后的文件。

main.bundle.js
```javascript
var map = {
	"./button/demo.module": [
		919,
		11
	],
	"app/demo/demo-list": [
		923,
		23
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	// __webpack_require__.e就是webpack用于懒加载的函数
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
```
可以看到webpack根据路由生成了一个url与数组ids对应的对象，ids[1]代表chunkId，也就是对应的包文件，
ids[0]代表moduleId，即需要加载的模块。在webpackAsyncContext这个函数中，__webpack_require__.e通过chunkId加载了chunk包文件，然后
__webpack_require__通过moduleId加载到对应的模块。

button-demo-module对应的切片包 11.chunk.js
```javascript
webpackJsonp([11,32],{
    919: (function(module, __webpack_exports__, __webpack_require__) {
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "ButtonDemoModule", function() { return ButtonDemoModule; });
        var ButtonDemoModule = (function () {
            function ButtonDemoModule() {
            }
            return ButtonDemoModule;
        }());
    })
})
```
用户浏览器输入http://localhost:4200/button/basic，RouterMoudule会通过注入的NgModuleFactoryLoader
调取webpack的webpackAsyncContext函数，webpackAsyncContext的req参数是路由通过浏览器url找到对应的loadChildren
的url。webpackAsyncContext通过url拿到对应的chunkId，调用__webpack_require__.e的动态下载对应的chunk包文件，下载
完成后，调用__webpack_require__执行对应的模块。这个过程就是angilar-cli加载angular router的loadChildren的过程。



