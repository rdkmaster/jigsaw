import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputBasicDemoComponent} from "./demo.component";
import {JigsawNumericInputModule} from "jigsaw/pc-components/input/numeric-input";

@NgModule({
    declarations: [NumericInputBasicDemoComponent],
    exports: [NumericInputBasicDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputBasicDemoModule {

}
