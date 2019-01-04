import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTabsModule} from "jigsaw/component/tabs";
import {JigsawInputModule} from "jigsaw/component/input/input";
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
