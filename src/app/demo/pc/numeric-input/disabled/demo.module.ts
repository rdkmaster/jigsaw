import {NgModule} from "@angular/core";
import {JigsawNumericInputModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputDisabledDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputDisabledDemoComponent],
    exports: [NumericInputDisabledDemoComponent],
    imports: [JigsawNumericInputModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class NumericInputDisabledDemoModule {

}
