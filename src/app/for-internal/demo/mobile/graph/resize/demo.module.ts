import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule, JigsawMobileInputModule, JigsawMobileSwitchModule} from "jigsaw/mobile_public_api";
import {GraphResizeComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [GraphResizeComponent],
    exports: [GraphResizeComponent],
    imports: [JigsawMobileGraphModule, JigsawMobileInputModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class GraphResizeModule {

}
