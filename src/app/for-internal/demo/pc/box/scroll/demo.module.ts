import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {BoxLayoutScrollDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxLayoutScrollDemoComponent],
    exports: [BoxLayoutScrollDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, PerfectScrollbarModule, JigsawHeaderModule]
})
export class BoxLayoutScrollDemoModule {

}
