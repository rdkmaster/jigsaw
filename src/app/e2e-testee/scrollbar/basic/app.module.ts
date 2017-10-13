import {NgModule} from "@angular/core";
import {ScrollbarBasicDemoComponent} from "./app.component";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [PerfectScrollbarModule]
})
export class ScrollbarBasicDemoModule {

}
