import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile-components/graph/index";
import {GraphFormatterComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphFormatterComponent],
    exports: [GraphFormatterComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule]
})
export class GraphFormatterModule {

}
