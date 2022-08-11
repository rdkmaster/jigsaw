import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxMiddleResizeLineDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxMiddleResizeLineDemoComponent],
    exports: [BoxMiddleResizeLineDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, CommonModule, JigsawHeaderModule]
})
export class BoxMiddleResizeLineDemoModule {

}
