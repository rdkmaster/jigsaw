import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputStepDemoComponent} from "./demo.component";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";

@NgModule({
    declarations: [NumericInputStepDemoComponent],
    exports: [NumericInputStepDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputStepDemoModule {

}
