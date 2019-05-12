import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/pc-components/tabs/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabsUpdateTitleDemoComponent} from './demo.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/common/core/utils/translate-helper";

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
