import {NgModule} from "@angular/core";
import {JigsawBoxModule, JigsawGraphModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxViewInitDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxViewInitDemoComponent],
    exports: [BoxViewInitDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, JigsawGraphModule, JigsawHeaderModule]
})
export class BoxViewInitDemoModule {

}
