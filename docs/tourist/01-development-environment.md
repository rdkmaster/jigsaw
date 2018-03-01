# 环境搭建

一般而言，我们建议所有新增的app都以[https://github.com/rdkmaster/jigsaw-seed](https://github.com/rdkmaster/jigsaw-seed)这个工程作为种子开始构建。

```
git clone https://github.com/rdkmaster/jigsaw-seed.git
```

具体步骤为

* 如果未安装nodejs，或者nodejs低于6.x.x，npm版本低于3.x.x，请先安装。

* 中兴内网开发

   配置npm镜像，[详情](https://github.com/rdkmaster/jigsaw/blob/master/docs/how-to-use-npm-mirror-inside-of-zte/index.md)

* 外网开发
 
```
  # for Chinese developers only
  npm config set registry=https://registry.npm.taobao.org/
  # for Chinese developers only                 
  npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass 
```    

* clone Jigsaw Seed 的源码。假设保存到了`d:\jigsaw-seed`。

* 下载依赖包，执行以下脚本

```
  cd d:\jigsaw-seed                                           
  npm install
  npm start
```

* 浏览器里打开 [http://localhost:4200](http://localhost:4200/) 如果看到欢迎页，表示你的开发环境搭建完毕。

* 后续直接在`d:\jigsaw-seed`目录下运行`npm start`命令就可以启动开发环境了。Jigsaw专门针对现代的IDE做了代码优化，让这些IDE可以精确提示更多的信息，节约你翻阅api文档的时间。我们推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)作为IDE。


---

[下一步](02-time.md)

