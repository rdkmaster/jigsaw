import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerBasicDemoComponent} from "./demo.component";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [DrawerBasicDemoComponent],
    exports: [ DrawerBasicDemoComponent ]
})
export class DrawerBasicDemoModule{

}
