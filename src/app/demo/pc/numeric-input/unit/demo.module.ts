import {NgModule} from "@angular/core";
import {JigsawButtonBarModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {NumericInputUnitDemoComponent} from "./demo.component";

@NgModule({
    declarations: [NumericInputUnitDemoComponent],
    exports: [NumericInputUnitDemoComponent],
    imports: [JigsawNumericInputModule, JigsawDemoDescriptionModule, JigsawButtonBarModule]
})
export class NumericInputUnitDemoModule {

}
