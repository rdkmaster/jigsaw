import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMenuModule} from "jigsaw/public_api";
import {NavigationMenuNavDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule
    ],
    declarations: [NavigationMenuNavDemo],
    exports: [NavigationMenuNavDemo]
})
export class NavigationMenuNavDemoModule {
}
