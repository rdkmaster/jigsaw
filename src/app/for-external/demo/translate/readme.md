# TranslateService 国际化服务

`TranslateService`是[Jigsaw](https://github.com/rdkmaster/jigsaw)的基础国际化服务，所有国际化的场景，都是由这个服务来完成的。

## 用法

先在构造函数里注入`TranslateService`

```
import { TranslateService } from "@ngx-translate/core";

constructor( public translateService: TranslateService ) {
}
```

然后在任意位置调用这个代码就可以切换语言了

```
import { TranslateHelper } from "@rdkmaster/jigsaw";

const lang: 'zh' | 'en' = 'zh';

TranslateHelper.changeLanguage(this.translateService, lang);
```
