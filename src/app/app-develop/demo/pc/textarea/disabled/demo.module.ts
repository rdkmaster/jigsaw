import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {TextareaDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [TextareaDisabledComponent],
    exports: [TextareaDisabledComponent],
    imports: [JigsawTextareaModule, JigsawSwitchModule, JigsawDemoDescriptionModule]
})
export class TextareaDisabledModule {
}
