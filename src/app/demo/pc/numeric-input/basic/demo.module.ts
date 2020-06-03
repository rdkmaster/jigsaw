import {NgModule} from "@angular/core";
import {JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputBasicDemoComponent],
    exports: [NumericInputBasicDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule]
})
export class NumericInputBasicDemoModule {

}
