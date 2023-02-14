/**
 * Created by 10177553 on 2017/3/23.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { JigsawGraph } from './graph';
import {JigsawGraphDownloadDirective} from "./graph-download.directive";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [CommonModule, TranslateModule.forChild(),],
    exports: [JigsawGraph,JigsawGraphDownloadDirective],
    declarations: [JigsawGraph,JigsawGraphDownloadDirective],
})
export class JigsawGraphModule { 
    constructor() {
        TranslateHelper.initI18n("jigsawGraph", {
            zh: {
                noData: "暂无数据"
            },
            en: {
                noData: "NO DATA"
            }
        });
    }
}

export * from './graph';
export * from './graph-download.directive';
