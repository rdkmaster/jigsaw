import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProcessStatusModule, JigsawTrustedHtmlModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ProcessStatusClickChangeStatusComponent} from './demo.component';

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawProcessStatusModule, JigsawTrustedHtmlModule
    ],
    declarations: [ProcessStatusClickChangeStatusComponent],
    exports: [ProcessStatusClickChangeStatusComponent]
})
export class ProcessStatusClickChangeStatusModule {
}
