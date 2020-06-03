import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {LineGraphComponent} from "./demo.component";

@NgModule({
    declarations: [LineGraphComponent],
    exports: [LineGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class LineGraphModule {

}
