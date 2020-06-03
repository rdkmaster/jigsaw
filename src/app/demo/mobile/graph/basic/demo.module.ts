import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {BasicGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [BasicGraphComponent],
    exports: [BasicGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class BasicGraphModule {

}
