import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
    JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, JigsawTabsModule,
    JigsawInputModule
} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DrawerWithDivDemoComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawTabsModule, JigsawInputModule
    , JigsawHeaderModule],
    declarations: [DrawerWithDivDemoComponent],
    exports: [DrawerWithDivDemoComponent]
})
export class DrawerWithDivDemoModule {
}
