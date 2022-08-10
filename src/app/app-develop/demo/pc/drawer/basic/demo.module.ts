import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, JigsawSwitchModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {DrawerBasicDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawSwitchModule],
    declarations: [DrawerBasicDemoComponent],
    exports: [ DrawerBasicDemoComponent ]
})
export class DrawerBasicDemoModule{

}
