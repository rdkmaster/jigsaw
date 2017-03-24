

# 这个组件集正在征名中。。。
欢迎来给这套组件起名。。。


# 用法
1. 如果未安装nodejs，或者nodejs低于6.x.x，npm版本低于3.x.x，请先安装[nodejs](nodejs.cn)。
2. 下载或者clone本工程代码，假设保存到了 d:\rdk-ng2
3. 打开控制台，执行如下命令：
```
cd d:\rdk-ng2
npm config set proxy=http://proxy.zte.com.cn:80
npm config set registry=https://registry.npm.taobao.org/
npm install -g @angular-cli
#漫长的等待
ng serve -pc proxy-config.json
#又是漫长的等待
```
4. 浏览器里打开 http://localhost:4200 正常的话就能看到测试页面了

# 组件开发云图
![](comp-map.png)

# 参与贡献
项目处于初始阶段，没有issue，可以搜索源码中的TODO列表，帮忙改正。
