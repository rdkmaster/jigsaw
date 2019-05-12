import {NgModule} from "@angular/core";
import {JigsawBoxModule} from "jigsaw/pc-components/box/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxViewInitDemoComponent} from "./demo.component";
import {JigsawGraphModule} from "jigsaw/pc-components/graph/index";

@NgModule({
    declarations: [BoxViewInitDemoComponent],
    exports: [BoxViewInitDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, JigsawGraphModule]
})
export class BoxViewInitDemoModule {

}
