import {NgModule} from "@angular/core";
import {JigsawRadioLiteModule, JigsawSwitchModule, JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {TextareaMaxLengthDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TextareaMaxLengthDemoComponent],
    exports: [TextareaMaxLengthDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTextareaModule, JigsawSwitchModule, JigsawHeaderModule, JigsawRadioLiteModule]
})
export class TextareaMaxLengthDemoModule {
}
