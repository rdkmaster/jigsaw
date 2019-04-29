import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDomDemoComponent} from "./demo.component";
import {JigsawDrawerModule} from "jigsaw/pc-components/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {CommonModule} from "@angular/common";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [DrawerInDomDemoComponent],
    exports: [ DrawerInDomDemoComponent ]
})
export class DrawerInDomDemoModule{

}
