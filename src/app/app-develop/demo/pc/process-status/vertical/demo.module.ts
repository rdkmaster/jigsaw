import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawProcessStatusModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ProcessStatusVerticalFullComponent} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawProcessStatusModule
    ],
    declarations: [ProcessStatusVerticalFullComponent],
    exports: [ProcessStatusVerticalFullComponent]
})
export class ProcessStatusVerticalModule {
}
