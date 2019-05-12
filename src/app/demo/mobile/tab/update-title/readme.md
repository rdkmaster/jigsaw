#### 获取JigsawMobileTab实例的方法
本地变量获取
 
```
<button (click)="change2LongTitle(tabs)">change to long title</button>

<jigsaw-mobile-tabs #tabs></jigsaw-mobile-tabs>
```

ViewChild获取
 
```
@ViewChild('tabs') tabs: JigsawMobileTab;
``` 
