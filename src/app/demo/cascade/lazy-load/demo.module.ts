import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeLazyLoadDemoComponent} from "./demo.component";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";

@NgModule({
    declarations: [CascadeLazyLoadDemoComponent],
    exports: [CascadeLazyLoadDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeLazyLoadDemoModule {
}
