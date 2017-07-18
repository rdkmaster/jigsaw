import {NgModule} from "@angular/core";
import {JigsawScrollBarModule} from "jigsaw/component/scrollbar/scrollbar";
import {ScrollbarBasicDemoComponent} from "./app.component";
@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarBasicDemoModule{

}
