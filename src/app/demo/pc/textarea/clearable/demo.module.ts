import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaClearableDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaClearableDemoComponent],
    exports: [TextareaClearableDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaClearableDemoModule {

}
