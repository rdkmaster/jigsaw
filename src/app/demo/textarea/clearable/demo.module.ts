import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaClearableDemoComponent} from "./demo.component";
import {JigsawTextareaModule} from "jigsaw/pc-components/textarea";

@NgModule({
    declarations: [TextareaClearableDemoComponent],
    exports: [TextareaClearableDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaClearableDemoModule {

}
