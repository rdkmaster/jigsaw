import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {MapGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [MapGraphComponent],
    exports: [MapGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class MapGraphModule {

}
