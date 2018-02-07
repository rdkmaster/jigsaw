import {NgModule} from "@angular/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ScrollbarBasicDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    exports: [ScrollbarBasicDemoComponent],
    imports: [PerfectScrollbarModule, JigsawDemoDescriptionModule]
})
export class ScrollbarBasicDemoModule {

}
