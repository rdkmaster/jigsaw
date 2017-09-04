# 表格

终于到了万众瞩目的表格了，表格可以说是数据展示不可缺少的一部分，也是组件化的一大难点，它可以说是将组合发挥到了极致。这里我们仅介绍基本使用，具体高级功能请移步至[http://rdk.zte.com.cn/component/](http://rdk.zte.com.cn/component/)。

_**app.component.html  **_中添加 html 片段

```
<jigsaw-table style="margin-bottom: 10px;" maxHeight="550px" [data]="tableData" *ngIf="displayType.id==1">
</jigsaw-table>
```

_**app.component.ts**_ 中添加代码片段

* 首先构造器注入http服务

```
 constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, private http: Http) {

 }
```

声明并实例化表格对象

```
tableData: TableData;
 constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, private http: Http) {
    this.tableData = new TableData();
    this.tableData.http = http;
  }
```

当点击查询按钮时，查询相应的服务。这里的数据为简单起见，仅是提供了JSON数据文件。

```
doSearch() {
  this.tableData.fromAjax('mock-data/table/data.json');
}
```

同时你需要在angular-cli.json文件中assets添加mock-data文件夹名。

```
"assets": [
        "assets",
        "favicon.ico",
        "mock-data"
      ],
```

OK，一切就是如此简单，这样一个简单的表格就展示出来了。

好吧，其实对于服务的返回值表格有一些限制要求,返回值必须符合如下格式

```
{
    "field": [],  //表头对应的key值
    "header": [], //表头，对应表格的表头展示
    "data": [[]] //二维数组，表格数据
}
```

完整代码如下：

_**app.component.html  **_

```
<!--The whole content below can be removed with the new code.-->
<div class="condition">
  <span>时间选择:</span>
  <jigsaw-combo-select [(value)]="rangeTimeComboValue" openTrigger="click">
    <ng-template>
        <jigsaw-range-time [(beginDate)]="beginDate" [(endDate)]="endDate" 
        (change)="handleChange($event)"></jigsaw-range-time>
    </ng-template>
  </jigsaw-combo-select>
  <jigsaw-checkbox [enableIndeterminate]="false" [(checked)]="status">多时段设置</jigsaw-checkbox>
  <jigsaw-combo-select [(value)]="selectedPeriodTimes" openTrigger="click" [disabled]="!status">
    <ng-template>
        <jigsaw-tile-select
          [(selectedItems)]="selectedPeriodTimes"
          labelField="label"
          [searchable]="true"
          [data]="periodTimes"
          width="350px"
          tileOptionWidth="100px">
        </jigsaw-tile-select>
    </ng-template>
  </jigsaw-combo-select>
  <span>快速选择:</span>
  <jigsaw-radio-group (valueChange)="quickChoiceChange($event)"
                      [data]="quickChoices"
                      trackItemBy="id" [(value)]="selectedChoice">
  </jigsaw-radio-group>
  <br>
  <span>业务类型:</span>
  <jigsaw-combo-select [(value)]="selectBusinessType" openTrigger="click" width="400px">
    <ng-template>
        <jigsaw-tile-select
          [(selectedItems)]="selectBusinessType"
          labelField="label"
          [searchable]="true"
          [data]="businessTypes"  [multipleSelect]="false"
          width="350px"
          tileOptionWidth="100px">
        </jigsaw-tile-select>
    </ng-template>
  </jigsaw-combo-select>

  <span>接口：</span>
  <jigsaw-combo-select [(value)]="selectInterface" openTrigger="click" width="400px">
    <ng-template>
        <jigsaw-tile-select
          [(selectedItems)]="selectInterface"
          labelField="label"
          [searchable]="true"
          [data]="interfaces"
          width="350px"
          tileOptionWidth="100px">
        </jigsaw-tile-select>
    </ng-template>
  </jigsaw-combo-select>
  <br>
  <span>查询条件:</span>
  <jigsaw-combo-select [(value)]="selectUserType" openTrigger="click" width="120px">
    <ng-template>
        <jigsaw-tile-select
          [(selectedItems)]="selectUserType"
          labelField="label"
          [searchable]="true"
          [data]="userTypes" [multipleSelect]="false"
          width="100px"
          tileOptionWidth="100px">
        </jigsaw-tile-select>
    </ng-template>
  </jigsaw-combo-select>
  <jigsaw-input [(value)]="userInfo" height="32px"></jigsaw-input>
  <span style="margin-left:100px">显示方式：</span>
  <jigsaw-radio-group (valueChange)="displayTypeChange($event)"
                      [data]="displayTypes"
                      trackItemBy="id" [(value)]="displayType">
  </jigsaw-radio-group>
  <span>最大查询记录数：</span>
  <jigsaw-input [(value)]="maxRecord" height="32px"></jigsaw-input>
  <jigsaw-button (click)="doSearch()">查询</jigsaw-button>
</div>
<div class="result">
  <jigsaw-table style="margin-bottom: 10px;" maxHeight="550px" [data]="tableData"></jigsaw-table>
</div>
```

_**app.component.ts**_

```
import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ArrayCollection, TableData, TimeGr, TimeService} from '@rdkmaster/jigsaw';
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  beginDate = 'now-1d';
  endDate = 'now';
  rangeTimeComboValue = new ArrayCollection([
    {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
    {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
  ]);
  periodTimes = [{label: '1', closable: false}, {label: '2', closable: false}, {label: '3', closable: false},
    {label: '4', closable: false}, {label: '5', closable: false}, {label: '6', closable: false},
    {label: '7', closable: false}, {label: '8', closable: false}, {label: '9', closable: false},
    {label: '10', closable: false}, {label: '11', closable: false}, {label: '12', closable: false}];

  quickChoices = [{label: '一天', id: '1'}, {label: '三天', id: '2'}, {label: '七天', id: '3'}];

  selectedChoice = this.quickChoices[0];

  businessTypes = [{label: 'LTE用户面', closable: false}, {label: 'LTE控制面', closable: false}];

  displayTypes = [{label: '合并', id: '1'}, {label: '分表', id: '2'}];

  displayType = this.displayTypes[0];

  interfaces = [{label: 'S1-U', closable: false}, {label: 'S2-U', closable: false}];

  userTypes = [{label: 'IMSI', closable: false}, {label: 'MSISDN', closable: false}];
  // TODO fix#77
  // selectUserType = [this.userTypes[0]];
  selectUserType = new ArrayCollection([{label: 'IMSI', closable: false}]);

  maxRecord = 1000;

  tableData: TableData;

  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2 ,private http: Http) {
    this.tableData = new TableData();
    this.tableData.http = http;
  }
  quickChoiceChange(quickChoice) {
    switch (quickChoice.id) {
      case '1':
        this.beginDate = 'now-1d';
        break;
      case '2':
        this.beginDate = 'now-3d';
        break;
      case '3':
        this.beginDate = 'now-1w';
        break;
    }
    this.endDate = 'now';
    this.handleChange();
  }

  handleChange() {
    this.rangeTimeComboValue = new ArrayCollection([
      {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
      {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ]);
  }

  displayTypeChange(displayType) {
    console.log(displayType)
  }

  doSearch() {
    this.tableData.fromAjax('mock-data/table/data.json');
  }
}
```

[在线例子](javascript:alert('建设中')) / [下载代码](https://github.com/rdkmaster/jigsaw-tourist/archive/step-4.zip)

---

[上一步](04-radio.md) | [下一步](06-tabs.md)
