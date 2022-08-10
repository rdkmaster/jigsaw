import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {JigsawDrawerModule, JigsawMenuModule} from "jigsaw/public_api";
import {NavigationMenuInlineDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawDrawerModule
    , JigsawHeaderModule],
    declarations: [NavigationMenuInlineDemo],
    exports: [NavigationMenuInlineDemo]
})
export class NavigationMenuInlineDemoModule {
}
