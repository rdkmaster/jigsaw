# 单项选择器

从多项选择中选择一样的这种场景比比皆是，Jigsaw提供了radioGroup来实现类似的需求

_**app.component.html  **_中添加 html 片段

```
 <span>快速选择:</span>
 <jigsaw-radio-group (valueChange)="quickChoiceChange($event)"
                   [data]="quickChoices"
                   trackItemBy="id" [(value)]="selectedChoice">
 </jigsaw-radio-group>
```

_**app.component.ts**_ 中添加代码片段

```
quickChoices = [{label: '一天', id: '1'}, {label: '三天', id: '2'}, {label: '七天', id: '3'}];
```

其中data属性用来设置数据来源，radioGroup默认以提供的数组对象的label属性来进行展示，如若不是，可以通过labelField属性进行指定，value是双向绑定的，可以实时获取到当前选择了哪些选项，当然你也可以通过代码设置选择哪些，如

```
selectedChoice = this.quickChoices[0];
```

trackItemBy 用来指定对象的唯一标识，如果该对象以多个key值进行标识可以配置多个，以_**，**_间隔，如

```
trackItemBy="pro_name,pro_type"
```

OK，单项选择器已经展示出来了，接下来我们要根据选择来控制时间选择器的时间。代码如下

```
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
```

很容易的实现了动态配置时间选择器的开始时间和结束时间。其他查询条件也类似，读者可以自已动动手实现下。

完整代码如下

_**app.component.html  **_

```
<div>
  <span>时间选择:</span>
  <jigsaw-combo-select [(value)]="rangeTimeComboValue" openTrigger="click">
    <jigsaw-range-time [(beginDate)]="beginDate" [(endDate)]="endDate" 
    (change)="handleChange($event)"></jigsaw-range-time>
  </jigsaw-combo-select>
  <jigsaw-checkbox [enableIndeterminate]="false" [(checked)]="status">多时段设置</jigsaw-checkbox>
  <jigsaw-combo-select [(value)]="selectedPeriodTimes" openTrigger="click" [disabled]="!status">
    <jigsaw-tile-select
      [(selectedItems)]="selectedPeriodTimes"
      labelField="label"
      [searchable]="true"
      [data]="periodTimes"
      width="350px"
      tileOptionWidth="100px">
    </jigsaw-tile-select>
  </jigsaw-combo-select>
  <span>快速选择:</span>
  <jigsaw-radio-group (valueChange)="quickChoiceChange($event)"
                      [data]="quickChoices"
                      trackItemBy="id" [(value)]="selectedChoice">
  </jigsaw-radio-group>
</div>
```

_**app.component.ts**_

```
import {Component, Renderer2, ViewContainerRef} from '@angular/core';
import {ArrayCollection, TimeGr, TimeService} from '@rdkmaster/jigsaw';

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

  constructor(public viewContainerRef: ViewContainerRef, public renderer: Renderer2) {
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
}
```

[在线例子](javascript:alert('建设中')) / [下载代码](https://github.com/rdkmaster/jigsaw-tourist/archive/step-3.zip)

---

[上一步](03-tileselect.md) | [下一步](05-table.md)
