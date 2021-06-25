import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawNumericStepContextDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawNumericStepsModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawNumericStepsModule
    ],
    declarations: [JigsawNumericStepContextDemoComponent],
    exports: [JigsawNumericStepContextDemoComponent]
})
export class JigsawNumericStepContextDemoModule {
}
