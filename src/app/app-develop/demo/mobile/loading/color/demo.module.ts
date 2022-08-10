import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule, JigsawMobileButtonModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ColorfulLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorfulLoadingDemoComponent],
    exports: [ColorfulLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawMobileButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ColorfulLoadingDemoModule {

}
