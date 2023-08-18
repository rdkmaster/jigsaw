import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNumericInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NumericInputShowBorderDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputShowBorderDemoComponent],
    exports: [NumericInputShowBorderDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule, JigsawSwitchModule]
})
export class NumericInputShowBorderDemoModule {

}
