# Jigsaw-七巧板

[![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw)
[![Build Status](https://travis-ci.org/rdkmaster/jigsaw.svg?branch=master)](https://travis-ci.org/rdkmaster/jigsaw)
[![Code Coverage Status](https://coveralls.io/repos/github/rdkmaster/jigsaw/badge.svg?branch=master)](https://coveralls.io/github/rdkmaster/jigsaw?branch=master)
[![Doc Coverage Status](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=documentation)](http://rdkmaster.com/jigsaw/doc/coverage.html)
<br>
[![component count](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=components)](http://rdk.zte.com.cn/component)
[![directives count](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=directives)](http://rdk.zte.com.cn/component)
[![injectables count](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=injectables)](http://rdk.zte.com.cn/component)
[![demo count](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=demo)](http://rdk.zte.com.cn/component)
[![e2e testcases count](http://rdkmaster.com/rdk/service/app/badges/server/get-badge?type=e2e%20testcases)](http://rdk.zte.com.cn)

[README中文版](README.zh.md)

## Meaning Of Name
We name this suite of components from a puzzle game. The process of this game, during which the player combine the messy pieces into a picture in accordance with the established blueprint, is similar to the development process of modern web page. We use Jigsaw as this component set’s name, hoping to make web page developers to combine the messy pieces of functions into your web page, just like playing jigsaw puzzle.

The soul of Jigsaw is **combination**, and we are committed to develop combination to the extreme level.

When several components are sorted and arranged in a certain order, you can get an application page. This is a normal combination, which we definee as **Level I** combination. In this level, all the components are like atoms, which means they can only act what they were made.

But Jigsaw's components are no longer atoms, we made a secondary abstraction of the functionality of the components, while allowing parts of the components highly customizable, some component even fully customizable. Small to  basic components like `jigsaw-button`, large to  giant components such as `jigsaw-table`, almost every UI element you see can be combined with other components to change its default behavior, and therefor to enhance the capability of components. Atomic components are limited, but the combination can produce infinite possibilities. The customization mentioned here, in other words, is another form of combination, and we call this level of combination as Level II.

With Jigsaw, unleash your imagination!


## Get started
### A brand new start with Jigsaw
We strongly recommend to use [Jigsaw Seed](https://github.com/rdkmaster/jigsaw-seed) as the seed of all new projects. The specific steps are:
1. Install or update [nodejs](https://nodejs.org), node 6.x.x and npm 3.x.x or later is required;
2. [Download](https://github.com/rdkmaster/jigsaw-seed/archive/master.zip) or [clone](https://github.com/rdkmaster/jigsaw-seed) the source of Jigsaw Seed, assumed being saved to `d:\jigsaw-seed`;
3. Install all dependencies by excuting the following script:

```
cd d:\jigsaw-seed
npm config set registry=https://registry.npm.taobao.org/                 # for Chinese developers only
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass # for Chinese developers only
npm install -g @angular/cli                                              # optional, but strongly recommended
npm install
npm start
```

- **Attensions to the Chinese developers**, do **NOT** use `cnpm` to install the dependencies, we are still looking for the reason.
- **Attensions to all ZTErs**, you can use the npm mirror inside of ZTE for faster speed of installing, [check this link for more details](docs/how-to-use-npm-mirror-inside-of-zte/index.md).

4. Open `http://localhost:4200` in your browser, your development environment is completed set up if you can see the welcome page;
5. Afterwards you can directly run `npm start` in the `d:\jigsaw-seed` directory to start the development environment;
6. Jigsaw has specifically done code optimization for the modern IDE, so that IDE can accurately prompt more information, saving your time of reading api document. We recommend using [WebStorm](https://www.jetbrains.com/webstorm/) as IDE.

### Use Jigsaw with your developing project
See the specific process [here](docs/integrate-your-project-with-jigsaw/index.md)

## A bible for the beginners
[Jigsaw Tourist](https://github.com/rdkmaster/jigsaw-tourist) is a tutorial dedication to the beginners, which shows how to use Jigsaw from scratch to build a simple application page. Click [here](docs/tourist/index.md), bravely take your first step in Jigsaw.

If there is any difficulty in getting started, please add Jigsaw's official WeChat, where you can join the SOS group and have a dialogue with our developers directly.

![](docs/image/qr-weixin.jpg)

## A advanced guide
[Any Badge](https://github.com/rdkmaster/any-badge) is a best practice of using Jigsaw and [RDK](https://github.com/rdkmaster/rdk) to create a full featured web application. It is a very good choice to read the source code of [Any Badge](https://github.com/rdkmaster/any-badge), which helps your to learn more about Jigsaw and RDK, after you finish reading the [Tour of Heroes](https://angular.io/tutorial) and the [Jigsaw Tourist](https://github.com/rdkmaster/jigsaw/blob/master/docs/tourist/index.md).

## One More Star Please!
This is the best encouragement for us.

## The status of all components
![](comp-map.png)

## Contribution
We believe that the following acts are doing contributions:
- Quietly concern about Jigsaw;
- Watch/star/fork it;
- Reporting a bug or give us any suggestions by [submitting an issue](https://github.com/rdkmaster/jigsaw/issues/new);
- Write or translate the api documentation, or any articals about Jigsaw.
- The more effective way to contribute is to push us PRs, all PRs are welcome and will be dealt with seriously;
    - Give priority to the [issues](https://github.com/rdkmaster/jigsaw/issues) without a `suspend` tag;


