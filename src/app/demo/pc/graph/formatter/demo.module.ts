import {NgModule} from "@angular/core";
import {JigsawGraphModule, JigsawInputModule, JigsawSwitchModule} from "jigsaw/public_api";
import {GraphFormatterComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [GraphFormatterComponent],
    exports: [GraphFormatterComponent],
    imports: [JigsawGraphModule, JigsawDemoDescriptionModule]
})
export class GraphFormatterModule {

}
