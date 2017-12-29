#Jigsaw构建CI的流程

##构建CI的目的
自动检测产品质量，及时发现问题

##如何检查
高度模拟用户使用环境

##检测流程
###打包测试
 - 在jigsaw工程里面`npm install`
 - 自动打包，看jigsaw在打包的过程中会不会有错

###模拟真实项目
 - 下载tourist工程，执行`npm install`
 - 把打包好的jigsaw包替换放入node_modules下
 - 执行`ng build -prod aot`，看会不会报错

###端到端测试
  - 下载seed工程，执行`npm install`
  - 把前面打包好的jigsaw包替换放入node_modules下
  - 把jigsaw的所有e2e demo拷贝到工程，相应的angular-cli.json、protractor.conf.js、mock-data等需要替换的文件进行拷贝替换
  - 把原来的e2e demo的组件路径指向node_modules下的jigsaw包，
  - 执行`ng build -prod aot`，看build有没有报错，
  - 执行`ng e2e`，进行e2e测试