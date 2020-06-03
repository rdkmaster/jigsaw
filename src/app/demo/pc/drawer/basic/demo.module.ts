import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerBasicDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule],
    declarations: [DrawerBasicDemoComponent],
    exports: [ DrawerBasicDemoComponent ]
})
export class DrawerBasicDemoModule{

}
