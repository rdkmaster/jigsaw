import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputStepDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputStepDemoComponent],
    exports: [NumericInputStepDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputStepDemoModule {

}
