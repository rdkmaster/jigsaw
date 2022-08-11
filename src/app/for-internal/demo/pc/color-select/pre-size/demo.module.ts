import {NgModule} from "@angular/core";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ColorSelectPreSizeDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ColorSelectPreSizeDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    exports: [ColorSelectPreSizeDemoComponent]
})
export class ColorSelectPreSizeDemoModule {
}
