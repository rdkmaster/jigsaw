import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawButtonModule, JigsawDrawerModule, JigsawInputModule, JigsawRadioModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DrawerInDomDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule,
        JigsawInputModule, JigsawSwitchModule
    ],
    declarations: [DrawerInDomDemoComponent],
    exports: [DrawerInDomDemoComponent]
})
export class DrawerInDomDemoModule {

}
