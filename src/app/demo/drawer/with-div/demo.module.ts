import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule} from "jigsaw/pc-components/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawTabsModule} from "jigsaw/pc-components/tabs";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {DrawerWithDivDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawTabsModule, JigsawInputModule
    ],
    declarations: [DrawerWithDivDemoComponent],
    exports: [DrawerWithDivDemoComponent]
})
export class DrawerWithDivDemoModule {
}
