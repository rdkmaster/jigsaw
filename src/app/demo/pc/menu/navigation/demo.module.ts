import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawAutoCompleteInputModule, JigsawMenuModule} from "jigsaw/public_api";
import {NavigationMenuNavDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawAutoCompleteInputModule, JigsawHeaderModule, DemoTemplateModule],
    declarations: [NavigationMenuNavDemo],
    exports: [NavigationMenuNavDemo]
})
export class NavigationMenuNavDemoModule {
}
