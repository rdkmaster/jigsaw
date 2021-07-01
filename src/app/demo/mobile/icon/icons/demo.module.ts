import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileIconModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {IconIconsDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawMobileIconModule, CommonModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule],
    declarations: [IconIconsDemoComponent],
    exports: [IconIconsDemoComponent]
})
export class IconIconsDemoModule {
}
