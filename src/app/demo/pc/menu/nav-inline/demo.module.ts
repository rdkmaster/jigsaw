import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule, JigsawMenuModule} from "jigsaw/public_api";
import {NavigationMenuInlineDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawDrawerModule
    , JigsawHeaderModule, DemoTemplateModule],
    declarations: [NavigationMenuInlineDemo],
    exports: [NavigationMenuInlineDemo]
})
export class NavigationMenuInlineDemoModule {
}
