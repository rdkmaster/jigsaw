import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule, JigsawButtonModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ColorfulLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorfulLoadingDemoComponent],
    exports: [ColorfulLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ColorfulLoadingDemoModule {

}
