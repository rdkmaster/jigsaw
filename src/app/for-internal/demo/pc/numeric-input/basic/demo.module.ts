import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NumericInputBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputBasicDemoComponent],
    exports: [NumericInputBasicDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawButtonModule]
})
export class NumericInputBasicDemoModule {

}
