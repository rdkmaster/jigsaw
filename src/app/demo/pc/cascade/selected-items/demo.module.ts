import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeSelectedItemsDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeSelectedItemsDemoComponent],
    exports: [CascadeSelectedItemsDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeSelectedItemsDemoModule {

}
