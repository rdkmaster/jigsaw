import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {ProvinceMapGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [ProvinceMapGraphComponent],
    exports: [ProvinceMapGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class ProvinceMapGraphModule {

}
