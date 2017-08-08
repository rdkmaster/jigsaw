import {NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {swimLaneDiagramDemoComponent} from './app.component';
import {TableSwimLaneCell} from "./table-renderer";
import {TranslateHelper,InternalUtils} from "@rdkmaster/jigsaw";

@NgModule({
    imports: [JigsawTableModule,TranslateModule.forRoot()],
    declarations: [swimLaneDiagramDemoComponent, TableSwimLaneCell],
    bootstrap: [swimLaneDiagramDemoComponent],
    entryComponents: [TableSwimLaneCell]
})
export class swimLaneDiagramDemoModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'swimLane', {
            zh: {
                title: {
                    neName: "网元名称",
                    neType: "网元类型",
                    nodeIp: "节点IP"
                }
            },
            en: {
                title: {
                    neName: "Ne Name",
                    neType: "Ne Type",
                    nodeIp: "Node Ip"
                }
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
        TranslateHelper.languageChangEvent.subscribe(langInfo => {
            translateService.use(langInfo.curLang);
        });
    }
}
