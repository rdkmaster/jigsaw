/**
 * Created by 10238397 on 2018/4/16.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawProcessStatusItem} from "./process-status-item";
import {JigsawProcessStatus} from "./process-status";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";
import {JigsawProcessStatusMultiline} from "./process-status-multiline";
import {LoadingService} from "../../common/service/loading.service";

/**
 * @internal
 */
@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, JigsawTrustedHtmlModule],
    declarations: [JigsawProcessStatusItem, JigsawProcessStatus, JigsawProcessStatusMultiline],
    exports: [JigsawProcessStatusItem, JigsawProcessStatus, JigsawProcessStatusMultiline],
    providers: [LoadingService]
})
export class JigsawProcessStatusModule {
}

export * from "./process-status";
export * from "./process-status-item";
export * from "./process-status-multiline";
