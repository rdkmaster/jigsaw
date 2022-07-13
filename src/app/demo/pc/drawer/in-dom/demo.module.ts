import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawDrawerModule, JigsawInputModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDomDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule,
        JigsawInputModule, JigsawSwitchModule, DemoTemplateModule
    ],
    declarations: [DrawerInDomDemoComponent],
    exports: [DrawerInDomDemoComponent]
})
export class DrawerInDomDemoModule {

}
