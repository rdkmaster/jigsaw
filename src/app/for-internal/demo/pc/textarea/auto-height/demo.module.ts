import {NgModule} from "@angular/core";
import {JigsawButtonModule, JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TextareaAutoHeightComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaAutoHeightComponent],
    exports: [TextareaAutoHeightComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule, JigsawButtonModule]
})
export class TextareaAutoHeightModule {
}
