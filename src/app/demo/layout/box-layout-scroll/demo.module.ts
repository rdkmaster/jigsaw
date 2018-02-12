import {NgModule} from "@angular/core";
import {BoxLayoutScrollDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawBoxModule} from "../../../../jigsaw/component/box/index";

@NgModule({
    declarations: [BoxLayoutScrollDemoComponent],
    exports: [BoxLayoutScrollDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawBoxModule, PerfectScrollbarModule]
})
export class BoxLayoutScrollDemoModule {

}
