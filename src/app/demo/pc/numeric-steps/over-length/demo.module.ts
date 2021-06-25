import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawNumericStepOverLengthDemoComponent} from "./demo.component";
import {JigsawNumericStepsModule} from "jigsaw/public_api";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawNumericStepsModule
    ],
    declarations: [JigsawNumericStepOverLengthDemoComponent],
    exports: [JigsawNumericStepOverLengthDemoComponent]
})
export class JigsawNumericStepOverLengthDemoModule {
}
