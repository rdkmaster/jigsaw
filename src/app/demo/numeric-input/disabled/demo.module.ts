import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputDisabledDemoComponent} from "./demo.component";
import {JigsawNumericInputModule} from "jigsaw/component/input/numeric-input";
import {JigsawButtonModule} from "jigsaw/component/button/button";

@NgModule({
    declarations: [NumericInputDisabledDemoComponent],
    exports: [NumericInputDisabledDemoComponent],
    imports: [JigsawNumericInputModule, JigsawButtonModule, JigsawDemoDescriptionModule]
})
export class NumericInputDisabledDemoModule {

}
