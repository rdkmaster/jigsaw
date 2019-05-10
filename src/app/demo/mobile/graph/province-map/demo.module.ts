import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {ProvinceMapGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [ProvinceMapGraphComponent],
    exports: [ProvinceMapGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class ProvinceMapGraphModule {

}
