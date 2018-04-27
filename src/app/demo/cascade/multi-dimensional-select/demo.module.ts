import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeMultiDimensionalDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [CascadeMultiDimensionalDemoComponent],
    exports: [CascadeMultiDimensionalDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule, CommonModule]
})
export class CascadeMultiDimensionalDemoModule {

}
