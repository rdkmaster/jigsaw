import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TextareaValidComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaValidComponent],
    exports: [TextareaValidComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaValidModule {
}
