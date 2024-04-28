import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TextareaAutoHeightComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaAutoHeightComponent],
    exports: [TextareaAutoHeightComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule]
})
export class TextareaAutoHeightModule {
}
