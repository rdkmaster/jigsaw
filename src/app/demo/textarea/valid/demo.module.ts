import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/component/textarea";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaValidComponent} from "./demo.component";
import {TextareaClearableDemoModule} from "../clearable/demo.module";

@NgModule({
    declarations: [TextareaValidComponent],
    exports: [TextareaValidComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaValidModule {
}
