import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioBasicDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioBasicDemoComponent],
    exports: [RadioBasicDemoComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class RadioBasicDemoModule {

}
