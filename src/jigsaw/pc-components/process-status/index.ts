/**
 * Created by 10238397 on 2018/4/16.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawProcessStatusItem} from "./process-status-item";
import {JigsawProcessStatus} from "./process-status";

/**
 * @internal
 */
@NgModule({
    imports: [CommonModule, PerfectScrollbarModule],
    declarations: [JigsawProcessStatus, JigsawProcessStatusItem],
    exports: [JigsawProcessStatus, JigsawProcessStatusItem]
})
export class JigsawProcessStatusModule {
}

export * from "./process-status";
export * from "./process-status-item";
