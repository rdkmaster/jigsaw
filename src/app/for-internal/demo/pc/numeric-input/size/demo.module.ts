import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {NumericInputSizeDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputSizeDemoComponent],
    exports: [NumericInputSizeDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class NumericInputSizeDemoModule {

}
