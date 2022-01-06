# Jigsaw-七巧板

- For the desktop: **@rdkmaster/jigsaw**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw.svg)](https://www.npmjs.com/package/@rdkmaster/jigsaw) [![Jigsaw](https://circleci.com/gh/rdkmaster/jigsaw.svg?style=svg)](https://app.circleci.com/pipelines/github/rdkmaster)
- For mobile: **@rdkmaster/jigsaw-mobile** [![npm version](https://badge.fury.io/js/%40rdkmaster%2Fjigsaw-mobile.svg)](https://www.npmjs.com/package/@rdkmaster/jigsaw-mobile) [![Build Status](https://travis-ci.org/rdkmaster/jigsaw.svg?branch=v1.1)](https://travis-ci.org/rdkmaster/jigsaw)
- Font Icons: **@rdkmaster/icon-font**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![npm version](https://badge.fury.io/js/%40rdkmaster%2Ficon-font.svg)](https://www.npmjs.com/package/@rdkmaster/icon-font) [![Amount](https://badgen.net/badge/Amount/2431/green)](https://jigsaw-zte.gitee.io/latest/assets/icon-font/iconfont.html)
- Online IDE: Edit Jigsaw in one click&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rdkmaster/jigsaw) 

[README中文版](README.zh.md)

## Why Jigsaw?

Jigsaw is a complete and powerful Web components set. The current version contains 54 components, 6 containers, 6 services, and 9 directives, basically covering all aspects of Web applications. Simply put, Jigsaw has almost all the functions of other component sets, and Jigsaw is more powerful and has better performance. Therefore, there is no need to worry about the lack of functionality with Jigsaw.

Jigsaw has an ability that other component sets do not have: **Jigsaw’s application can support multiple Ux specifications at the same time in one development**. [Click here](https://jigsaw-zte.gitee.io/latest/#/components/guide/supports-multiple-ux-specifications) to learn more about it.


## List of Availables

### Components

\# | Name | Description | Link
---|------|-------------|------
1 | Alert | A simple dialog that usually used to tell the users something important, and it can also collect choice of the users. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/alert/demo/popup)
2 | Auto Input | A full-featured [Input](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full) component with a drop-down list of suggested optional values. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/auto-complete-input/demo/basic)
3 | Breadcrumb | A lightweight navigator which can automaticly trace while the users are browsing. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/breadcrumb/demo/router)
4 | Button | A button with multiple states. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button/demo/full)
5 | Button Bar | A button bar which supports selection status, single or multiple selection, it can be used as a form control or a navigator. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/button-bar/demo/basic)
6 | Cascade | A form control for collecting or presenting data with subordinate relationships. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/cascade/demo/search-and-paging)
7 | ChartIcon | A componnet for rendering a small area into charts, supporting pie, line, and bar charts. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/chart-icon/demo/basic)
8 | Checkbox | A form control for collecting multi choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/checkbox/demo/full)
9 | Color Select | A form control that provides multiple ways to pick colors. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/color-select/demo/basic)
10 | Date Picker | A form control used to collect dates. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-picker/demo/basic)
11 | Date Time (Single) | A form control for collecting date and time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/basic)
12 | Date Time (Select) | A form control used to collect date and time, it provides choices in a drop-down manner. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/date-time-picker/demo/date-time-select)
13 | Date Time (Range) | A form control used to collect the start and end value, including date and time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/basic)
14 | Date Time (Select) | A form control used to collect the start and end value, including date and time, it provides choices in a drop-down manner. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/range-date-time-picker/demo/range-date-time-select)
15 | Fish Bone | A Fishbone graph are often used to present some data with subordinate relationships in the form of fish bones. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/fish-bone/demo/full)
16 | Graph | Render any data graphically, including any graphics such as bar charts, line charts, pie charts, gauge, and more, powered by [echarts](echarts.baidu.com). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/graph/demo/pie)
17 | Header | A simple component used to prompt the topic of a certain area on the UI. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/header/demo/basic)
18 | Icon | A font icon, which can be used as a link button, supports Font-aweasome and [Jigsaw's internal icon libraries](https://www.npmjs.com/package/@rdkmaster/icon-font). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/icon/demo/basic)
19 | Input (Normal) | A form control used to collect a single line of text. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/input/demo/full)
20 | Input (Search) | A search box for fuzzy matching according to text. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/search-input/demo/basic)
21 | List Lite | A control for presenting a group of data in a text list, supports single selection and multiple selection, supports main title and subtitle, and supports icons. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full)
22 | List | An enhanced version of the [List Lite](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full) control that supports the presentation of a set of data in any form. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/list/demo/full)
23 | Loading | Displays an animation to ease the user's anxiety during waiting for certain operations. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
24 | Menu | A multi-level menu control, which is often used for navigation. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/navigation)
25 | Notification | Informs some unimportant message in the corner of the UI, or to collect some unimportant choice of the users. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/notification/demo/full)
26 | Numeric Input | A form control for collecting numbers without typing, supports floats and integers. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/numeric-input/demo/step)
27 | Pagination | A control used to divide a large amount of data into multiple pages for display, not only can cooperate with the table component, but also can realize the paging operation of any data. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/pagination/demo/basic)
28 | Progress Bar | A horizontal progress bar. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo/full)
29 | Progress Circle | A circular progress bar. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo/circle-progress)
30 | Progress Status | A process status component which can be used to display various states in the process. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/progress/demo/basic)
31 | Radio | A form control for collecting single choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/radio-group/demo/full)
32 | Rate | A form control for the users to give his/her score of something. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/rate/demo/full)
33 | Scrollbar | A custom scrollbar to any container, powered by [perfect scrollbar](https://github.com/utatti/perfect-scrollbar). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/scrollbar/demo/basic)
34 | Select (Normal) | A form control for collecting the choice(s) by dropping down a list. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select/demo/basic)
35 | Select (Group) | A form control used to collect options through a drop-down list, supports option grouping, and is often used in situations where options are more complex. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select-group/demo/select-group)
36 | Select (Collapse) | A form control used to collect options through a drop-down list. It supports folding to group options. It is often used in situations where options are more complicated. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/select-collapse/demo/select-collapse)
37 | Signaling Chart | A signaling flow chart. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/swim-lane-diagram)
38 | Slider | A form control for collecting numerical info by sliding. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/slider/demo/basic)
39 | Steps | Displays a series of custom steps which have some predefined states. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/steps/demo/basic)
40 | Switch | A form control for collection yes/no or on/off choices. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/switch/demo/size)
41 | Tab Bar | A tab switcher for the [Tabs container](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/api). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab-bar/demo/type)
42 | Table | A very very powerful data grid. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/renderer)
43 | Tag | A tag control. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tag/demo/basic)
44 | Textarea | A form control for collecting multi lines of text. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/textarea/demo/basic)
45 | Tile Lite | A list that displays data by horizontal tiling, and the [List](https://jigsaw-zte.gitee.io/latest/#/components/list-lite/demo/full) component tiling data vertically. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tile-lite/demo/full)
46 | Tile | An enhanced version of the [Tile](https://jigsaw-zte.gitee.io/latest/#/components/tile-lite/demo/full) control. | [Demo]()
47 | Time | A time selector for selecting hours, minutes and seconds. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-picker/demo/basic)
48 | Time Section | A time rule selector, you can set the rule for matching time. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/time-section/demo/basic)
49 | Toast | A component used to prompt timely messages without intrusion. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/toast/demo/full)
50 | Transfer | A complex selector, used to select a large number of entries, supports paging. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/transfer/demo/basic)
51 | Tree | Renders some data with subordinate relationships as a tree, powered by [ztree](http://www.treejs.cn/v3/main.php#_zTreeInfo). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tree/demo/icon)
52 | Upload | Opens a file explorer to select one or more files and upload to the sever. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/basic)
53 | Upload Result | Opens a file explorer to select one or more files and upload to the sever. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result)
54 | Viewport | Represents part of an abstract view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/table/demo/big-table)

### Containers

\# | Name | Description | Link
---|------|-------------|------
1 | Box | A powerful view layout based on flex, which abstracts the view into horizontal and vertical boxes, and uses their mutual combination to quickly make the layout of complex views. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/box/demo/middle-resize-line)
2 | Collapse | A container which can fold or open the given view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/collapse/demo/full)
3 | Combo Select | A container that can hide any given view, which the user can pull down to display this view. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/combo-select/demo/searchable)
4 | Dialog | A dialog box component which is often used in conjunction with [PopupService](https://jigsaw-zte.gitee.io/latest/#/components/api/injectable/PopupService). | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/dialog/demo/popup-option)
5 | Drawer | A drawer, which is often used to show/hide complex views. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drawer/demo/drawer-in-drawer)
6 | Tabs | A multi-view folding container with tabs, which can overlay multiple views together. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tab/demo/api)

### Services

\# | Name | Description | Link
---|------|-------------|------
1 | Data | Jigsaw encapsulates many kinds of data objects to help applications more easily to feed data to all the controls. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/data-encapsulation/demo/array-ssp)
2 | LoadingService | Popups up and manages [Loading](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full) component. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/loading/demo/full)
3 | PopupService | Popups any given view to the top of the UI, very powerful. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/dialog/demo/popup-option)
4 | TimeService | Translate time macros like `now-1d` to real values. | --
5 | Translation | Used to create a view that supports multiple languages. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/i18n/demo/full)
6 | ChartIcon | Render simple data to tiny charts. | --

### Directives

\# | Name | Description | Link
---|------|-------------|------
1 | Badge | Add a badge to any view to grab the user's attention, and support multiple forms of badge. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/badge/demo/basic)
2 | Menu | Add multi-level menu function to any view, or popup a context menu. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/menu/demo/options)
3 | Download Graphs | Add a function of downloading screenshots of all the graphics in the host container. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/graph/demo/download-directive)
4 | Drag and Drop | Makes the host draggable and droppable. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/drag-drop/demo)
5 | Float | Drop down any given view near the host, many positions supported. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/float/demo/pos-reviser)
6 | Movable | The ability to add to any view so that the view can be dragged by the mouse and follow the movement of the mouse. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/badge/demo/move)
7 | Tooltip | Add a context prompt to any view, support rich text, and support interaction. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/tooltip/demo/html-renderer)
8 | Trusted HTML | Similar to Angular's innerHtml directive, without sanitizing the given trusted html, support interaction. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/trusted-html/demo/full)
9 | Upload | Adding the file upload function to any view, needs to be used in conjunction with the [upload result](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result) control. | [Demo](https://jigsaw-zte.gitee.io/latest/#/components/upload/demo/upload-result)

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


