import {NgModule} from "@angular/core";
import {JigsawCascadeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {CascadeTrackItemByDemoComponent} from "./demo.component";

@NgModule({
    declarations: [CascadeTrackItemByDemoComponent],
    exports: [CascadeTrackItemByDemoComponent],
    imports: [JigsawCascadeModule, JigsawDemoDescriptionModule]
})
export class CascadeTrackItemByDemoModule {
}
