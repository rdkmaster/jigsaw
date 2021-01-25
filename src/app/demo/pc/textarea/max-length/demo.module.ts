import {NgModule} from "@angular/core";
import {JigsawSwitchModule, JigsawTextareaModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaMaxLengthDemoComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaMaxLengthDemoComponent],
    exports: [TextareaMaxLengthDemoComponent],
    imports: [JigsawDemoDescriptionModule, JigsawTextareaModule, JigsawSwitchModule]
})
export class TextareaMaxLengthDemoModule {
}
