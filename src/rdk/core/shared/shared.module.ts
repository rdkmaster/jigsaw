import { NgModule } from '@angular/core';
import { HttpModule , Http } from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports:[TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateHttpLoader(http, '/src/rdk/i18n/', '.json'),
          deps: [Http]
      },isolate:true
  }
  )],
  declarations:[
  ],
  exports:[
    TranslateModule
  ],
    providers:[]
})

export class SharedModule {
    constructor(private translate: TranslateService) {
        translate.addLangs(['zh-CN', 'en']);
        translate.setDefaultLang('zh-CN');
        let broswerLang = translate.getBrowserLang();
        translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
    }
}
