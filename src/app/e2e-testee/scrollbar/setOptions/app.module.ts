import {NgModule} from "@angular/core";
import {JigsawScrollBarModule} from "jigsaw/directive/scrollbar/scrollbar";
import {ScrollbarSetOptionsDemoComponent} from "./app.component";
@NgModule({
    declarations: [ScrollbarSetOptionsDemoComponent],
    bootstrap: [ScrollbarSetOptionsDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarSetOptionsDemoModule{

}
