import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioLiteModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RadioLiteDisabledDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioLiteDisabledDemoComponent],
    exports: [RadioLiteDisabledDemoComponent],
    imports: [JigsawRadioLiteModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class RadioLiteDisabledDemoModule {

}
