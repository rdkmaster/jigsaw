import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/component/textarea";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaSelectDemoComponent} from "./demo.component";
import {TextareaClearableDemoModule} from "../clearable/demo.module";

@NgModule({
    declarations: [TextareaSelectDemoComponent],
    exports: [TextareaSelectDemoComponent],
    imports: [JigsawTextareaModule, JigsawCheckBoxModule, JigsawDemoDescriptionModule]
})
export class TextareaSelectDemoModule {

}
