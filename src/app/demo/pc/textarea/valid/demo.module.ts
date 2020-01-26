import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/pc-components/textarea";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaValidComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaValidComponent],
    exports: [TextareaValidComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaValidModule {
}
