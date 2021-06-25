import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawNumericStepBasicDemoComponent} from "./demo.component";
import {JigsawButtonModule, JigsawNumericStepsModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawButtonModule, JigsawNumericStepsModule
    ],
    declarations: [JigsawNumericStepBasicDemoComponent],
    exports: [JigsawNumericStepBasicDemoComponent]
})
export class JigsawNumericStepBasicDemoModule {
}
