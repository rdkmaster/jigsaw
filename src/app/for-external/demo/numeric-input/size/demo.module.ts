import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";

import {NumericInputSizeDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [NumericInputSizeDemoComponent],
    exports: [NumericInputSizeDemoComponent],
    imports: [JigsawNumericInputModule,  JigsawHeaderModule]
})
export class NumericInputSizeDemoModule {

}
