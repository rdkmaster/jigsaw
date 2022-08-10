import {NgModule} from "@angular/core";
import {JigsawGraphModule} from "jigsaw/public_api";
import {ProvinceMapGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";

@NgModule({
    declarations: [ProvinceMapGraphComponent],
    exports: [ProvinceMapGraphComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class ProvinceMapGraphModule {

}
