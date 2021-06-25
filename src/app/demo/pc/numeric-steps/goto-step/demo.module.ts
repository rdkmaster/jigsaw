import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawButtonModule, JigsawNumericStepsModule} from "jigsaw/public_api";
import {JigsawNumericStepGotoDemoComponent} from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawNumericStepsModule, JigsawButtonModule],
    declarations: [JigsawNumericStepGotoDemoComponent],
    exports: [JigsawNumericStepGotoDemoComponent]
})
export class JigsawNumericStepGotoDemoModule {
}
