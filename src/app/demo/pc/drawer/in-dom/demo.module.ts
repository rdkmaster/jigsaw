import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDrawerModule, JigsawRadioModule, JigsawButtonModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DrawerInDomDemoComponent} from "./demo.component";

@NgModule({
    imports: [JigsawDrawerModule, JigsawRadioModule,JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule],
    declarations: [DrawerInDomDemoComponent],
    exports: [ DrawerInDomDemoComponent ]
})
export class DrawerInDomDemoModule{

}
