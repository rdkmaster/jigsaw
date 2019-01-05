import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDomDemoComponent} from "./demo.component";
import {JigsawDrawerModule} from "jigsaw/component/drawer/drawer";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [DrawerInDomDemoComponent],
    exports: [ DrawerInDomDemoComponent ]
})
export class DrawerInDomDemoModule{

}
