import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputStepDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputStepDemoComponent],
    exports: [NumericInputStepDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class NumericInputStepDemoModule {

}
