import {NgModule} from "@angular/core";
import {ScrollbarBasicDemoComponent} from "./app.component";
import {JigsawScrollBarModule} from "../../../../jigsaw/component/scrollbar/scrollbar";
@NgModule({
    declarations: [ScrollbarBasicDemoComponent],
    imports: [JigsawScrollBarModule]
})
export class ScrollbarBasicDemoModule{

}
