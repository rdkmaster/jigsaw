import {NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {
    JigsawTabsModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule,
    JigsawGraphModule, TranslateHelper
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TabsUpdateTitleDemoComponent} from './demo.component';

@NgModule({
    imports: [
        JigsawTabsModule, JigsawButtonModule, JigsawInputModule, JigsawTableModule, JigsawDemoDescriptionModule,
        JigsawGraphModule, TranslateModule/* #for-live-demo-only# .forRoot() */
    ],
    declarations: [TabsUpdateTitleDemoComponent],
    exports: [TabsUpdateTitleDemoComponent],
    providers: [TranslateService]
})
export class TabsUpdateTitleDemoModule {
    constructor(public translateService: TranslateService) {
        translateService.use(translateService.getBrowserLang());

        translateService.setTranslation('zh', {
            title2: '这是一个国际化过的标题',
        }, true);
        translateService.setTranslation('en', {
            title2: 'This is an internationalized title',
        }, true );

        TranslateHelper.changeLanguage(this.translateService, 'zh');
    }
}
