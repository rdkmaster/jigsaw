import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeDataFillBackDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/component/cascade/cascade";

@NgModule({
    declarations: [CascadeDataFillBackDemoComponent],
    exports: [CascadeDataFillBackDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeDataFillBackDemoModule {

}
