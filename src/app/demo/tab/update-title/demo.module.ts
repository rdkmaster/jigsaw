import {NgModule} from '@angular/core';
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TabsUpdateTitleDemoComponent} from './demo.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";

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
            title2: '这是一个用于演示的标题',
        }, true);
        translateService.setTranslation('en', {
            title2: 'This is a loooooooooooong title for the demo',
        }, true );

        TranslateHelper.changeLanguage(this.translateService, 'zh');
    }
}
