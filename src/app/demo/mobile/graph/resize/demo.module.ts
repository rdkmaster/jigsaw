import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {JigsawMobileInputModule} from "jigsaw/mobile-components/input/input";
import {JigsawMobileSwitchModule} from "jigsaw/mobile-components/switch/index";
import {GraphResizeComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphResizeComponent],
    exports: [GraphResizeComponent],
    imports: [JigsawMobileGraphModule, JigsawMobileInputModule, JigsawMobileSwitchModule, JigsawDemoDescriptionModule]
})
export class GraphResizeModule {

}
