import { NgModule } from "@angular/core";
import { JigsawButtonModule, JigsawNumericInputModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { NumericInputAllowEmptyValueDemoComponent } from "./demo.component";

import { JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputAllowEmptyValueDemoComponent],
    exports: [NumericInputAllowEmptyValueDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule]
})
export class NumericInputAllowEmptyValueDemoModule {

}
