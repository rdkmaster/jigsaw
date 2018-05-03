import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputSizeDemoComponent} from "./demo.component";
import {JigsawNumericInputModule} from "jigsaw/component/input/numeric-input";

@NgModule({
    declarations: [NumericInputSizeDemoComponent],
    exports: [NumericInputSizeDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputSizeDemoModule {

}
