import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerContainerDemoComponent} from "./demo.component";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawTabsModule} from "jigsaw/component/tabs";
import {JigsawInputModule} from "jigsaw/component/input/input";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule,
        JigsawTabsModule, JigsawInputModule],
    declarations: [DrawerContainerDemoComponent],
    exports: [ DrawerContainerDemoComponent ]
})
export class DrawerContainerDemoModule{

}
