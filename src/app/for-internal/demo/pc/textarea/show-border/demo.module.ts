import {NgModule} from "@angular/core";
import {JigsawTextareaModule, JigsawSwitchModule} from "jigsaw/public_api";
import {TextareaShowBorderDemoComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";

@NgModule({
    declarations: [TextareaShowBorderDemoComponent],
    exports: [TextareaShowBorderDemoComponent],
    imports: [JigsawTextareaModule, JigsawDemoDescriptionModule, JigsawSwitchModule]
})
export class TextareaShowBorderDemoModule {

}
