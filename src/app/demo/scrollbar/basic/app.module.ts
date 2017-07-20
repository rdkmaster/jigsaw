import {NgModule} from "@angular/core";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {ScrollbarBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarBasicDemoModule{

}
