import {NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {TranslateHelper} from "jigsaw/core/utils/translate-helper";
import {swimLaneDiagramDemoComponent} from './app.component';
import {TableSwimLaneCell} from "./table-renderer";

@NgModule({
    imports: [JigsawTableModule, TranslateModule.forRoot()],
    declarations: [swimLaneDiagramDemoComponent, TableSwimLaneCell],
    bootstrap: [swimLaneDiagramDemoComponent],
    entryComponents: [TableSwimLaneCell]
})
export class swimLaneDiagramDemoModule {
    constructor(translateService: TranslateService) {
        //增加自定义词条，最后一个参数必须是true
        translateService.setTranslation('zh', {
            title: {
                neName: "网元名称",
                neType: "网元类型",
                nodeIp: "节点IP"
            }
        }, true);
        translateService.setTranslation('en', {
            title: {
                neName: "Ne Name",
                neType: "Ne Type",
                nodeIp: "Node Ip"
            }
        }, true);
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
