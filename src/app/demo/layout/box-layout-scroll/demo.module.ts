import {NgModule} from "@angular/core";
import {BoxLayoutScrollDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawBoxModule} from "jigsaw/component/box/box";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [BoxLayoutScrollDemoComponent],
    exports: [BoxLayoutScrollDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, PerfectScrollbarModule]
})
export class BoxLayoutScrollDemoModule {

}
