import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule, JigsawNavigationMenuModule} from "jigsaw/public_api";
import {NavigationMenuInlineDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawNavigationMenuModule, JigsawDrawerModule
    ],
    declarations: [NavigationMenuInlineDemo],
    exports: [NavigationMenuInlineDemo]
})
export class NavigationMenuInlineDemoModule {
}
