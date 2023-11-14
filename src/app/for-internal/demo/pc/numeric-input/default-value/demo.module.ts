import { NgModule } from "@angular/core";
import { JigsawButtonModule, JigsawInputModule, JigsawNumericInputModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { NumericInputDefaultValueDemoComponent } from "./demo.component";

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputDefaultValueDemoComponent],
    exports: [NumericInputDefaultValueDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule, JigsawInputModule]
})
export class NumericInputDefaultValueDemoModule {

}
