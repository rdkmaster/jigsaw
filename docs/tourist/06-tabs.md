# 多页签

多页签切换对于组织比较多的网页内容并且内容又关联不太大的场景时不失为一个比较好的选择。Jigsaw提供了tab组件来实现该功能。这里我们配合内置的ngFor指令来构建应用场景。

_**app.component.html  **_中添加 html 片段

```
<jigsaw-tab [(selectedIndex)]="tabSelectIndex">
    <jigsaw-tab-pane *ngFor="let tabData of tabDatas">
      <div jigsaw-title><span class="fa fa-gift"></span>{{tabData.label}}</div>
      <div jigsaw-body>
         <jigsaw-table maxHeight="550px" [data]="this[tabData.id]"></jigsaw-table>
      </div>
    </jigsaw-tab-pane>
  </jigsaw-tab>
```

_**app.component.ts**_ 中添加代码片段

```
  tabDatas;
  this.tabDatas = [{label: 'HTTP_XDR', id: 'HttpData', url: 'mock-data/table/data.json'},
        {label: 'DNS_XDR', id: 'DnsData', url: 'mock-data/table/data.json'}];
```

jigsaw-tab-pane用来表示每个页签，jigsaw-title 用来配置该页签的标题，jigsaw-body用来配置该页签的内容。这里我们的场景是内容为一个简单的表格。当点击分表选项并且点击查询按钮时，该多页签展示，默认展示第一页签

```
tabSelectIndex = 0;
```

当选择的页签变化时，该值实时改变，方便我们进行业务逻辑的处理。

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
    </ng-tempalte>
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
  <jigsaw-table style="margin-bottom: 10px;" maxHeight="550px" [data]="tableData" 
  *ngIf="displayType.id==1"></jigsaw-table>
  <jigsaw-tab *ngIf="displayType.id!=1 && resultDisplay" [(selectedIndex)]="tabSelectIndex">
    <jigsaw-tab-pane *ngFor="let tabData of tabDatas">
      <div jigsaw-title><span class="fa fa-gift"></span>{{tabData.label}}</div>
      <div jigsaw-body>
        <jigsaw-table maxHeight="550px" [data]="this[tabData.id]"></jigsaw-table>
      </div>
    </jigsaw-tab-pane>
  </jigsaw-tab>
</div>
```

_**app.component.ts**_

```
import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ArrayCollection, TableData, TimeGr, TimeService} from '@rdkmaster/jigsaw';
import {Http} from '@angular/http';

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

  tabDatas;

  resultDisplay = false;

  tabSelectIndex = 0;


  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2, private http: Http) {
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
    this.resultDisplay = false;
    // 清理数据
    if (this.tabDatas && this.tabDatas.length !== 0) {
      this.tabDatas.forEach(tabData => {
        this[tabData.id].destroy();
      })
    }
    if (this.displayType.id === '1') {
      this.tableData.fromAjax('mock-data/table/data.json');
    } else {
      this.tabDatas = [{label: 'HTTP_XDR', id: 'HttpData', url: 'mock-data/table/data.json'},
        {label: 'DNS_XDR', id: 'DnsData', url: 'mock-data/table/data.json'}];
      this.tabDatas.forEach(tabData => {
        this[tabData.id] = new TableData();
        this[tabData.id].http = this.http;
        this[tabData.id].fromAjax(tabData.url);
      })
    }
    this.resultDisplay = true;
  }
}
```

[在线例子](javascript:alert('建设中')) / [下载代码](https://github.com/rdkmaster/jigsaw-tourist/archive/step-5.zip)

---

[上一步](05-table.md) | [下一步](07-dialog.md)
