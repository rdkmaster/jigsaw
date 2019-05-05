#### 获取JigsawTab实例的方法
本地变量获取
 
```
<button (click)="change2LongTitle(tabs)">change to long title</button>

<jigsaw-tabs #tabs></jigsaw-tabs>
```

ViewChild获取
 
```
@ViewChild('tabs') tabs: JigsawTab;
``` 
