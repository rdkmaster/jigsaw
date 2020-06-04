import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputSizeDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputSizeDemoComponent],
    exports: [NumericInputSizeDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputSizeDemoModule {

}
