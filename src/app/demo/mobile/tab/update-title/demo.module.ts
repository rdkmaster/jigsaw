import {NgModule} from '@angular/core';
import {JigsawMobileTabsModule} from "jigsaw/mobile-components/tabs/index";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabsUpdateTitleDemoComponent} from './demo.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/common/core/utils/translate-helper";

@NgModule({
    imports: [
        JigsawMobileTabsModule, JigsawMobileButtonModule, JigsawMobileInputModule, JigsawDemoDescriptionModule,
        JigsawMobileGraphModule, TranslateModule/* #for-live-demo-only# .forRoot() */
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
