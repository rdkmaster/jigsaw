import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBoxModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BoxLayoutScrollDemoComponent} from "./demo.component";

@NgModule({
    declarations: [BoxLayoutScrollDemoComponent],
    exports: [BoxLayoutScrollDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, PerfectScrollbarModule]
})
export class BoxLayoutScrollDemoModule {

}
