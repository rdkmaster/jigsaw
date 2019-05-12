import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/pc-components/cascade/cascade";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {CascadeTrackItemByDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeTrackItemByDemoComponent],
    exports: [CascadeTrackItemByDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeTrackItemByDemoModule {
}
