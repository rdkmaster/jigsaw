import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawNavigationMenuModule} from "jigsaw/public_api";
import {NavigationMenuNavDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawNavigationMenuModule
    ],
    declarations: [NavigationMenuNavDemo],
    exports: [NavigationMenuNavDemo]
})
export class NavigationMenuNavDemoModule {
}
