import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeMultiDataFillBackDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";

@NgModule({
    declarations: [CascadeMultiDataFillBackDemoComponent],
    exports: [CascadeMultiDataFillBackDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeMultiDataFillBackDemoModule {

}
