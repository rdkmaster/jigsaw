import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RadioFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadioFullComponent],
    exports: [RadioFullComponent],
    imports: [JigsawMobileRadioModule, CommonModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class RadioFullModule {

}
