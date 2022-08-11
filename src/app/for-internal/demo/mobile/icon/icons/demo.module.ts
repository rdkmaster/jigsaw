import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileIconModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {IconIconsDemoComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    imports: [
        JigsawMobileIconModule, CommonModule, JigsawDemoDescriptionModule
    , JigsawMobileHeaderModule],
    declarations: [IconIconsDemoComponent],
    exports: [IconIconsDemoComponent]
})
export class IconIconsDemoModule {
}
