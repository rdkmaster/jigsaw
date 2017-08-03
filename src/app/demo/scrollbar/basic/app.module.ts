import {NgModule} from "@angular/core";
import {JigsawScrollBarModule} from "jigsaw/directive/scrollbar/scrollbar";
import {ScrollbarBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    bootstrap: [ScrollbarBasicDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarBasicDemoModule{

}
