import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioLiteModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RadioLiteBasicDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [RadioLiteBasicDemoComponent],
    exports: [RadioLiteBasicDemoComponent],
    imports: [JigsawMobileRadioLiteModule, CommonModule, JigsawDemoDescriptionModule, JigsawMobileHeaderModule]
})
export class RadioLiteBasicDemoModule {

}
