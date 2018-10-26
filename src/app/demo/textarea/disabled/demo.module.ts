import {NgModule} from "@angular/core";
import {JigsawTextareaModule} from "jigsaw/component/textarea";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TextareaDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaDisabledComponent],
    exports: [TextareaDisabledComponent],
    imports: [JigsawTextareaModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class TextareaDisabledModule {
}
