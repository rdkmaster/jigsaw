import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RadioBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioBasicDemoComponent],
    exports: [RadioBasicDemoComponent],
    imports: [JigsawRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class RadioBasicDemoModule {

}
