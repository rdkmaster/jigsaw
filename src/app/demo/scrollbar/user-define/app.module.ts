import {NgModule} from "@angular/core";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {ScrollbarUserdefineDemoComponent} from "./app.component";
@NgModule({
    declarations: [ScrollbarUserdefineDemoComponent],
    bootstrap: [ScrollbarUserdefineDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarUserdefineDemoModule{

}
