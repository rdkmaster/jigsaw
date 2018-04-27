import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeMultiDimensionalFillBackDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [CascadeMultiDimensionalFillBackDemoComponent],
    exports: [CascadeMultiDimensionalFillBackDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule, CommonModule]
})
export class CascadeMultiDimensionalFillBackDemoModule {

}
