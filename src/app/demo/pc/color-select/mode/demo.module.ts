import {NgModule} from "@angular/core";
import {JigsawColorSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorSelectModeDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ColorSelectModeDemoComponent],
    imports: [
        JigsawColorSelectModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    exports: [ColorSelectModeDemoComponent]
})
export class ColorSelectModeDemoModule {
}
