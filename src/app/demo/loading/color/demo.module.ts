import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/component/loading/loading";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorfulLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorfulLoadingDemoComponent],
    exports: [ColorfulLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ColorfulLoadingDemoModule {

}
