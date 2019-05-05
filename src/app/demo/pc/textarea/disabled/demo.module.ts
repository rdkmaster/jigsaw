import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/pc-components/textarea";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaDisabledComponent],
    exports: [TextareaDisabledComponent],
    imports: [JigsawTextareaModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class TextareaDisabledModule {
}
