# 弹出框

有些应用项目的表格由于其本身原因，需要展示的列比较多，但是可能各个人关注的信息又不一样，一般都要求能够自定义列的现因。该功能我们用Jigsaw提供的popup服务实现

_**app.module.ts**_ 中添加该服务作为服务提供商。

```
 providers: [PopupService],
```

_**app.component.html**_ 中添加 html 片段

```
  <ng-template #dialog>
    <jigsaw-dialog width="60%" (answer)="finishSetting()">
      <div jigsaw-title>列头控制</div>
      <div jigsaw-body>
        <jigsaw-table [data]="headerData" [additionalColumnDefines]="additionalColumns"
         #settingTable></jigsaw-table>
        <div style="margin:5px 0px;text-align:center">
           <jigsaw-button (click)="finishSetting()">完成设置</jigsaw-button>
         </div>
      </div>
    </jigsaw-dialog>
  </ng-template>
```

用dialog来配置要弹出的内容，与tab-pane一致，采用jigsaw-title来配置对话框的标题，用jigsaw-body来配置对话框的内容。关于\#dialog的语法请参见[模板引入变量](https://www.angular.cn/docs/ts/latest/guide/template-syntax.html#!#ref-vars)。

_**app.component.ts**_ 中添加代码片段

```
 @ViewChild('dialog') dialog: TemplateRef<any>;

 dialogInfo: PopupInfo;
 customColumnDefine() {
    this.dialogInfo = this.popupService.popup(this.dialog);
 }

 finishSetting() {
    this.dialogInfo.dispose();
  }
```

其中ViewChild请参见[父组件调用_@ViewChild\(\)_](https://www.angular.cn/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child)。

设置表格的列显隐需要配置 columnDefines属性，如

```
columnDefines =[{target: 0, visible: false}]
```

表示设置表格的第一列隐藏。

完整代码如下：

_**app.component.html**_

```
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
        <jigsaw-tile
          [(selectedItems)]="selectedPeriodTimes"
          trackItemBy="label"
          width="350px">
          <jigsaw-tile-option *ngFor="let periodTime of periodTimes" [value]="periodTime" width="100px">
            {{periodTime.label}}
          </jigsaw-tile-option>
        </jigsaw-tile>
    </ng-template>
  </jigsaw-combo-select>
  <span>快速选择:</span>
  <jigsaw-radios (valueChange)="quickChoiceChange($event)"
                   trackItemBy="id" [(value)]="selectedChoice">
      <jigsaw-radio-option *ngFor="let quickChoice of quickChoices" [value]="quickChoice">{{quickChoice.label}}</jigsaw-radio-option>
  </jigsaw-radios>
  <br>
  <span>业务类型:</span>
  <jigsaw-combo-select [(value)]="selectBusinessType" openTrigger="click" width="400px">
    <ng-template>
        <jigsaw-tile
          [(selectedItems)]="selectBusinessType"
          trackItemBy="label"
          [multipleSelect]="false"
          width="350px">
          <jigsaw-tile-option *ngFor="let businessType of businessTypes" [value]="businessType" width="100px">
            {{businessType.label}}
          </jigsaw-tile-option>
        </jigsaw-tile>
    </ng-template>
  </jigsaw-combo-select>

  <span>接口：</span>
  <jigsaw-combo-select [(value)]="selectInterface" openTrigger="click" width="400px">
    <ng-template>
        <jigsaw-tile
          [(selectedItems)]="selectInterface"
          trackItemBy="label"
          width="350px">
          <jigsaw-tile-option *ngFor="let interface of interfaces" [value]="interface" width="100px">
            {{interface.label}}
          </jigsaw-tile-option>
        </jigsaw-tile>
    </ng-template>
  </jigsaw-combo-select>
  <br>
  <span>查询条件:</span>
  <jigsaw-combo-select [(value)]="selectUserType" openTrigger="click" width="120px">
    <ng-template>
        <jigsaw-tile
          [(selectedItems)]="selectUserType"
          trackItemBy="label"
          [multipleSelect]="false"
          width="100px">
          <jigsaw-tile-option *ngFor="let userType of userTypes" [value]="userType" width="100px">
            {{userType.label}}
          </jigsaw-tile-option>
        </jigsaw-tile>
    </ng-template>
  </jigsaw-combo-select>
  <jigsaw-input [(value)]="userInfo" height="32px"></jigsaw-input>
  <span style="margin-left:100px">显示方式：</span>
  <jigsaw-radios (valueChange)="displayTypeChange($event)"
                   trackItemBy="id" [(value)]="displayType">
    <jigsaw-radio-option *ngFor="let displayType of displayTypes" [value]="displayType">{{displayType.label}}</jigsaw-radio-option>
  </jigsaw-radios>
  <span>最大查询记录数：</span>
  <jigsaw-input [(value)]="maxRecord" height="32px"></jigsaw-input>
  <jigsaw-button (click)="doSearch()">查询</jigsaw-button>
</div>

<div class="result">
  <jigsaw-button (click)="customColumnDefine()" *ngIf="resultDisplay" style="float:right;margin-bottom: 5px">
  定制列显隐</jigsaw-button>
  <jigsaw-table style="margin-bottom: 10px;" maxHeight="550px" [data]="tableData" *ngIf="displayType.id==1"
             [columnDefines]="tableColumnDefine"></jigsaw-table>
  <jigsaw-tabs *ngIf="displayType.id!=1 && resultDisplay" [(selectedIndex)]="tabSelectIndex">
    <jigsaw-tab-pane *ngFor="let tabData of tabDatas">
      <div jigsaw-title><span class="fa fa-gift"></span>{{tabData.label}}</div>
      <div jigsaw-body>
         <jigsaw-table maxHeight="550px" [data]="this[tabData.id]" 
         [columnDefines]="this[tabData.id+'ColumnDefine']"></jigsaw-table>
      </div>
    </jigsaw-tab-pane>
  </jigsaw-tabs>

  <ng-template #dialog>
    <jigsaw-dialog width="60%" (answer)="finishSetting()">
      <div jigsaw-title>列头控制</div>
      <div jigsaw-body>
        <jigsaw-table [data]="headerData" [additionalColumnDefines]="additionalColumns" #settingTable>
        </jigsaw-table>
        <div style="margin:5px 0px;text-align:center">
        <jigsaw-button (click)="finishSetting()">完成设置</jigsaw-button></div>
      </div>
    </jigsaw-dialog>
  </ng-template>
</div>
```

_**app.component.ts**_

```
import {Component, Renderer2, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {
  AdditionalColumnDefine,
  ColumnDefine, JigsawTable, PopupInfo, PopupService, TableCellCheckbox, TableData,
  TableHeadCheckbox,
  TimeGr,
  TimeService
} from '@rdkmaster/jigsaw';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  beginDate = 'now-1d';
  endDate = 'now';
  rangeTimeComboValue = [
    {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
    {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
  ];

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

  selectUserType = [this.userTypes[0]];

  maxRecord = 1000;

  tableData: TableData;

  tabDatas;

  resultDisplay = false;

  tabSelectIndex = 0;

  headerData: TableData;

  @ViewChild('dialog') dialog: TemplateRef<any>;

  dialogInfo: PopupInfo;

  @ViewChild('settingTable') settingTable: JigsawTable;

  tableColumnDefine: ColumnDefine[] = [];


  additionalColumns: AdditionalColumnDefine[] = [{
    pos: 0,
    header: {
      renderer: TableHeadCheckbox,
    },
    cell: {
      renderer: TableCellCheckbox
    }
  }];


  constructor(private http: Http, private popupService: PopupService) {
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
    this.rangeTimeComboValue = [
      {label: TimeService.getFormatDate(this.beginDate, TimeGr.date), closable: false},
      {label: TimeService.getFormatDate(this.endDate, TimeGr.date), closable: false}
    ];
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
      this.tableData.fromAjax('mock-data/hr-list');
    } else {
      this.tabDatas = [{label: 'HTTP_XDR', id: 'HttpData', url: 'mock-data/hr-list'},
        {label: 'DNS_XDR', id: 'DnsData', url: 'mock-data/hr-list'}];
      this.tabDatas.forEach(tabData => {
        this[tabData.id] = new TableData();
        this[tabData.id].http = this.http;
        this[tabData.id].fromAjax(tabData.url);
        this[tabData.id + 'ColumnDefine'] = [];
      })
    }

    this.resultDisplay = true;
  }

  customColumnDefine() {
    this.headerData = new TableData();
    this.headerData.header = ['名称'];
    this.headerData.field = ['name'];
    if (this.displayType.id === '1') {
      this.tableData.header.forEach(header => this.headerData.data.push([header]));
    } else {
      this[this.tabDatas[this.tabSelectIndex].id].header.forEach(header => this.headerData.data.push([header]));
    }
    this.dialogInfo = this.popupService.popup(this.dialog);
    setTimeout(() => {
      this.settingTable.getRenderers(0).forEach(renderer => {
        if (this.displayType.id === '1') {
          this._setCheckBoxState(renderer, this.tableColumnDefine);
        } else {
          this._setCheckBoxState(renderer, this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine']);
        }
      });
    })
  }

  _setCheckBoxState(renderer, tableColumnDefine: ColumnDefine[]) {
    if (tableColumnDefine && tableColumnDefine.length !== 0
      && tableColumnDefine.filter(columnDefine => 
      columnDefine.target === renderer.renderer.checkboxState.row).length !== 0) {
      renderer.renderer.setCheckboxState(false);
    } else {
      renderer.renderer.setCheckboxState(true);
    }
  }

  finishSetting() {
    if (this.displayType.id === '1') {
      this.tableColumnDefine = [];
    } else {
      this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine'] = [];
    }
    this.settingTable.getRenderers(0).forEach(renderer => {
      const checkboxState = renderer.renderer.checkboxState;
      if (checkboxState.checked === 0) {
        if (this.displayType.id === '1') {
          this._modifyColumnDefine(this.tableColumnDefine, checkboxState.row);
        } else {
          this._modifyColumnDefine(this[this.tabDatas[this.tabSelectIndex].id + 'ColumnDefine'], checkboxState.row);
        }
      }
    });
    this.dialogInfo.dispose();
  }

  _modifyColumnDefine(tableColumnDefine: ColumnDefine[], row: number) {
    tableColumnDefine.push({target: row, visible: false});
  }
}
```

[在线例子](javascript:alert('建设中')) / [下载代码](https://github.com/rdkmaster/jigsaw-tourist/archive/step-6.zip)

---

[上一步](06-tabs.md)
