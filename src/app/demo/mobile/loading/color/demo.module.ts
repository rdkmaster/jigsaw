import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawLoadingModule} from "jigsaw/common/components/loading/loading";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ColorfulLoadingDemoComponent} from "./demo.component";

@NgModule({
    declarations: [ColorfulLoadingDemoComponent],
    exports: [ColorfulLoadingDemoComponent],
    imports: [JigsawLoadingModule, JigsawMobileButtonModule, CommonModule, JigsawDemoDescriptionModule]
})
export class ColorfulLoadingDemoModule {

}
