# Jigsaw-七巧板

- For the desktop: **@rdkmaster/jigsaw**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw) [![Jigsaw](https://circleci.com/gh/rdkmaster/jigsaw.svg?style=svg)](https://app.circleci.com/pipelines/github/rdkmaster)
- For mobile: **@rdkmaster/jigsaw-mobile** [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw-mobile.svg)](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw-mobile) [![Build Status](https://travis-ci.org/rdkmaster/jigsaw.svg?branch=v1.1)](https://travis-ci.org/rdkmaster/jigsaw)

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rdkmaster/jigsaw) 

[README中文版](README.zh.md)

## Why Jigsaw?

Jigsaw is a complete and powerful Web components set. The current version contains 43 components, 6 containers, 5 services, and 5 directives, basically covering all aspects of Web applications. Simply put, Jigsaw has almost all the functions of other component sets, and Jigsaw is more powerful and has better performance. Therefore, there is no need to worry about the lack of functionality with Jigsaw.

Jigsaw has an ability that other component sets do not have: **Jigsaw’s application can support multiple Ux specifications at the same time in one development**. [Click here](https://jigsaw-zte.gitee.io/latest/#/components/guide/supports-multiple-ux-specifications) to learn more about it.


## List of Availables

### Components

\# | Name | Description | Link
---|-----|-------------|------
1 | Alert | A simple dialog that usually used to tell the users something important, and it can also collect choice of the users. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/alert/demo/popup)
2 | Auto Input | A full-featured [Input](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full) component with a drop-down list of suggested optional values. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/auto-complete-input/demo/basic)
3 | Breadcrumb | A lightweight navigator which can automaticly trace while the users are browsing. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/breadcrumb/demo/router)
4 | Button | A button. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button/demo/full)
5 | Button Bar | A button bar which supports selection status, single or multiple selection, it can be used as a form control or a navigator. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button-bar/demo/basic)
6 | Cascade | A form control for collecting or presenting data with subordinate relationships. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/cascade/demo/search-and-paging)
7 | Check Box | A form control for collecting multi choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/checkbox/demo/full)
8 | Color Select | A color picker. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/color-select/demo/basic)
9 | Combo Select | A general drop-down view combination selector for storing complex views in a drop-down manner. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/combo-select/demo/trigger)
10 | Date Time (Single) | A form control for collecting a date time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/basic)
11 | Date Time (Range) | A form control for collecting a start and an end of date time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/basic)
12 | Fish Bone | A Fishbone graph are often used to present some data with subordinate relationships in the form of fish bones. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/fish-bone/demo/full)
13 | Graph | Render any data graphically, including any graphics such as bar charts, line charts, pie charts, gauge, and more, powered by [echarts](echarts.baidu.com). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/graph/demo/pie)
14 | Icon | A font icon, tells something graphicly or can be a simple link button. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/icon/demo/basic)
15 | Input | A form control for collecting some text. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full)
16 | List Lite | Presents a set of data as a text based list, supports single and multiple selection. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full)
17 | List | Presents a set of data as a fully customized list. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list/demo/full)
18 | Loading | Displays an animation to ease the user's anxiety during waiting for certain operations. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
19 | Menu | A multi-level menu, which is often used for navigation. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/navigation)
20 | Notification | Informs some unimportant message in the corner of the UI, or to collect some unimportant choice of the users. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/notification/demo/full)
21 | Numeric Input | A form control for collecting numbers without typing, supports floats and integers. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/numeric-input/demo/step)
22 | Pagination | A control for dividing large amounts of data into multiple pages. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/pagination/demo/basic)
23 | Progress bar | A progress bar. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo)
24 | Radio Group | A form control for collecting single choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/radio-group/demo/full)
25 | Rate | A form control for the users to give his/her score of something. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/rate/demo/full)
26 | Scrollbar | A custom scrollbar to any container, powered by [perfect scrollbar](https://github.com/utatti/perfect-scrollbar). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/scrollbar/demo/basic)
27 | Select | A form control for collecting the choice(s) by dropping down a list. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
28 | Slider | A form control for collecting numerical info by sliding. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
29 | Steps | Displays a series of custom steps which have some predefined states. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
30 | Switch | A form control for collection yes/no on/off choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
31 | Table | A very very powerful data grid. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/renderer)
32 | Tab Bar | Tab bar of the [Tabs container](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/api). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/tab-bar)
33 | Tag | A tag control. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tag/demo/basic)
34 | Textarea | A form control for collecting multi lines of text. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/textarea/demo/basic)
35 | Tile | Renders a list of data by tiling. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tile/demo/full)
36 | TileLite | To show a list of data by tiling. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tile-lite/demo)
37 | Time | A time selector for selecting hours, minutes and seconds. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo/basic)
38 | Time Section | A time rule selector, you can set the rule for matching time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-section/demo/basic)
39 | Tooltip | A customized tooltip. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tooltip/demo/inline)
40 | Transfer | A complex selector, used to select a large number of entries, supports paging. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/transfer/demo/basic)
41 | Tree | Renders some data with subordinate relationships as a tree, powered by [ztree](http://www.treejs.cn/v3/main.php#_zTreeInfo). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tree/demo/editable)
42 | Upload | Opens a file explorer to select one or more files and upload to the sever. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/basic)
43 | Viewport | Represents part of an abstract view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/big-table)

### Containers

\# | Name | Description | Link
---|------|-------------|------
1 | Collapse | A container which can fold or open the given view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/collapse/demo/full)
2 | Combo Select | A container that can hide any given view, which the user can pull down to display this view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/combo-select/demo/searchable)
3 | Dialog | A dialog box component which is often used in conjunction with PopupService. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/dialog/demo)
4 | Drawer | A drawer, which is often used to show/hide complex views. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drawer/demo/drawer-in-drawer)
5 | Tabs | A multi-view folding container with tabs, which can overlay multiple views together. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/api)
6 | ViewStack | A multi-view folding container, similar to Tabs but without a tab bar. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/headless)
7 | Box | A powerful view layout based on flex, which abstracts the view into horizontal and vertical boxes. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/headless)

### Services

\# | Name | Description | Link
---|------|-------------|------
1 | Translation | Used to create a view that supports multiple languages. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/i18n/demo/full)
2 | TimeService | Translate time macros like `now-1d` to real values. | --
3 | PopupService | Popups any given view to the top of the UI, very powerful | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/popup/demo/dialog)
4 | LoadingService | Popups up [Loading](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full) component. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
5 | ChartIconFactory | Render simple data to tiny charts. | --

### Directives

\# | Name | Description | Link
---|------|-------------|------
1 | Float | Drop down any given view near the host, many positions supported. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/float/demo/pos-reviser)
2 | Trusted Html | Similar to Angular's innerHtml directive, without sanitizing the given trusted html | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/trusted-html/demo)
3 | Draggable | Makes the host draggable and droppable. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drag-drop/demo)
4 | Upload | Give the host the ability to support uploading files. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/basic)
5 | Menu | A multi-level menu directive, which is often used for navigation. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/usage)

## Meaning Of Name
We name this suite of components from a puzzle game. The process of this game, during which the player combine the messy pieces into a picture in accordance with the established blueprint, is similar to the development process of modern web page. We use Jigsaw as this component set’s name, hoping to make web page developers to combine the messy pieces of functions into your web page, just like playing jigsaw puzzle.

The soul of Jigsaw is **combination**, and we are committed to develop combination to the extreme level.

When several components are sorted and arranged in a certain order, you can get an application page. This is a normal combination, which we definee as **Level I** combination. In this level, all the components are like atoms, which means they can only act what they were made.

But Jigsaw's components are no longer atoms, we made a secondary abstraction of the functionality of the components, while allowing parts of the components highly customizable, some component even fully customizable. Small to  basic components like `jigsaw-button`, large to  giant components such as `jigsaw-table`, almost every UI element you see can be combined with other components to change its default behavior, and therefor to enhance the capability of components. Atomic components are limited, but the combination can produce infinite possibilities. The customization mentioned here, in other words, is another form of combination, and we call this level of combination as Level II.

With Jigsaw, unleash your imagination!


## Get Started
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

- **Attensions to the Chinese developers**, do **NOT** use `cnpm` to install the dependencies because of [this issue](https://github.com/cnpm/cnpmjs.org/issues/1463).
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

## Contribution
We believe that the following acts are doing contributions:
- Quietly concern about Jigsaw;
- Watch/star/fork it;
- Reporting a bug or give us any suggestions by [submitting an issue](https://github.com/rdkmaster/jigsaw/issues/new);
- Write or translate the api documentation, or any articals about Jigsaw.
- The more effective way to contribute is to push us PRs, all PRs are welcome and will be dealt with seriously;
    - Give priority to the [issues](https://github.com/rdkmaster/jigsaw/issues) without a `suspend` tag;
    - This is a simple [code specification](docs/coding-spec.md), please try to follow it;


