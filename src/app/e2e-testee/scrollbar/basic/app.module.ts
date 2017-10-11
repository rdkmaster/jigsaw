import {NgModule} from "@angular/core";
import {ScrollbarBasicDemoComponent} from "./app.component";
import {PerfectScrollbarModule} from "jigsaw/directive/scrollbar/index";

@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [PerfectScrollbarModule]
})
export class ScrollbarBasicDemoModule {

}
