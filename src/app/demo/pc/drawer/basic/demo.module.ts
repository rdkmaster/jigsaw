import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerBasicDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule, DemoTemplateModule],
    declarations: [DrawerBasicDemoComponent],
    exports: [ DrawerBasicDemoComponent ]
})
export class DrawerBasicDemoModule {

}
