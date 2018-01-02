#Jigsaw构建CI的流程

##构建CI的目的
自动检测产品质量，及时发现问题

##如何检查
高度模拟用户使用环境

##检查工具
###Travis CI 
Travis CI是一个基于云的持续集成环境。主要用来构建和打包。

 - [官网](https://travis-ci.com/) 
 - [如何搭建javascript项目在线CI环境](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

###saucelabs
saucelabs是自动化功能测试的云平台，写一个测试可以测试N个平台的M个浏览器的Z个版本。

 - [官网](https://saucelabs.com/)
 - [如何构建在线e2e测试](https://wiki.saucelabs.com/display/DOCS/Instant+Selenium+Node.js+Tests)

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
  - 把原来的e2e demo的组件路径指向node_modules下的jigsaw包
  - 执行`ng build -prod -aot`，看build有没有报错
  - 执行`ng e2e`，进行e2e测试

###live demo检查
我们的live demo采用的是angular plunker，一种基于systemjs的在线demo，能实时查看和编辑demo。我们把demo按照格式提交给plunker server，plunker server会响应一个systemjs的angular app给我们，这个系统我们把他作为用户学习jigsaw的重要途径，所以很重要。因此，我们需要定时对master上的live demo进行有效验证。

 - 根据demo动态生成e2e测试用例代码
 - 动态生成form表单提交plunker server的index.html
 - 检查文件路径是否规范
 - 用新代码打包替换jigsaw包
 - 执行plunker的e2e test流程，主要验证plunker demo能不能正常打开





