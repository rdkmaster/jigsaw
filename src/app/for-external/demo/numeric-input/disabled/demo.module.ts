import { NgModule } from "@angular/core";
import { JigsawNumericInputModule, JigsawButtonModule } from "jigsaw/public_api";

import { NumericInputDisabledDemoComponent } from "./demo.component";

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputDisabledDemoComponent],
    exports: [NumericInputDisabledDemoComponent],
    imports: [JigsawNumericInputModule, JigsawButtonModule, JigsawHeaderModule]
})
export class NumericInputDisabledDemoModule {

}
