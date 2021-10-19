import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawButtonModule, JigsawProcessStatusModule, JigsawProcessStatusMultilineModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ProcessStatusMultilineComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, PerfectScrollbarModule, JigsawDemoDescriptionModule, JigsawProcessStatusModule, JigsawProcessStatusMultilineModule,
        JigsawButtonModule
    ],
    declarations: [ProcessStatusMultilineComponent],
    exports: [ProcessStatusMultilineComponent]
})
export class ProcessStatusMultilineModule {
}
