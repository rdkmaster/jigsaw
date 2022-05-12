import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawAutoCompleteInputModule, JigsawMenuModule} from "jigsaw/public_api";
import {NavigationMenuNavDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule, JigsawAutoCompleteInputModule
    , JigsawHeaderModule],
    declarations: [NavigationMenuNavDemo],
    exports: [NavigationMenuNavDemo]
})
export class NavigationMenuNavDemoModule {
}
