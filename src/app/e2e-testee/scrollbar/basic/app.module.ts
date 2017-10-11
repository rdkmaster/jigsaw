import {NgModule} from "@angular/core";
import {ScrollbarBasicDemoComponent} from "./app.component";
import {JigsawPerfectScrollbarModule} from "jigsaw/directive/scrollbar/index";

@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [JigsawPerfectScrollbarModule]
})
export class ScrollbarBasicDemoModule {

}
