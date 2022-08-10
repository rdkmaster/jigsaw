import {NgModule} from "@angular/core";
import {JigsawSwitchModule, JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TextareaMaxLengthDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [TextareaMaxLengthDemoComponent],
    exports: [TextareaMaxLengthDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTextareaModule, JigsawSwitchModule, JigsawHeaderModule]
})
export class TextareaMaxLengthDemoModule {
}
